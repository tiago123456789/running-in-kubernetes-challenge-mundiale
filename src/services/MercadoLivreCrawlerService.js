import axios from "axios";
import cheeiro from "cheerio";
import Cache from "../utils/Cache";
import * as NumberUtil from "../utils/Number";

const KEY_CACHE_PRODUCTS = "products";
const ITENS_PER_PAGE = 50;
const TIME_EXPIRATION_CACHE = 1 * 60 * 60;

class MercadoLivreCrawlerService {

    constructor() { }

    _extractProductsDataInHtml(htmlContent, quantityItensReturn, positionInitExtractionProductsData = 0) {
        const $ = cheeiro.load(htmlContent);
        const htmlElementRepresenteProducts = $(".results-item");
        let products = [];
        let quantityItensCaptured = 0;

        htmlElementRepresenteProducts.each((index, element) => {
            const isCapturedQuantityNecessary = quantityItensCaptured == quantityItensReturn;
            if (isCapturedQuantityNecessary) {
                return;
            }

            const isInitExtractionProductDatas = quantityItensCaptured >= positionInitExtractionProductsData;
            if (isInitExtractionProductDatas) {
                const link = $(element).find(".item__info-title").attr("href");
                const price = $(element).find(".price__fraction").text();
                const name = $(element).find(".main-title").text().trim();
                const state = $(element).find(".item__status .item__status").text();
                let store = $(element).find(".item__brand-title-tos").text();
                store = store.replace(/\spor\s/, "");
                store = store.trim();
                products.push({ link, price, name, state, store });
                console.log(`products_${index}`)
            }
            quantityItensCaptured++;
        });

        return products;
    }

    _getQuantityPageNecessaryConsulte(quantityItensSearch) {
        let page = 1;

        const isFirstPage = quantityItensSearch <= ITENS_PER_PAGE;
        if (isFirstPage) {
            return page;
        }

        const valueDivision = (quantityItensSearch / ITENS_PER_PAGE);
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
        const page = ((value - 1) * ITENS_PER_PAGE) + 1;
        return page;
    }

    async getProductsData(productName, registersLimit) {
        const keyCache = `${productName}_${registersLimit}`;

        // let productsInCache = await Cache.get(KEY_CACHE_PRODUCTS);

        // if (productsInCache) {
        //     return productsInCache;
        // }
           
        let products = [];
        for (let indice = 1; indice <= this._getQuantityPageNecessaryConsulte(registersLimit); indice++) {
            const pageSearch = this._getPageSearchProductsData(indice);
            const url = `https://lista.mercadolivre.com.br/${productName}_Desde_${pageSearch}`;
            const htmlContent = await axios
                .get(url)
                .then((response) => response.data);

            const newProducts = this._extractProductsDataInHtml(
                htmlContent, registersLimit
            );

            products = [...products, ...newProducts];
            // await Cache.del(keyCache);
            // await Cache.set(keyCache, products, TIME_EXPIRATION_CACHE);
        }

        // console.log(await Cache.get(keyCache));

        return products;
    }
}

export default MercadoLivreCrawlerService;