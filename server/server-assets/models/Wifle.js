let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = 'Wifle'

//subschema / subdocument
    //will be provided it's own _id by mongodb
let comment = new Schema({
    content: {type: String, required: true}
})

let schema = new Schema({
    author: {type: String, required: true},
    content: {type: String, required: true},
    comments: [comment] //utilizing subdocuments within our wifle model
}, {
    timestamps: true
})

module.exports = mongoose.model(name, schema)