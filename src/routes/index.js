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

    /**
     * @swagger
     * definitions:
     *  SearchDatas:
     *     properties:
     *        search:
     *          type: string
     *        limit:
     *          type: integer
     */

    /**
     * @swagger
     * /api/searchs:
     *   post:
     *     tags:
     *       - Search
     *     parameters:
     *      - name: body
     *        required: true
     *        type: object
     *        schema:
     *           $ref: "#/paths/definitions/SearchDatas"
     *        in: body
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *          description: Return products success
     *       400:
     *          description: Return when datas request is invalid.
     *  
     */
    app.post("/api/searchs", searchEndpoint.findProductsInMercadoLivreByNameAndLimit);

    /**
     * @description Middleware to handler access routes not exist.
     */
    app.use(notFoundRoute);

    /**
     * @description Middleware to handler exceptions application.
     */
    app.use(HandlerException)
}