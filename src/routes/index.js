import SearchEndpoint from "../endpoints/SearchEndpoint";
import HandlerException from "../middlewares/HandlerException";
import MercadoLivreService from "../services/MercadoLivreService";
import MercadoLivreCrawler from "../crawler/MercadoLivreCrawler";
import cacheClient from "../utils/Cache";
import notFoundRoute from "../middlewares/NotFoundRoute";

const mercadoLivreCrawler = new MercadoLivreCrawler();
const mercadoLivreCrawlerService = new MercadoLivreService(mercadoLivreCrawler, cacheClient);
const searchEndpoint = new SearchEndpoint(mercadoLivreCrawlerService);

export default (app) => {

    app.post("/searchs", searchEndpoint.searchProductsDataInMercadoLivre);

    /**
     * @description Middleware to handler access routes not exist.
     */
    app.use(notFoundRoute);

    /**
     * @description Middleware to handler exceptions application.
     */
    app.use(HandlerException)
}