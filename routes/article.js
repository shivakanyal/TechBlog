const express = require('express');
const articleController = require('../controllers/article')

const {body} = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/articles',articleController.getMyArticles)

router.get('/all-articles',articleController.getAllArticles);

router.get('/add-article',isAuth,articleController.getAddArticle);

router.post('/add-article',
    [
        body('title','title should be atleat 5 charecters long')
            .isString()
            .isLength({min:5} ,{max:20})
            .trim(),
        body('description','description should be atleat 5 charecters long')
            .isString()
            .isLength({min:5} ,{max:200})
            .trim()
    ]
    ,isAuth,articleController.postAddArticle);



router.get('/edit-article/:articleId',isAuth,articleController.getEditArticle)

router.post('/edit-article',isAuth,articleController.postEditArticle)

router.post('/delete-article',isAuth,articleController.postDeleteArticle)

router.get('/',articleController.getIndex);

router.get('/initializedMaps',articleController.initializedMaps);

router.post('/saveLikes',articleController.saveLikes);


module.exports = router;