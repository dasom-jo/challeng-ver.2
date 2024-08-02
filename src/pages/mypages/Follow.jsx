import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import follow from "./css_module/Follow.module.css";
import { userApi } from "../../api/services/user";

const Follow = ({ user }) => {
    const [view, setView] = useState(true);

    const openFollow = () => {
        setView(true);
    };

    const closeFollow = () => {
        setView(false);
    };

    return (
        <div className={follow.Info2}>
            <div className={follow.followBtn}>
                <Button
                    onClick={openFollow}
                    className={follow.followBtn1}
                >
                    팔로워
                </Button>
                <Button
                    onClick={closeFollow}
                    className={follow.followBtn2}
                >
                    팔로잉
                </Button>
            </div>
                <FollowList user={user} view={view} />
        </div>
    );
};

export default Follow;


export const FollowList = ({user,view}) => {

    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    const token = localStorage.getItem('token');


    const getFollowerList = async () => {
        try {
            const res = await userApi.getFollowers(user.id, token);
            if (res.data.code === 200) {
                setFollowerList(res.data.payload);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getFollowingList = async () => {
        try {
            const res = await userApi.getFollowings(user.id, token);
            if (res.data.code === 200) {
                setFollowingList(res.data.payload);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFollowYou = async (id) => {
        try {
            const res = await userApi.followUser(id, token);
            if (res.data.code === 200) {
                getFollowingList();
            }
        } catch (error) {
            console.error('API 호출 중 에러:', error);
        }
    };

    const unFollow = async (id) => {
        try {
            const res = await userApi.unFollowUser(id, token);
            if (res.data.code === 200) {
                setFollowingList(prevList => prevList.filter(following => following.id !== id));
            }
        } catch (error) {
            console.error('API 호출 중 에러:', error);
        }
    };

    useEffect(()=>{
        getFollowerList();
        getFollowingList();
    },[])

    return (


        <>
            { view ? (
                <div className={follow.followLists}>
                    {/* <h2 className={follow.followText}>Followers</h2> */}
                    <div className={follow.followUl}>
                        {followerList.map((follower) => (
                            <li key={follower.id}>
                                <div>
                                    <img className={follow.followImg}
                                        src={`http://localhost:8000/${follower.img}`}
                                    />
                                </div>
                                <div className={follow.flexContainer}>
                                    <div className={follow.followNick}>
                                        {follower.nickname}
                                        <button
                                            onClick={() => { handleFollowYou(follower.id) }}
                                            style={{
                                                border: 'none',
                                                padding: '3px',
                                                borderRadius: "5px",
                                                margin: '5px',
                                                cursor: 'pointer',
                                                backgroundColor: followerList.some(f => f.id === follower.id)
                                                    && followingList.some(f => f.id === follower.id)
                                                    ? "#b5ccfa"
                                                    : "#00aeda",
                                            }}>
                                            {followerList.some(f => f.id === follower.id)
                                                && followingList.some(f => f.id === follower.id)
                                                ? "팔로잉"
                                                : "팔로워"}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            )
            :
            (
                <div className={follow.followLists}>
                    {/* <h2 className={follow.followText}>Followings</h2> */}
                    <di  className={follow.followUl}>
                        {followingList.map((following) => (
                            <li key={following.id}>
                                <div>
                                    <img className={follow.followImg}
                                        src={`http://localhost:8000/${following.img}`}
                                    />
                                </div>
                                <div className={follow.flexContainer}>
                                    <div className={follow.followNick}>
                                        {following.nickname}
                                        <button
                                            onClick={() => { unFollow(following.id) }}
                                            style={{
                                                border: 'none',
                                                padding: '3px',
                                                borderRadius: "5px",
                                                margin: '5px',
                                                cursor: 'pointer',
                                                backgroundColor:'gray'
                                            }}>언팔로우</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </di>
                </div>
            )}

        </>
        );
}



