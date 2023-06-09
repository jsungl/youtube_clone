import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SideVideo() {

    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(res => {
                if (res.data.success) {
                    // console.log(resp.data.videos)
                    setSideVideos(res.data.videos)
                } else {
                    alert('사이드 비디오 가져오기 실패');
                }
            })
    }, [])

    const renderSideVideo = sideVideos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }} key={index}>
                <div style={{ width:'40%', marginRight:'1rem' }}>
                    <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                        <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    </a>
                </div>

                <div style={{ width:'50%' }}>
                    <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views} views</span><br />
                        <span>{minutes} : {seconds}</span><br />
                    </a>
                </div>
            </div>
        );


    });





    return (
        <div>
            {renderSideVideo}
        </div>
    );
}