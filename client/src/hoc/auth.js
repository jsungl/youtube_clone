import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function authentication (SpecificComponent, option, adminRoute = null) {

    /**
     * option
     * null => 아무나 출입 가능한 페이지
     * true => 로그인한 유저만 출입 가능한 페이지
     * false => 로그인한 유저는 출입 불가능한 페이지
     */

    function AuthenticationCheck() {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res);

                // 로그인하지 않은 상태
                if(!res.payload.isAuth) {
                    if(option) {
                        // 로그인이 필요한 페이지에 들어가려할 때
                        navigate('/login');
                    }
                }else {
                    // 로그인 한 상태
                    
                    if(adminRoute && !res.value.isAdmin) {
                        // admin이 아닌데 admin 페이지에 들어가려할 때
                        navigate('/', { state: { login: true } });
                    }else {
                        if(!option) {
                            // 로그인한 유저가 로그인, 회원가입 페이지에 들어가려할 때
                            navigate('/', { state: { login: true } });
                        }
                    }

                }
            })
        },[dispatch, navigate])

        return (
            <SpecificComponent/>
        )
    }


    return AuthenticationCheck
}