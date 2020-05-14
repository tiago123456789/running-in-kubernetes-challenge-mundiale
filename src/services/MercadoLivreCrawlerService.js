import axios from "axios";
import cheeiro from "cheerio";

class MercadoLivreCrawlerService {

    constructor() {
        const ITENS_PER_PAGE = 50;
    }

    _extractProductsDataInHtml(htmlContent, quantityItensReturn) {
        const $ = cheeiro.load(htmlContent);
        const htmlElementRepresenteProducts = $(".results-item");
        let products = [];
        let quantityItensCaptured = 0;

        htmlElementRepresenteProducts.each((index, element) => {
            const isCapturedQuantityNecessary = quantityItensCaptured == quantityItensReturn;
            if (isCapturedQuantityNecessary) {
                return;
            }
            
            const link = $(element).find(".item__info-title").attr("href");
            const price = $(element).find(".price__fraction").text();
            const name = $(element).find(".main-title").text().trim();
            const state = $(element).find(".item__status .item__status").text();
            let store = $(element).find(".item__brand-title-tos").text();
            store = store.replace(/\spor\s/, "");
            store = store.trim();
            products.push({ link, price, name, state, store });
            quantityItensCaptured++;
        });

        return products;
    }

    async getProductsData(productName, registersLimit) {
        // MercadoLivreCraswlerService.ITENS_PER_PAGE;
        const htmlContent = await axios.get(`https://lista.mercadolivre.com.br/${productName}`)
                                        .then((response) => response.data);
       
        return this._extractProductsDataInHtml(htmlContent, registersLimit);
    }
}

export default MercadoLivreCrawlerService;