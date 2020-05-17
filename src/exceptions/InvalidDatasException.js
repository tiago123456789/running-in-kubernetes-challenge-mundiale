class InvalidDatasException extends Error {

    constructor(message) {
        super(message);
        this.name = "InvalidDatasException";
    }

}

export default InvalidDatasException;