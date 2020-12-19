const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'images');
    },
    filename: (req,file,cb) =>{
        cb(null,new Date().toISOString()+'-'+fileStorage.originalName);
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
}

app.use(multer({
    storage:fileStorage,
    fileFilter:fileFilter
}).single('image'))