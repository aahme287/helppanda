let jwt  = require('jsonwebtoken')

function authenticate(req, res, next) {
    // ie. Authorization: Bearer <token>
    const header = req.headers['authorization'] 
    if(!header) {
        return res.status(403).json({
            success: false,
            message: 'Authroization information missing'
        })
    }

    const token = header.split(' ')[1]

    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = user
        next()
    } catch(err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid Access Token'
        })
    }
}

module.exports = authenticate