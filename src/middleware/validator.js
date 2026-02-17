import z, { ZodError } from "zod";


const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse(req.body);

        req.data = parsed;

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedError = z.treeifyError(error);

            console.error(formattedError);

            res.status(400).json(formattedError);
        }

        next(error);
    }
};

export default validate;