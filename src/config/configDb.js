const mongoUrl = ({ user, password, project, db }) =>
    `mongodb+srv://${user}:${password}@${project}.gjmtxz0.mongodb.net/${db}?retryWrites=true&w=majority`,
    mongoAuth = {
        user: "apiAdministrator",
        password: "1PFHA1ignOCvSuny",
        project: "apidb",
        db: "webApi"
    };
const mongoOptions = {
    autoIndex: false,
    serverSelectionTimeoutMS: 5000
};

module.exports.db = {
    url: mongoUrl(mongoAuth),
    options: mongoOptions
}