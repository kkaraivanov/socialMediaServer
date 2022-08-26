const router = require('express').Router();

router.get('/', (req ,res) => {
    const cookieName = 'allow-sesion';
    let cookieValue= 0;
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000 
    };
    
    const cookieExist = req.headers.cookie?.includes(cookieName);
    if(cookieExist && cookieValue === 0){
        cookieValue = 1
    }
    
    res.cookie(cookieName, cookieValue, cookieOptions);
    res.status(200).json();
})
module.exports = router