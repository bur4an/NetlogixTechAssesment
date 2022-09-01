Setup Events API endpoint:

1. Create Lambda Function with default execution role.
2. Create CloudWatch LogGroup that will be used for API Gateway requests logging.
3. Setup AWS API Gateway with prod stage (and allow auto deploy)
    1. Add Routes for /events with POST Method
    2. Configure Integration for the Lambda function within the route under POST Method
    3. Enable Logging with above created LogGroup arn
5. Update code on Lambda function to handle Authorization from request headers and return statusCode and response accordingly.
6. Add external access to Lambda to allow calls to web
    1. Create VPC
    2. Create Public & Private Subnet
    3. Create and attach internet gateway to VPC
    4. Allocate Elastic IP
    5. Create NAT Gateway within public subnet and associate Elastic IP
    6. Add routes for public and private subnets, add 0.0.0.0/0 target to internet gateway in public subnet and 0.0.0.0/0 target in private subnet to Nat Gateway.
    7. Add AWSLambdaVPCAccessExecutionRole permission in existing Lambda IAM role configured on the Lambda created above
    8. Configure Lambda function to connect to VPC
        1. Under VPC, choose Edit. Then, do the following:
        - For Virtual Private Cloud (VPC), choose the VPC created above.
        - For Subnets, select the private subnet created above.

To future proof the above infrastructure creation, above stack creation can be written as CF Template similar to the cf.template file in this repo.