let auth = require('../lib/auth')

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
        const user = auth.decodeToken(token)
        req.user = user
        console.log('verified', user)
        next()
    } catch(err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid Access Token'
        })
    }
}

module.exports = authenticate