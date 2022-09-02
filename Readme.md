<h2>Setup infrastructure for Events API endpoint using combination of AWS Web console and CloudFormation template. On AWS Web Console,</h2>

1. Under Lambda service, create Lambda Function with default execution role. Update code on Lambda function to handle Authorization from request headers and return statusCode and response accordingly. See index.js file in Lambda Code folder of this repo.
2. Under CloudWatch Log groups, create Log group with name "EventsAPIRequestLogs", this will be used for API Gateway requests logging.
3. Setup AWS API Gateway with a name "EventAPI" and change $default stage to prod (and allow auto deploy)
    1. under Routes, add Routes for /events with POST method
    2. Configure Integration for the Lambda function within the route under POST method
    3. Enable Logging with above created LogGroup arn
4. To add external access to Lambda Function use attached cloudformation template to spin up VPC which will complete step 1-6, then continue from step 7. 
    1. Create VPC
    2. Create Public & Private Subnet
    3. Create and attach internet gateway to VPC
    4. Allocate Elastic IP
    5. Create NAT Gateway within public subnet and associate Elastic IP
    6. Add routes for public and private subnets: Under route tables, add 0.0.0.0/0 targeting to internet gateway in public subnet and 0.0.0.0/0 targeting to Nat Gateway in private subnet.
    7. Add AWSLambdaVPCAccessExecutionRole permission in existing Lambda IAM role configured on the Lambda created above
    8. Configure Lambda function to connect to VPC
        1. Under VPC configuration of Lambda Function, choose Edit. Then, do the following:
        - For Virtual Private Cloud (VPC), choose the VPC created above.
        - For Subnets, select the private subnet created above.

<h2>Steps to tear down the above setup:</h2>

1. Delete Lambda Function and delete its associated IAM Role along with its cusomter managed permission policy.
2. Delete API Gateway and delete the associated IAM Role setup on creation.
4. Delete Log group created for API Gateway request logging from CloudWatch
5. Delete stack from CloudFormation Stack created with attached cf.template file.

<p>To future proof the above infrastructure creation, above entire stack creation can be written as CF Template similar to the cf.template file in this repo.</p>

<h2>Explanation for using above approach to this project:</h2>

<p>I have used Lambda Function and API Gateway as that was the first thing that came to my mind when readin ghe requirements and also I am more familar with this approach to setup such API. Traditailly I have setup API on Ec2 instance such as WAMP or NodeJs with middleware such as Express to listen to web request which is unsecure and hard to manage or scale as well as not so much cost effective provided we have to manage, underlysing server OS and Runtime environments, Lambda together with API Gateway provides robust, scalable and future proof approach to spin up API backends.</p>

<p>Application Load Balancer is on the other hand used for distributing the load across different computer units, so in this case using API Gateway is more suitable option.</p>
