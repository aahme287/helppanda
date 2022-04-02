let jwt  = require('jsonwebtoken')


module.exports.encodeToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '12h'
    })

    return token
}

module.exports.decodeToken = (token) => {
    const payload = jwt.verify(token, process.env.JWT_TOKEN)

    return payload
}