
describe("Tests Integration of /searchs endpoint", () => {
    const endpoint = "/api/searchs";

    it("Should return status code 400 to the try request without passed datas needed", function (done) {
        request.post(endpoint).expect(400).end(done);
    });

    it("Should return status code 200 to the try request with datas needed", function(done) {
        const bodyRequestFake = {
            search: "celular",
            limit: 1
        }
        request.post(endpoint).send(bodyRequestFake).expect(200).end(done);
    });

    it("Should return quantity products equal parameter limit", function(done) {
        const bodyRequestFake = {
            search: "celular",
            limit: 1
        }
        request.post(endpoint)
            .send(bodyRequestFake)
            .expect(200)
            .then((response) => { 
                const quantityProducts = response.body.length;
                expect(bodyRequestFake.limit).to.be.equal(quantityProducts);
                done();
            });
    });

});