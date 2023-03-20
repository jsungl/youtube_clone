import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Subscribe({ userTo, userFrom }) {

    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        
        // 구독자 수 정보 가져오기
        axios.post('/api/subscribe/subscribeNumber',{ userTo })
        .then(res => {
            if(res.data.success) {  
                setSubscribeNumber(res.data.subscribeNumber);

            }else {
                alert('구독자 수 정보 받아오기 실패');
            }
        });

        // 구독중인지 확인
        console.log(userFrom);
        axios.post('/api/subscribe/subscribed', { userTo, userFrom })
        .then(res => {
            if(res.data.success) {
                setSubscribed(res.data.subscribed);
            }else {
                alert('구독자중인지 확인 실패');
            }
        })
        
    },[userTo, userFrom])

    
    const onSubscribe = () => {

        // 이미 구독중이라면
        if(subscribed) {
            axios.post('/api/subscribe/unSubscribe',{ userTo, userFrom })
            .then(res => {
                if(res.data.success) {
                    setSubscribeNumber(subscribeNumber - 1);
                    setSubscribed(!subscribed);

                }else {
                    alert('구독 취소 실패');
                }
            })

        }else {
            // 구독중이 아니라면
            axios.post('/api/subscribe/subscribe',{ userTo, userFrom })
            .then(res => {
                if(res.data.success) {
                    setSubscribeNumber(subscribeNumber + 1);
                    setSubscribed(!subscribed);

                }else {
                    alert('구독 실패');
                }
            })

        }


    }

    return (
        <div>
            <button style={{
                backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',
                cursor: 'pointer'
            }}
            onClick={onSubscribe}>
                {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}