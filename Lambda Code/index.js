exports.handler = async (event) => {
    // TODO implement
    if (!event.headers.authorization && event.headers.authorization !== "secret")
    return {
        statusCode: 403,
        body: JSON.stringify('UnAuthorised Request')}
    else{
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
    }
};