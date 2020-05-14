import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";
import Cache from "../utils/Cache";

class SearchEndpoint extends Endpoint {

    constructor(mercadoLivreCrawlerService) {
        super();
        this._mercadoLivreCrawlerService = mercadoLivreCrawlerService;
        this.searchProductsDataInMercadoLivre = this.searchProductsDataInMercadoLivre
            .bind(this);
    }


    async searchProductsDataInMercadoLivre(request, response, next) {
        try {
            const searchDatas = request.body;
            this.isValid(searchDatas);
            const keyCache = `${searchDatas.search}_${searchDatas.limit}`;

            let products = await Cache.get(keyCache);

            if (products == null) {
                products = await this._mercadoLivreCrawlerService
                    .getProductsData(searchDatas.search, searchDatas.limit);
                await Cache.set(keyCache, products);
            }


            response.json(products);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    getValidationRules() {
        return Joi.object({
            search: Joi.string().min(1).required(),
            limit: Joi.number().integer().min(1).required(),
        });
    }
}

export default SearchEndpoint;
