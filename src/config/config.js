const path = require('path'),
    PORT = process.env.PORT,
    port = 5000,
    defaultStaticPath = path.resolve('../', 'public'),
    mongoUrl = ({ user, password, project, db }) =>
        `mongodb+srv://${user}:${password}@${project}.gjmtxz0.mongodb.net/${db}?retryWrites=true&w=majority`,
    mongoAuth = {
        user: "apiAdministrator",
        password: "1PFHA1ignOCvSuny",
        project: "apidb",
        db: "webApi"
    },
    mongoOptions = {
        autoIndex: false,
        serverSelectionTimeoutMS: 5000
    };

module.exports = {
    development: { port },
    production: { port: PORT },
}

module.exports.static = {
    path: defaultStaticPath
}

module.exports.db = {
    url: mongoUrl(mongoAuth),
    options: mongoOptions
}