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

module.exports.update = (req, res, next) => {
    const { name, email, password } = req.body
    const id = req.params.id

    if(!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email are required'
        })
    }

    const user = new User({
        _id: id,
        name,
        email,
        password
    })
    
    User.updateOne({_id : id} , user, (err) => {
        if(err) {
            return res.status(400).json({ 
                success: false, 
                message: common.getErrorMessage(err)
              }
          );
        }

        return res.status(200).json({ 
              success: true, 
              message: 'User updated successfully.',
              user
            }
        );
    })
}

module.exports.signup = (req, res, next) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email and Password are required'
        })
    }

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
            user,
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
            user,
            token
        })
    });
}