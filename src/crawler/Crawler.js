
class Crawler {

    async getContent(options = []) {
        throw new Error("It's method must implemented child class.")
    }
}

export default Crawler;