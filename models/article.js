const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const articleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[{
        type:String,
    }],
    likes:{
        type:Number,
        default:0
    },
    disLikes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Article',articleSchema);