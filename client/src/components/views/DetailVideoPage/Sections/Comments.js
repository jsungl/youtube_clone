import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

export default function Comments({ videoId, commentList, refreshComment }) {
    const [comment, setComment] = useState("")
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(!user.userData.isAuth) {
            setComment("");
            return alert('로그인을 먼저 해주세요');
        }

        let body = {
            content: comment,
            writer: user.userData._id,
            videoId: videoId
        }
        // console.log(body);

        axios.post('/api/comment/saveComment', body)
        .then(res => {
            if(res.data.success) {
                // console.log(res.data.result);
                setComment("");
                refreshComment(res.data.result);
            }else {
                alert('댓글을 저장하는데 실패하였습니다');
            }
        })
    }

    return (
        <div style={{ marginTop: '50px'}}>
            <p>댓글</p>
            <hr />
            {/* Comment List */}

            { commentList && commentList.map((comment,index) => (
                !comment.responseTo && 
                <div key={index}>
                    <SingleComment videoId={videoId} comment={comment} refreshComment={refreshComment}/>
                    <ReplyComment commentList={commentList} videoId={videoId} refreshComment={refreshComment} parentCommentId={comment._id}/>
                </div>
            ))}


            {/* Root Comment Form */}
            <form style={{ display: 'flex', marginTop: '20px' }} onSubmit={onSubmitHandler}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={comment}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmitHandler}>Submit</Button>
            </form>


        </div>
    );
}