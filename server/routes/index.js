module.exports = app => {

    // Base URLS
    app.use('/api', require('./kraken.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}