import NotFoundException from "../exceptions/NotFoundException";

export default (request, response, next) => {
    next(new NotFoundException("You trying access one route not exist!"));
}