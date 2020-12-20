const User = require('./models/user')
const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

const errorController = require('./controllers/error')
const store = new MongoDBStore({
    uri:'mongodb://localhost:27017/blogWorld',
    collection:'sessions'
})

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// const articleRoutes = require('/Users/hp/Desktop/BlogWorld/routes/article');
const articleRoutes = require('./routes/article')
const authRoutes = require('./routes/auth')

app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.set('view engine','ejs');
app.use(flash());
// 5fb0f57755436409c8b4e34f
// 5fb15459cb75d027acf87138



// configuring session
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false,store:store}));

// app.use((req,res,next )=>{
//    User.findOne({email:req.user.email})
  
// })

app.use((req,res,next) =>{
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user =>{
      req.user = user;
      isAuthenticate=true;
      next();
    })
    .catch(err =>{
      console.log(err);
    })
});


app.use(articleRoutes);
app.use(authRoutes);

app.get('/500',errorController.get500);

app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   console.log(req)
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticate: req.session.isLoggedIn
//   });
// });

mongoose.connect(
    'mongodb://localhost:27017/blogWorld',
     {useNewUrlParser: true}
     )
    .then(result => {
      app.listen(3000);
      console.log(__dirname)
    })
    .catch(err => {
      console.log(err);
    });
