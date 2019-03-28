let expressSession = require('express-session')
let MongoStore = require('connect-mongodb-session')(expressSession) 

let store = new MongoStore({
    uri: 'mongodb://wifles:Kr0RsN~3Lq_4@den1.mongo1.gear.host:27001/wifles',
    collection: 'Sessions'
})

store.on('error', err => {
    console.error('[SESSION ERROR]', err)
})

let session = expressSession({
    secret: "this is top secret",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2
    },
    store,
    resave: true,
    saveUninitialized: true
})

module.exports = session