const apiKey = (req, res, next) => {
    const key = req.headers['authorization-api-key'];

    if (!key) return res.status(403).json({ message: 'Access Forbiden' })

    if (key != process.env.AUTHORIZATION_API_KEY) return res.status(403).json({ message: 'Access Forbiden' })

    next()
}

module.exports.guards = {
    apiKey
}