import axios from "axios";
import cheeiro from "cheerio";
import Crawler from "./Crawler";
import * as NumberUtil from "../utils/Number"
import NotFoundException from "../exceptions/NotFoundException";

class MercadoLivreCrawler extends Crawler {

    constructor() {
        super();
        this._url = "https://lista.mercadolivre.com.br/";
        this._ITENS_PER_PAGE = 50;
    }

    async getContent(options) {
        const quantityProducts = options.quantityItensReturn;

        const numberPagesNecessaryConsulte = this._getQuantityPageNecessaryConsulte(quantityProducts);

        let products = [];
        for (let indice = 1; indice <= numberPagesNecessaryConsulte; indice++) {
            const isLastPageConsulte = (indice == numberPagesNecessaryConsulte) && indice > 2;
            let quantityItensReturn = this._ITENS_PER_PAGE;
            if (isLastPageConsulte) {
                quantityItensReturn = quantityProducts - (numberPagesNecessaryConsulte - 1) * this._ITENS_PER_PAGE
            }

            const htmlContent = await this._getHtmlContent({
                productName: options.productName, 
                pageCurrent: this._getPageSearchProductsData(indice)
            });

            const newProducts = await this._extract(htmlContent, { quantityItensReturn });
            products = [...products, ...newProducts];
        }

        return products;
    }

    _getQuantityPageNecessaryConsulte(quantityItensSearch) {
        let page = 1;

        const isFirstPage = quantityItensSearch <= this._ITENS_PER_PAGE;
        if (isFirstPage) {
            return page;
        }
    
        const valueDivision = (quantityItensSearch / this._ITENS_PER_PAGE);
        if (NumberUtil.isFloat(valueDivision)) {
            let integerPart = valueDivision.toString().split(".")[0];
            integerPart = parseInt(integerPart);
            if (integerPart == 0) {
                integerPart = 1;
            }
            page = integerPart + 1;
        } else {
            page = valueDivision;
        }
        return page;
    }

    _getPageSearchProductsData(value) {
        const page = ((value - 1) * this._ITENS_PER_PAGE) + 1;
        return page;
    }

    async _getHtmlContent(options) {
        try {
            const htmlContent = await axios
            .get(`${this._url}${options.productName}_Desde_${options.pageCurrent}`)
            .then((response) => response.data);
            return htmlContent;
        } catch(error) {
            if (error.response.status == 404) {
                throw new NotFoundException("Product searched not found!")
            }
        }
    }

    _extract(html, options) {
        const $ = cheeiro.load(html);
        const htmlElementRepresenteProducts = $(".results-item");
        let products = [];
        let quantityItensCaptured = 0;

        htmlElementRepresenteProducts.each((index, element) => {
            const isCapturedQuantityNecessary = quantityItensCaptured == options.quantityItensReturn;
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
}

export default MercadoLivreCrawler;