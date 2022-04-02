let jwt  = require('jsonwebtoken')

module.exports.signup = (req, res, next) => {
    if(req.body.email == 'nobody@domain.com') {
        return res.status(400).json( {
            success: false,
            message: 'Unable to Signup'
        })
    }

    return res.json({
        success: true,
        message: 'Signup successful.'
    })
}

module.exports.signin = (req, res, next) => {
    const email = req.body.email
    if(!email) {
        return next(new Error('Invalid requiest'))
    }

    if(email == 'nobody@domain.com') {
        return res.status(400).json({
            sucess: false,
            message: 'Unable to signin'
        })
    }

    const user = req.body

    const token = jwt.sign(user, process.env.JWT_TOKEN)
    res.json({
        success: true,
        token
    })
}

module.exports.signout = (req, res, next) => {
    return res.json({
        success: true,
        message: 'Signout success'
    })
}