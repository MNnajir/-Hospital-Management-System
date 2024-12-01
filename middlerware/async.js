const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
           // console.log('Executing controller with next:', typeof next);
            await fn(req, res, next)
            } catch (error) {
                //console.error('Error caught in asyncWrapper:', error);
                next(error)
                }
     };
};
module.exports = asyncWrapper