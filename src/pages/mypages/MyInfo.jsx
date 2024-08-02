
import myInfo from "./css_module/MyInfo.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follow from "./Follow";
import { userApi } from "../../api/services/user";
import ChallengeManage from "./ChallengeManage";
import Kcal from "./Kcal";
import MyButtons from "./MyButtons";
import kcal from "./css_module/Kcal.module.css"
import myButtons from "./css_module/Buttons.module.css"

const MyInfo = () => {
    const token = localStorage.getItem('token');
    //로그인된사용자 정보 가져오는 상태관리
    const [userProfile, setUserProfile] = useState();
    //레벨 조건 exp의 범위에 따라 5가지 레벨로 나눔 (feat.피보나치수열)
    const [level, setLevel] = useState();
    //이미지 받는
    const [profileImg, setProfileImg] = useState("");
    const { id } = useParams();
    //포인트
    const [myPoint, setMyPoint] = useState();
    //이미지 변경시
    const [change, setChange] = useState(false);
    const handleChange=()=>{setChange(true)}
    //닉네임변경시
    const [nickname, setNickname] = useState(false);
    //닉네임변경시
    const openName = () =>{setNickname(true)}
    const closeName = () =>{setNickname(false)}

    //로그인된 사용자의 개인정보를 불러옴
    const getUserInfo = async()=>{
        try {
            const res = await userApi.getUserInfo(token)
            setUserProfile(res.data.payload);
            setProfileImg(res.data.payload.img);
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getUserInfo();
    }, []);


    //사용자의 exp를통해 레벨을 계산해주는 코드
    const getExp = (exp) =>{
        let level;
        if (exp >= 21) {
            level = '카이저';
        }else if (exp >= 13) {
            level = '에너자이저';
        }else if (exp >= 8) {
            level = '에너지';
        }else if (exp >= 5) {
            level = '엔돌핀';
        }else if (exp >= 0) {
            level = '스타터';
        }
        return level;
    }
    // userProfile?.exp;
    useEffect(() => {
        if(userProfile){
            const exp = userProfile.exp;
            setLevel(getExp(exp))
        }
    }, [userProfile]);



    //포인트가져오는 코드
    const Point = async()=>{
        try{
            const res = await userApi.getPoint(id,token)
            setMyPoint(res.data.payload)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        Point();
    },[])


    // 프로필 이미지 업로드하는곳
    const uploadProfileImg = async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData();
                formData.append('img', e.target[0].files[0])
            const response = await userApi.patchUploadImg(formData, token)
                setProfileImg(response.data.img + `?timestamp=${new Date().getTime()}`); //이미지 바뀔때마다 url이 바로알수잇도록
                setChange(false);//클릭에서 다시 프로필 변경 버튼으로
        }catch(err){
            console.error(err);
        }
    }

    //닉네임 바꾸는 코드
    const uploadNickname= async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData();
                formData.append('nickname', e.target[0].value)
            const response = await userApi.patchUploadImg(formData, token)
            setUserProfile(prev => ({...prev, nickname: response.data.nickname}))
            closeName(false);
        }catch(err){
            console.error(err);
        }
    }


    return (
            <div className={myInfo.MyInfo} >
                <div className={myInfo.Info1}>
                    {/* 프로필이미지 */}
                    <div >
                        <img
                            src={`http://localhost:8000/${profileImg}`}
                            id={myInfo.profileImg}
                        />
                    </div>

                    <div className={myInfo.MyInfos}>
                        {/* 프로필이미지변경버튼 */}
                        <form onSubmit={uploadProfileImg}  >
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleChange}
                                className={myInfo.ImgBtn}/>
                            {change ?
                            <button type='submit' >click !</button>
                            :
                            <label htmlFor="fileInput" className={myInfo.ProfileText} >프로필을 변경할까요?</label>
                            }
                        </form>

                        {/* 닉네임 */}
                        {userProfile ? <span className={myInfo.Nick}>{userProfile.nickname}</span> : <p>Loading...</p>}
                        {/* 닉네임변경버튼 */}
                        <form onSubmit={uploadNickname}>
                            <label htmlFor="changename" className={myInfo.changname} onClick={openName}>닉네임을 변경할까요?</label>
                            {nickname?
                                <div className={myInfo.changBtn}>
                                    <input
                                        type="text"
                                        name='nickname'
                                        id="changename"
                                        placeholder="닉네임을 입력해주세요"/>
                                    <button type='submit'>save</button>
                                </div>
                                :
                                <div className={myInfo.changBtn} style={{display:'none' }}>
                                    <input
                                        type="text"
                                        name='nickname'
                                        id="changename"
                                        placeholder="닉네임을 입력해주세요"/>
                                    <button type='submit' >save</button>
                                </div>}
                        </form>

                        <div className={myInfo.Lv} >
                            {/* 유저레벨 */}
                            {userProfile ? <p>LV.{level}</p> : <p >LV.스타터</p>}
                        </div>

                        <div className={myInfo.Points} >
                            {/* 유저포인트 */}
                            {myPoint ? <p >{myPoint.point}Point</p> : <p >0Point</p>}
                        </div>

                        <div className={myInfo.Challengg}>
                            <p>CHALLEN.GG</p>
                        </div>
                    </div>
                </div>

                <div className={myInfo .FollowAndChallenge}>
                    <div>
                        {/* 팔로우팔로잉버튼 */}
                        {userProfile &&
                            <Follow user={userProfile}/>}
                    </div>

                    <div >
                        {/* 챌린지 진행.완료목록 */}
                        <ChallengeManage/>
                    </div>
                </div>

                <div>
                <div className={kcal.kcals}>
                    {/* 칼로리캘린더 */}
                    <Kcal />
                </div>

                <div className={myButtons.Buttons}>
                    {/* 챌린지개설 구매목록 */}
                    <MyButtons/>
                </div>
            </div>
            </div>

    );
}

export default MyInfo;


//개인정보 수정 칸


