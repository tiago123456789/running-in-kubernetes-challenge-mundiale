
export default(error, request, response, next) => {

    switch(error.name) {
        case "NotFoundException":
            return response.status(404).json({ statusCode: 404, message: error.message });
        case "InvalidDatasException":
            let errorDetails = JSON.parse(error.message);
            errorDetails = { statusCode: 400, message: errorDetails };
            return response.status(400).json(errorDetails);
        default:
            return response.status(500).json({ statusCode: 500, message: error.message });
    }
}