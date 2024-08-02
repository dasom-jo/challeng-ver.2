import React, { useEffect, useState } from "react";
import styleHeader from  "../css_module/Header.module.css"
import {useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';//커뮤니티아이콘
import FavoriteIcon from '@mui/icons-material/Favorite';//마이페이지 아이콘
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';//쇼핑몰아이콘
import LogoutIcon from '@mui/icons-material/Logout';//로그아웃 아이콘
import Banner from "../Banner";
import BannerMessage from "../BannerMessage";
import NotificationsIcon from '@mui/icons-material/Notifications';//마이메세지아이콘
import SwipeableEdgeDrawer from "../MyMessage"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';//로그인아이콘
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";


const Header = () => {

    const [showNav, setShowNav] = useState(false);
    const [scrollY, setScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = (e) => {
                const myScrollY = window.scrollY;
            if (myScrollY < scrollY) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            setScrollY(myScrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollY]);


    const {loginUser,logout} = useAuth();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const navigate = useNavigate();

    //기본메뉴:로그아웃된상태
    const [menus, setMenus] = useState([
        { path: "/community" , label:"커뮤니티",icon:PeopleIcon },
        { path: "/shopping" , label:"쇼핑몰",icon:AddShoppingCartIcon },
        { path: "/login" , label:"로그인",icon:ExitToAppIcon },
    ]);
    //로그인되어잇을시
    useEffect(()=>{
        if(loginUser){
            setMenus([
                {path: "/", label:"마이메세지",icon:NotificationsIcon},
                {path: "/community", label:"커뮤니티",icon:PeopleIcon},
                {path: "/mypage", label:"마이페이지",icon:FavoriteIcon},
                {path: "/shopping", label:"쇼핑몰",icon:AddShoppingCartIcon},
                {path: "/logout", label:"로그아웃",icon:LogoutIcon},
                ])
        }else {
            setMenus([
                { path: "/community" , label:"커뮤니티",icon:PeopleIcon },
                { path: "/shopping" , label:"쇼핑몰" ,icon:AddShoppingCartIcon},
                { path: "/signin" , label:"로그인",icon:LogoutIcon },
            ]);
            }
    },[loginUser])

    const goToMenu = (path) => {
        navigate(path);
    };

    const [openDrawer, setOpenDrawer] = useState(false);


    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer); // 알람 창 열기/닫기 토글
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleLogout = () => {
        logout(() => {
            Toast.fire({
                icon: "success",
                title: "안녕히가세요."
            })
            goToMenu('/')
        });
    }
    const bottonNavStyle = {
        width: "700px",
        backgroundColor: "transparent",
        color:'black'
    };
    const activeStyle = {
        color: "orange",
    };

    return (
        <>
        {/* 최상단 광고배너 */}
        <Banner ><BannerMessage /></Banner>
        {/* 챌린지 홈 마크 */}
        <div className={`${styleHeader.HeaderClass} ${showNav && styleHeader.TestClass}`}>
            <h1 id={styleHeader['logo']}
                onClick={() => goToMenu('/')}
            >CHALLEN.GG</h1>
        {/* 상단바  */}
        <BottomNavigation
            sx={bottonNavStyle}
            className={styleHeader.BottomNavigation}
            value={value}
            onChange={handleChange}>
                {
                    menus.map((m, idx) => (
                        <BottomNavigationAction
                        sx={{
                            color: "white",
                            '&.Mui-selected': activeStyle,
                        }}
                            className={styleHeader.BottomNavigationAction}
                            key={idx}
                            icon={m.icon ? <m.icon /> : null}
                            label={m.label}
                            onClick={
                                m.path === '/logout' ?
                                () => handleLogout()
                                :
                                m.label === '마이메세지' ? toggleDrawer : () => goToMenu(m.path)
                            }
                        />
                    ))
                }
        </BottomNavigation>
        </div>

        {/* 마이메세지페이지 사이드바 창 */}
        <SwipeableEdgeDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
        </>
    );
}

export default Header;