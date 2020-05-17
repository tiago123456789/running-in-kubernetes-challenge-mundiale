import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
    info: {
        title: "Changelle Mundiale",
        version: "1.0.0",
        description: "Implemented crawler search products data in Mercado livre"
    }
}

const swaggerSpec =  swaggerJsDoc({
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js'],
});

export default swaggerSpec;