const logger = (req, res, next) => {
    const url = req.originalUrl;
    const method = req.method;

    console.log(`Url=${url}, Method= ${method}`)

    next()

}

export default logger