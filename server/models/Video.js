const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    
    writer: {
        // User 모델에서 아이디를 불러와 저장
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true }) //만든날짜와 업데이트한 날짜 표시


const Video = mongoose.model('Video', videoSchema, 'videos');

module.exports = { Video }