import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";

class SearchEndpoint extends Endpoint {

    constructor(mercadoLivreCrawlerService) {
        super();
        this._mercadoLivreCrawlerService = mercadoLivreCrawlerService;
        this.findProductsInMercadoLivreByNameAndLimit = this.findProductsInMercadoLivreByNameAndLimit
            .bind(this);
    }


    async findProductsInMercadoLivreByNameAndLimit(request, response, next) {
        try {
            const searchDatas = request.body;
            this.isValid(searchDatas);
            let products = await this._mercadoLivreCrawlerService
                .findProductsByNameAndLimit(searchDatas.search, searchDatas.limit);
            response.json(products);
        } catch (error) {
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
