import Auth from '../../../hoc/auth';
import { Row, Col, List, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import { useSelector } from "react-redux";


function DetailVideoPage() {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState([]);
    const [commentList, setCommentList] = useState([]);
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

        // 해당 비디오에 대한 모든 댓글 가져오기
        axios.get('/api/comment/getComments', {
            params:{
                videoId
            }
        })
        .then(res=> {
            if (res.data.success) {
                // console.log('comments',res.data.comments);
                setCommentList(res.data.comments)
            }else {
                alert('비디오 정보 가져오기 실패');
            }
        })

    },[videoId]);

    const refreshComment = (newComment) => {
        setCommentList(commentList.concat(newComment)); // 댓글을 저장할 때마다 새로 업데이트
    }

    if(videoDetail.writer) {

        let subscribeButton = <Subscribe userTo={videoDetail.writer._id} userFrom={false}/>

        if(user.userData.isAuth) {
            // 로그인 했다면
            subscribeButton = videoDetail.writer._id !== user.userData._id && 
            <Subscribe userTo={videoDetail.writer._id} userFrom={user.userData._id}/>
        }
       
        return (
            <Row guttuer={[16, 24]}>
                <Col lg={18} xs={24}>
    
                    <div style={{ width: '100%', padding: '3rem 4em' }}>
    
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>

                        <List
                            itemLayout="horizontal"
                            dataSource={[videoDetail]}
                            renderItem={(item, index)=>(
                                
                                <List.Item actions={[<LikeDislikes video userId={user.userData.isAuth ? user.userData._id : false} videoId={videoId} /> ,subscribeButton]}>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} src={item.writer && item.writer.image} />}
                                        title={item.writer.name}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />

                        {/* Comments */}
                        <Comment videoId={videoId} commentList={commentList} refreshComment={refreshComment}/>            

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