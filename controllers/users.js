let auth = require('../lib/auth')

module.exports.signup = (req, res, next) => {
    const email = req.body.email
    if(!email) {
        return next(new Error('Invalid requiest'))
    }
    
    if(req.body.email == 'nobody@domain.com') {
        return res.status(400).json( {
            success: false,
            message: 'Unable to Signup'
        })
    }

    // after registration
    const user = req.body

    const token = auth.encodeToken(user)

    res.json({
        success: true,
        message: 'Signup successful.',
        token
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

    const token = auth.encodeToken(user)

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