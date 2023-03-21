import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';

export default function LikeDislikes({ video, userId, videoId, commentId }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);
    const [dislikeAction, setDislikeAction] = useState(null);

    // console.log(video);
    
    let variable = useMemo(() => {
        if(video) {
            // video에 대한 좋아요/싫어요
            return { videoId, userId }
        }else {
            // comment에 대한 좋아요/싫어요
            return { commentId, userId }
        }
    },[video, commentId, userId, videoId])

    
    useEffect(() => {
        
        axios.get('/api/like/getLikes', {
            params: variable
        })
        .then(res => {
            if(res.data.success) {

                // 얼마나 많은 좋아요를 받았는지
                setLikes(res.data.likes.length);

                if(userId) {
                    // 좋아요를 이미 눌렀는지
                    res.data.likes.forEach(like => {
                        if(like.userId === userId) {
                            // 좋아요에 대한 정보중에 현재 로그인한 사용자의 아이디가 있다면 이미 좋아요 누른 상태
                            setLikeAction('liked');
                        }
                    });
                }


            }else {
                alert('Likes에 정보 가져오기 실패');
            }
        });


        axios.get('/api/like/getDislikes', {
            params: variable
        })
        .then(res => {
            if(res.data.success) {

                // 얼마나 많은 싫어요를 받았는지
                setDislikes(res.data.dislikes.length);

                if(userId) {
                    // 싫어요를 이미 눌렀는지
                    res.data.dislikes.forEach(dislike => {
                        if(dislike.userId === userId) {
                            // 싫어요에 대한 정보중에 현재 로그인한 사용자의 아이디가 있다면 이미 싫어요 누른 상태
                            setDislikeAction('disliked');
                        }
                    });
                }

            }else {
                alert('DisLikes에 정보 가져오기 실패');
            }
        })


    },[userId, variable])


    const onLike = () => {

        if(userId) {
            if(likeAction === null) {
                // 좋아요가 눌러져있지 않은 상태
    
                axios.post('/api/like/upLike', variable)
                .then(res => {
                    if(res.data.success) {
                        setLikes(likes + 1);
                        setLikeAction('liked');
    
                        // 싫어요가 이미 눌러져있던 상태라면
                        if(dislikeAction !== null) {
                            setDislikeAction(null);
                            setDislikes(dislikes - 1);
                        }
    
    
                    }else {
                        alert('좋아요 올리기 실패');
                    }
                })
    
            }else {
                // 좋아요가 눌러져있는 상태
                axios.post('/api/like/unLike', variable)
                .then(res => {
                    if(res.data.success) {
                        setLikes(likes - 1);
                        setLikeAction(null);
                    }else {
                        alert('좋아요 내리기 실패');
                    }
                })
    
            }

        }else {
            alert('로그인을 먼저 해주세요');
        }

        
    }


    const onDislike = () => {

        if(userId) {
            if(dislikeAction !== null) {
                // 싫어요가 눌러져있는 상태
    
                axios.post('/api/like/unDislike', variable)
                .then(res => {
                    if(res.data.success) {
                        setDislikes(dislikes - 1);
                        setDislikeAction(null);
    
                    }else {
                        alert('싫어요 내리기 실패');
                    }
                })
    
            }else {
                // 싫어요가 눌러져있지 않는 상태
                axios.post('/api/like/upDislike', variable)
                .then(res => {
                    if(res.data.success) {
                        setDislikes(dislikes + 1);
                        setDislikeAction('disliked');
    
                        // 좋아요가 이미 눌러져있던 상태라면
                        if(likeAction !== null) {
                            setLikeAction(null);
                            setLikes(likes - 1);
                        }
    
                    }else {
                        alert('좋아요 내리기 실패');
                    }
                })
            }

        }else {
            alert('로그인을 먼저 해주세요');
        }
    }
    

    return (
        <div>
            <Tooltip key="comment-basic-like" title="Like">
                <span onClick={onLike} style={{ cursor: 'pointer' }}>
                    {likeAction === 'liked' ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action">{likes}</span>
                </span>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={onDislike} style={{ cursor: 'pointer' }}>
                    {dislikeAction === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
                    <span className="comment-action">{dislikes}</span>
                </span>
            </Tooltip>
            &nbsp;&nbsp;
        </div>
    );
}