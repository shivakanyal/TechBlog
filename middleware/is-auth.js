module.exports = (req,res,next) =>{
    if(!req.session.isLoggedIn){
        console.log('req.user.isLoggedIn : ',req.session.isLoggedIn)
        res.redirect('/login');
    }
    next();
}