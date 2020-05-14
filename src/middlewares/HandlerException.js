
export default(error, request, response, next) => {

    switch(error.name) {
        case "InvalidDatasException":
            let errorDetails = JSON.parse(error.message);
            errorDetails = { statusCode: 400, message: errorDetails };
            response.status(400).json(errorDetails);
        default:
            response.status(500).json({ statusCode: 500, message: error.message });
    }
}