const {validationResult} = require('express-validator')
const Article = require('../models/article');

const fileHelper = require('../util/file')

exports.getMyArticles = async (req,res,next) =>{
    try{
    const articles = await Article.find().sort({'createdAt':-1})

    const userId = req.session.userId;

    articles.filter(article => article.userId === userId)
    res.render('article/article-list',{
        articles:articles,
        pageTitle:'Myarticles',
        myArticles:true,
        isAuthenticate:req.session.isLoggedIn
    })
    }
    catch(err){
        next(err);
    }
}

exports.getAllArticles = async (req,res,next) =>{
    try {
        const articles = await Article.find().sort({'createdAt':-1});
        if(!articles){
            const err = new Error('Article not found')
            throw err
        }
        res.render('article/article-list',{
            articles:articles,
            pageTitle:'Allarticles',
            myArticles:false,
            editing:false,
            isAuthenticate:req.session.isLoggedIn
        })

    } catch (error) {
        next(error);
    }
}

exports.getAddArticle = async (req,res,next) =>{
    
    res.render('article/add-article',{
        pageTitle:'add-article',
        isAuthenticate:req.session.isLoggedIn,
        editing:false,
        errorMessage:'',
        validationErrors:[],
        hasError:false
    })
}

exports.postAddArticle = async (req,res,next) =>{

    try {
        console.log(req.file.path);
        const title = req.body.title;
        const description = req.body.description;
        const imageUrl = req.file.path;
       
        const userId = req.session.user._id;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            return res.status(422).render('article/add-article',{
                pageTitle:'add-article',
                hasError:true,
                editing:false,
                isAuthenticate:req.session.isLoggedIn,
                article:{
                    title,
                    imageUrl,
                    description
                },
                errorMessage:errors.array()[0],
                validationErrors:errors.array()
            });
        }
    const article = new Article({
        title:title,
        description:description,
        imageUrl:imageUrl,
        userId:userId
    })
    console.log(imageUrl)
    await article.save();
    res.redirect('/articles')
    
    } catch (error) {
        error.message  = 'Article is not saved..'
        next(error)  
    }
}

exports.getEditArticle = async (req,res,next) =>{
    try {
        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);
        if(article){
            res.render('article/add-article',{
                article:article,
                pageTitle:'edit-article',
                isAuthenticate:req.session.isLoggedIn,
                editing:true,
                errorMessage:'',
                validationErrors:[],
                hasError:false
            })
        }else{
            const error = new Error('Article not found...')
            throw error;
        }
    } catch (error) {
        next(error)
    }
}

exports.postEditArticle = async (req,res,next) =>{
    try {
        const updatedTitle = req.body.title;
        const updatedDes = req.body.description;
        const image = req.file;
        
        const articleId = req.body.articleId;
        
        const article = await Article.findById(articleId)

        if(!article){
            const error = new Error('Article not found..')
            throw error 
        }
        article.title = updatedTitle;
        article.description = updatedDes;
        if(image){
            fileHelper.deleteFile(article.imageUrl)
            article.imageUrl = req.file.path;
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render('/article/add-product',{
                pageTitle:'add-article',
                hasError:true,
                editing:true,
                isAuthenticate:req.session.isLoggedIn,
                article:{
                    title,
                    imageUrl,
                    description
                },
                errorMessage:errors.array()[0]
            });
        }
        await article.save();
        res.redirect('/articles')
    } catch (error) {
        next(error)
    }
}

exports.postDeleteArticle = async (req,res,next) =>{
    try {
        const articleId = req.body.articleId;
        const article = await Article.findById(articleId);
        if(!article){
            const error = new Error('article not found');
            error.statusCode = 404;
            throw error;
        }
        else{
           await  Article.deleteOne(article);
           fileHelper.deleteFile(article.imageUrl)
        }
        res.redirect('/articles')
    } catch (error) {
        next(err);
    }   
}

// exports.getIndex = async (req,res,next) =>{
//     try {
//         res.render('article/index',{
//             pageTitlle:'Index',
//             isAuthenticate:req.session.isLoggedIn
//         })
//     } catch (error) {
//         next(error);
//     }
// }

exports.getIndex = (req,res,next) =>{
  try{
    //   console.log(__dirname,__filename);
    // console.log('hello how are you?')
    res.render('article/index',{
        pageTitle:'Index',
        isAuthenticate:req.session.isLoggedIn
    })
  }catch(err){
      console.log('am i running ?')
    console.log(err)
  }
}

exports.initializedMaps = async(req,res,next) =>{
    const article = await Article.find();
    res.json({
        articles:articles
    })
}

exports.saveLikes = async (req,res,next) =>{
    const likes = req.body.likes;
    console.log(likes);
}