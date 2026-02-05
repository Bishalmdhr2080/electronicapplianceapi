import { ZodError } from "zod";



const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            console.log("validate error")

            res.status(400).json(JSON.parse(error.message))
        }

        next(error)
    }
}





export { validate }