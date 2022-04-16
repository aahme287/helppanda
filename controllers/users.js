const auth = require('../lib/auth')
const User = require('../models/user')
const common = require('../lib/common')

function createPayload(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}

module.exports.signup = (req, res, next) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email and Password are required'
        })
    }

    if(req.body.email == 'nobody@domain.com') {
        return res.status(400).json( {
            success: false,
            message: 'Unable to Signup'
        })
    }

    const salt = auth.generateSalt()
    const hashedPassword = auth.hashPassword(password, salt)

    // after registration
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    console.log('user:', user)
    console.log('user id:', user.id, 'email:', user.email)

    // save
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: common.getErrorMessage(err)
            })
        }

        // create the token
        const payload = createPayload(user)
        const token = auth.encodeToken(payload)

        res.json({
            success: true,
            message: 'Signup successful.',
            token
        })
    })   
}

module.exports.signin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Both email and password are required'
        })
    }

    if(email == 'nobody@domain.com') {
        return res.status(400).json({
            success: false,
            message: 'Unable to signin'
        })
    }

    // find the user
    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: common.getErrorMessage(err)
            })
        }
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        if (!auth.verifyPassword(password, user.password, user.salt)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }
        
        const payload = createPayload(user)
        const token = auth.encodeToken(payload)

        res.json({
            success: true,
            message: 'Login success',
            token
        })
    });
}