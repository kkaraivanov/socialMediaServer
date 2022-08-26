const assets = (staticPath) => ('/cdn', (req, res, next) => {
    if (req.path.includes('/cdn')) {
        try {
            req.staticPath = staticPath;
            const resource = staticPath + req.path.replace('/cdn', '');
            return res.sendFile(resource)
        } catch (error) {
            console.info(error);
        }
    }

    next();
});

module.exports = assets