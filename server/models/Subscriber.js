const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    
    // 구독받는 사람
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //구독하는 사람
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true }) //만든날짜와 업데이트한 날짜 표시


const Subscriber = mongoose.model('Subscriber', subscriberSchema, 'subscriber');

module.exports = { Subscriber }