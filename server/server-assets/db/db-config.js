let mongoose = require('mongoose')

//mongodb://<Username>:<password>@<database server>/<server name>
let connectString = 'mongodb://wifles:Kr0RsN~3Lq_4@den1.mongo1.gear.host:27001/wifles'

let connection = mongoose.connection

//establisheds connection to the database
mongoose.connect(connectString, {
    useNewUrlParser: true
})

connection.on('error', err => {
    console.error('[DB ERROR]', err)
})

connection.once('open', () => console.log('db connection established'))