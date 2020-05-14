import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";

class SearchEndpoint extends Endpoint {

    constructor() {
        super();
        this.searchProductsDataInMercadoLivre = this.searchProductsDataInMercadoLivre
            .bind(this);
    }


    searchProductsDataInMercadoLivre(request, response, next) {
        try {
            const searchDatas = request.body;
            this.isValid(searchDatas);
            response.json(searchDatas);
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
