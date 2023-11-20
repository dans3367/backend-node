export const sendApiResponse = (res, code, message, data = {}) => {

    return res.status(200).json({
        code,
        message,
        data
    })
}

