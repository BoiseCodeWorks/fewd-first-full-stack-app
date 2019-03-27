let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = 'User'

//import bcrypt and assign salt
let bcrypt = require('bcryptjs')
let SALT = 10


let schema = new Schema({
    displayName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hash: {type: String, required: true}
}, {
    timestamps: true
})

//static methods are methods that can only be envoked from Class types eg: Array
schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, SALT)
}

//methods are methods that can only be envoked from instances of a class eg: [1,2]
schema.methods.validatePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.hash, function (err, isMatch) {
            if (err || !isMatch) {
                return reject(err || 'not a match!')
            }
            return resolve(isMatch)
        })
    })
}

module.exports = mongoose.model(name, schema)