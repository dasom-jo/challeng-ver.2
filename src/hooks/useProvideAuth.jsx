import { useState } from "react";
import axios from 'axios';
import { Cookies } from "react-cookie";
import { userApi } from "../api/services/user";

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState(localStorage.getItem('userId'));

    const login = async (callback1, callback2, data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                data
            );
            if (response.data.code === 200) {
                const id = response.data.userid;
                const token = response.data.accessToken;
                localStorage.setItem('userId', id); // userId라는 키로 id 값을 저장하는 역할
                localStorage.setItem('token', token); 
                setLoginUser(id)
                callback2()
            }
        } catch (error) {
            callback1();
        }
    }

    const logout = async (callback) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        // try {
        //     await userApi.delRefreshToken(loginUser);
        //     setLoginUser();
        //     window.location.replace('/');
        // } catch (err) {
        //     console.error(err);
        // }
        setLoginUser();
        callback();
    }

    const kakaoLogin = () => {
        const cookies = new Cookies();
        if (cookies.get('accessToken') && cookies.get('userId')) {
            localStorage.setItem('userId', cookies.get('userId'));
            localStorage.setItem('token', cookies.get('accessToken'));
            setLoginUser(cookies.get('userId'));  
        } 
        cookies.remove("userId");
        cookies.remove("accessToken");
    }

    return {
        loginUser,
        login,
        logout,
        kakaoLogin
    }
}

// window 객체의 localStorage 속성은 현재 도메인의 로컬저장소에 접근할 수 있게 해준다
// 데이터를 영구적으로 보관할 수 있으며, 데이터는 키와 밸류를 각각 가진다.
// 키는 중복될 수 없다. 그러나 밸류는 같은 것을 쓸 수 있다.
// 문자열 형태의 데이터만 보관할 수 있다.
// 로컬스토리지로부터 데이터를 읽거나 쓸 때에는 메소드를 이용해 접근한다