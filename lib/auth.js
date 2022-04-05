let jwt  = require('jsonwebtoken')
let crypto = require('crypto')


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

module.exports.generateSalt = () => {
    return Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
}

module.exports.hashPassword = (password, salt = null) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
}

module.exports.verifyPassword = (password, verifyPassword, salt) => {
    const hashed = this.hashPassword(password, salt)
    return hashed === verifyPassword
}
