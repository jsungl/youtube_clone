const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req,res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
});


router.post('/thumbnail', (req,res) => {
    
    let filePath = ""
    let fileDuration = ""

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        // console.log(metadata);
        // console.log(metadata.format.duration);
        fileDuration = metadata.format.duration; //metadata로부터 비디오 정보를 가져온다.
    })

    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames) { // 썸네일에 대한 파일이름 생성
        // console.log('Will generate ' + filenames.join(', '));
        // console.log(filenames);

        filePath = 'uploads/thumbnails/' + filenames[0]
    })
    .on('end', function() { // 썸네일 생성 후 할 것
        //console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration }); // 성공시 클라이언트에게 응답

    })
    .on('error', function(err) { // 에러발생시
        console.log(err);
        return res.json({ success: false, err });
    })
    .screenshot({ // 옵션 : 3개의 썸네일 생성, 썸네일 저장공간 지정, 썸네일 사이즈는 320x240, 파일이름은 thumbnail-파일 originalname.png 
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        // '%b' : input basename(filename w/o ext)
        filename: 'thumbnail-%b.png'
    })
});

router.post('/uploadVideo', (req,res) => {
    // DB에 비디오 정보 저장
    const video = new Video(req.body);

    video.save().then(() => {
        return res.status(200).json({ success: true })
    })
    .catch(err => {
        res.json({ success: false, err })
    })

});

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec()
    .then((videos) => {
        return res.status(200).json({ success: true, videos })
    })
    .catch(err => res.status(400).send(err))
});

router.post('/getVideoDetail', (req, res) => {
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec()
    .then((videoDetail) => {
        return res.status(200).json({ success: true, videoDetail })
    })
    .catch(err => res.status(400).send(err))
});

router.get('/getSubscriptionVideos', (req, res) => {

    // 전달받은 아이디를 가지고 구독하는 사람들을 찾는다
    Subscriber.find({ userFrom: req.query.userFrom }).exec()
    .then((subscribers) => {
        let subscribedUser = []
        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo);
        });

        //찾은 사람들의 비디오를 모두 가지고 온다
        Video.find({ writer: { $in: subscribedUser } })
            .populate('writer').exec()
            .then((videos) => {
                return res.status(200).json({ success: true, videos })
            })
            .catch(err => res.status(400).send(err))

    })
    .catch(err => { res.status(400).send(err) })
});


module.exports = router;