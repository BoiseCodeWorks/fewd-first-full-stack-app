let router = require('express').Router()
let Wifle = require('../models/Wifle')

router.get('/', (req, res, next) => {
    Wifle.find({}).populate('author', 'displayName')
        .then(wifles => {
            res.send(wifles)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    req.body.author = req.session.uid
    Wifle.create(req.body)
        .then(wifle => {
            res.send(wifle)
        })
        .catch(next)
})

//subdocuments
//route to add/delete comments on a wifle
    //could split this into two seperate routes if wanted to and add additional safety checks
router.put('/:id/comments', (req, res, next) => {
    Wifle.findById(req.params.id)
        .then(wifle => {
            //either create or delete a comment
                //cannot update a comment with this routes logic
            if (!req.body._id) {
                //create a comment
                req.body.author = req.session.uid
                wifle.comments.push(req.body)
            } else {
                //delete the comment
                let commentId = req.body._id
                wifle.comments.forEach((c, index) => {
                    if (c._id.toString() == commentId) {
                        wifle.comments.splice(index, 1)
                    }
                })
            }
            return wifle.save()
        })
        .then(() => res.send({message: "Wifle comments updated"}))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Wifle.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({message: "Wifle deleted!"})
        })
        .catch(next)
})

module.exports = router