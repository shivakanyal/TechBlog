const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req,res,next) =>{
    // console.log(req.session.isLoggedIn)
    let message = req.flash('error')
    if(message.length>0){
       message = message[0];
    }else{
      message = null;
    }
    res.render('auth/login',{
        pageTitle:'login',
        isAuthenticate:req.session.isLoggedIn,
        errorMessage:message
    })
}


exports.postLogin = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // code to show the error message using connect-flash
        req.flash('error','invalid email or password')
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
         next(err)
          res.redirect('/login');
        });
    })
    .catch(err => next(err));
};


exports.getSignUp = (req,res,next) =>{
  let message = req.flash('error')
  if(message.length>0){
     message = message[0];
  }else{
    message = null;
  }
    res.render('auth/signup',{
        pageTitle:'signup',
        isAuthenticate:req.session.isLoggedIn,
        errorMessage:message
    })
}

exports.postSignUp = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 
    User.findOne({email:email})
        .then(userDoc =>{
      // throw new Error('hey hey hey!')

            if(userDoc){
                req.flash('error','email already exist')
                return res.redirect('/signup')
            }
            bcrypt.hash(password,10)
           .then(hashedPassword =>{
               const user = new User({
                   email:email,
                   password:hashedPassword,
               })
               return user.save()
           })
        })
        .then(result =>{       
            res.redirect('/login')
        })
        .catch(err =>{
           res.redirect('/500')
        })
}   

exports.postLogout = (req,res,next) =>{
      req.session.destroy((err) =>{
        console.log('session is destroyed');
        res.redirect('/');
      })
} 
