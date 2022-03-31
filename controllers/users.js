

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
    if(req.body.email == 'nobody@domain.com') {
        return res.status(400).json({
            sucess: false,
            message: 'Unable to signin'
        })
    }

    return res.json({
        success: true,
        message: 'Signin success'
    })
}

module.exports.signout = (req, res, next) => {
    return res.json({
        success: true,
        message: 'Signout success'
    })
}