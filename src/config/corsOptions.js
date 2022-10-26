const allowedMethods = [
    "GET",
    "POST",
    "DELETE",
    "UPDATE",
    "PUT",
    "PATCH"
];

const corsOptions = {
    origin: (origin, callback) => {
        const origins = process.env.ORIGINS;
        if (origins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(`Origin ${origin} is not allowed!`.red.bold)
        }
    },
    credentials: true,
    methods: allowedMethods,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;