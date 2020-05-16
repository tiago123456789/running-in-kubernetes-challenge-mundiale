import MercadoLivreCrawler from "../../../src/crawler/MercadoLivreCrawler";

describe("Tests MercadoLivreCrawler class", () => {

    it("Should trigger exception when not found product searched", function (done) {
        this.timeout(10000);
        const productSearchFake = {
            name: "celularadfafdsfsdfasdfasdfsdsdfassdfasdfadsfa6d54f98asd4f16a",
            limit: 1
        };

        new MercadoLivreCrawler()
            .getContent({
                productName: productSearchFake.name,
                quantityItensReturn: productSearchFake.limit
            })
            .catch(error => {
                expect("NotFoundException").to.be.equal(error.name);
            });
        done();
    });

    it("Should return one product when specific limit 1", function (done) {
        this.timeout(10000);
        const productSearchFake = {
            name: "celular",
            limit: 1
        };

        new MercadoLivreCrawler()
            .getContent({
                productName: productSearchFake.name,
                quantityItensReturn: productSearchFake.limit
            })
            .then(products => {
                const quantityProductsReturned = products.length;
                expect(productSearchFake.limit).to.be.equal(quantityProductsReturned);
            });
        done();
    });

});