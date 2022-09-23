module.exports.checkAcceptCookie = (req, res, next) => {
    const acceptCookie = req.cookies['accept-cookies'];
    
    if (acceptCookie) {
        req.acceptCookie = { status: true };

        if(acceptCookie == 0){
            res.clearCookie('accept-cookies');
            req.acceptCookie = { status: false };
        }
        
        next();
    } else {
        req.acceptCookie = { status: false };
        next();
    }
};