import Auth from '../../../hoc/auth';
import { Row, Col, List, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import { useSelector } from "react-redux";


function DetailVideoPage() {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState([]);
    const user = useSelector(state => state.user);
    // console.log(user);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', { videoId })
            .then(res => {
                if (res.data.success) {
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

                        <List
                            itemLayout="horizontal"
                            dataSource={[videoDetail]}
                            renderItem={(item, index)=>(
                                
                                <List.Item actions={[<Subscribe userTo={item.writer._id} userFrom={user.userData.isAuth ? user.userData._id : false}/>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} src="https://joesch.moe/api/v1/random?key=1" />}
                                        title={item.writer.name}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />

                        {/* Comments */}


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