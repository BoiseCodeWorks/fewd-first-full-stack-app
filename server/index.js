let express = require('express')
let server = express()
let bp = require('body-parser')
let cors = require('cors')
let port = 3000

// run the db-config file to establish connection between server and database
require('./server-assets/db/db-config')

server.use(bp.json())
server.use(bp.urlencoded({
    extended: true
}))

//this whitelist array is the domains from which we will allow requests
let whitelist = ['http://localhost:8080']
//build the cors config options object
let corsOptions = {
    origin: (origin, callback) => {
        //this resolves to a bool that will either allow or deny access via the callback
        let originIsWhitelisted = whitelist.indexOf(origin) != -1 
        callback(null, originIsWhitelisted)
    },
    credentials: true
}
//utlize the cors library with the corsOptions that we just built above
server.use(cors(corsOptions))

//----------------------- Above usually always looks like this

let auth = require('./server-assets/auth/routes')
server.use(auth.session)
server.use('/auth', auth.router)


// importing our routers and telling our server to use them
let wifleRoutes = require('./server-assets/routes/wifles')
server.use('/api/wifles', wifleRoutes)


//Error handler
server.use('*', (err, req, res, next) => {
    console.error(err)
    res.status(err.status || 400).send({err})
})

server.listen(port, () => {
    console.log("Server is running on", port)
})