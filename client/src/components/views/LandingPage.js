import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../hoc/auth';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
// import { UserOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(res => {
                if (res.data.success) {
                    setVideos(res.data.videos);
                }else {
                    alert('Failed to get Videos');
                }
            })
    }, []);


    const renderCards = videos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        const onClickHandler = () => {
            navigate(`/video/${video._id}`);
        }

        return (
            // 전체가 24칸이라고 보고 lg는 4개씩, md는 3개씩, xs는 1개씩 보여준다
            <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={ 
                        <div style={{ position: 'relative' }}>
                            <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
                                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                                <div className=" duration"
                                    style={{ bottom: '10px', right:0, position: 'absolute', 
                                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                                    fontWeight:'500', lineHeight:'12px' }}>
                                    <span>{minutes} : {seconds}</span>
                                </div>
                            </div>    
                        </div>
                    }
                    bodyStyle={{ padding: "20px 10px" }}
                >    
                
                    <Meta
                        avatar={
                            <Avatar src={video.writer.image} />
                        }
                        title={video.title}
                        description={
                            <div>
                                <span>{video.writer.name}</span><br />
                                <span>{video.views} views · {moment(video.createdAt).fromNow()}</span>
                            </div>
                        }
                    />
                </Card>
            </Col>
        );

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={[16,24]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default Auth(LandingPage, null)