let router = require('express').Router()
let User = require('../models/User')

router.post('/register', (req, res, next) => {
    //req.body will have these properties: displayName, password, and email
    //we need to turn the password into a hash
    req.body.hash = User.generateHash(req.body.password)
    User.create(req.body)
        .then(user => {
            //this will be a user instance and we want to remove the hash before sending to the client
            delete user._doc.hash
            res.send(user)
        })
        .catch(next)
})

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(400).send({message: 'Email or Password Incorrect.'})
            }
            user.validatePassword(req.body.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).send({message: 'Email or Password Incorrect.'})
                    }
                    delete user._doc.hash
                    res.send(user)
                })
        })
        .catch(next)
})

module.exports = router