let mongoose = require('mongoose');
let crypto = require('crypto');


let UserSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true,
            // match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        password: {
            type: String,
            required: true,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: String,
        role:String,
        address: String,
    },
    {
        timestamps: true,
        collection: "User"
    }
);

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);