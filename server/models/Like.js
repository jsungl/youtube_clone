const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 좋아요한 comment id
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    // 좋아요한 video id
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }

}, { timestamps: true }) //만든날짜와 업데이트한 날짜 표시


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }