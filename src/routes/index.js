import SearchEndpoint from "../endpoints/SearchEndpoint";
import HandlerException from "../middlewares/HandlerException";

const searchEndpoint = new SearchEndpoint();

export default (app) => {

    app.post("/searchs", searchEndpoint.searchProductsDataInMercadoLivre);


    /**
     * @description Middleware to handler exceptions application.
     */
    app.use(HandlerException)
}