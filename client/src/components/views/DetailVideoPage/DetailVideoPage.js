import Auth from '../../../hoc/auth';
import { Row, Col, List, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';

function DetailVideoPage() {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', { videoId })
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data.videoDetail)
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert('비디오 가져오기 실패');
                }
            })

    },[videoId]);

    if(videoDetail.writer) {
        return (
            <Row guttuer={[16, 24]}>
                <Col lg={18} xs={24}>
    
                    <div style={{ width: '100%', padding: '3rem 4em' }}>
    
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>
    
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" />}
                            title={videoDetail.writer.name}
                            description={videoDetail.description}
                            />
                        </List.Item>
                        
                    </div>
                
                
                
                
                
                
                </Col>
    
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );

    }else {
        return(
            <div>loading...</div>
        );
    }

}


export default Auth(DetailVideoPage, null)