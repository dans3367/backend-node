import Joi from "joi";

const effectiveDatesSchema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});

const deliveryMethodSchema = Joi.object({
    email: Joi.boolean().default(false),
    phone: Joi.boolean().default(false),
});

const schema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(null).default(null),
    effective_dates: effectiveDatesSchema.required(),
    delivery_method: deliveryMethodSchema.required(),
    stores: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
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
