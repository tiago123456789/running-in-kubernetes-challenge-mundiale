import SearchEndpoint from "../endpoints/SearchEndpoint";
import HandlerException from "../middlewares/HandlerException";
import MercadoLivreCrawlerService from "../services/MercadoLivreCrawlerService";

const mercadoLivreCrawlerService = new MercadoLivreCrawlerService();
const searchEndpoint = new SearchEndpoint(mercadoLivreCrawlerService);

export default (app) => {

    app.post("/searchs", searchEndpoint.searchProductsDataInMercadoLivre);


    /**
     * @description Middleware to handler exceptions application.
     */
    app.use(HandlerException)
}