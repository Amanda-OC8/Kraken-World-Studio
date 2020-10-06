const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const whitelist = [process.env.DOMAIN_LOCAL, process.env.DOMAIN_REMOTE]
const corsOptions = {
    origin: (origin, cb) => {
        console.log(whitelist, origin)
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    }
}




module.exports = app => {
    app.use(cors({ credentials: true, origin: whitelist }))
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
}