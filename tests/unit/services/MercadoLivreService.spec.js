import MercadoLivreService from "../../../src/services/MercadoLivreService";
import MercadoLivreCrawler from "../../../src/crawler/MercadoLivreCrawler";
import cacheClient from "../../../src/utils/Cache";
import cache from "../../../src/utils/Cache";


describe("Tests MercadoLivreService class", () => {

    it("Should return quantity products based parameter limit specified", function (done) {
        const fakeDatas = {
            name: "celular", limit: 1
        }
        const mercadoLivreCrawler = new MercadoLivreCrawler();
        const mercadoLivreService = new MercadoLivreService(mercadoLivreCrawler, cacheClient);

        mercadoLivreService
            .findProductsByNameAndLimit(fakeDatas.name, fakeDatas.limit)
            .then(products => {
                const quantityProducts = products.length;
                expect(fakeDatas.limit).to.be.equal(quantityProducts);
            });
        done();
    });


    it("Should get datas in cache on second time search one product", function (done) {
        const fakeDatas = {
            name: "celular", limit: 1
        }

        const fakeProduct = {
            "name": "Product test",
            "price": 10
        };

        const cacheClientFake = {
            smembers: sinon.stub()
        };

        cacheClientFake.smembers.withArgs(fakeDatas.name).resolves([fakeProduct]);

        const mercadoLivreCrawlerFake = {
            getContent: sinon.spy()
        }

        const mercadoLivreService = new MercadoLivreService(
            mercadoLivreCrawlerFake, cacheClientFake
        );

        mercadoLivreService
            .findProductsByNameAndLimit(fakeDatas.name, fakeDatas.limit)
            .then(products => {
                const quantityProducts = products.length;
                expect(1).to.be.equal(quantityProducts);
                assert(mercadoLivreCrawlerFake.getContent.notCalled);
            });
        done();
    });

    it("Should add datas in cache if not exist in cache", function (done) {
        const fakeDatas = {
            name: "celular", limit: 1
        }

        const fakeProduct = {
            "name": "Product test",
            "price": 10
        };

        const cacheClientFake = {
            smembers: sinon.stub(),
            sadd: sinon.stub()
        };

        cacheClientFake.smembers.withArgs(fakeDatas.name).resolves([]);
        cacheClientFake.sadd.resolves([]);


        const mercadoLivreCrawlerFake = {
            getContent: sinon.stub()
        };

        mercadoLivreCrawlerFake.getContent.resolves([fakeProduct]);

        const mercadoLivreService = new MercadoLivreService(
            mercadoLivreCrawlerFake, cacheClientFake
        );

        mercadoLivreService
            .findProductsByNameAndLimit(fakeDatas.name, fakeDatas.limit)
            .then(products => {
                assert(cacheClientFake.sadd.calledOnce);
                assert(mercadoLivreCrawlerFake.getContent.calledOnce);
            });
        done();
    });

});