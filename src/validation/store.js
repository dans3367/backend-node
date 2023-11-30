import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required()
});

export const validate = (input) => {

    const { error, value } = schema.validate(input,
        {
            abortEarly: false
        });

    if (error) {
        return error.details.reduce((errors, detail) => {
            errors[detail.path[0]] = detail.message;
            return errors;
        }, {});
    }

    return null;
}
