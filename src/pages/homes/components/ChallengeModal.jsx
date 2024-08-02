import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState,useEffect } from "react";
import { challengApi } from "../../../api/services/challenge"
import ChallengesList from "../css_module/ChallengesList.module.css";

const ChallengeModal = ({isModalOpen, handleClose, challenge}) => {
    const token = localStorage.getItem('token');
    //유저가 참석했는지 확인하는 코드
    const [userAttend, setUserAttend] = useState();
    //참석하기 / 취소하기 버튼
    const [attend, setAttend] = useState();
    //참석버튼 클릭시 백엔드로 유저 정보 보내는 코드
    const [attendChallenge, setAttendChallenge] = useState();
    //취소버튼 클릭시 백엔드로 유저정보 보내는 코드
    const [refuse, setRefuse] = useState();
    //max값 렌더링을위한 코드
    const [number, setNumber] = useState(challenge.number);
    const openAttend = () => {
        deleteAttend();
        deleteNumber();
        setAttend(true)
    }

    const closeAttend = () => {
        postAttend(challenge.id)
        postNumber();
        setAttend(false)
    }

    //챌린저 참여 여부를 알수있는 코드
    const getAttend = async()=>{
        try{
            const id = challenge.id
            const res = await challengApi.getSuccess(id,token)
            setUserAttend(Boolean(res.data.payload.length))
            //.length 빈배열이면 0(false)
        }
        catch(err){
            console.error(err);
        }
    }

    //참여버튼 클릭시 백엔드로 유저 정보 보내는 코드
    const postAttend = async()=>{
        try{
            const challengeId = challenge.id;
            const res = await challengApi.uploadSuccess(challengeId, token);
            setAttendChallenge(res.data.payload);
            setUserAttend(true);
        }
        catch(err){
            console.error(err);
        }
    }
    //참여버튼 클릭시 백엔드로 max+1해주는 코드
    const postNumber = async () => {
        try {
            const id = challenge.id;
            const updatedNumber = number + 1; // max 값을 1 증가
            const res = await challengApi.modifyChallenge(id, { number: updatedNumber }, token);
            setNumber(updatedNumber); // max 값을 업데이트
        } catch (err) {
            console.error(err);
        }
    }

    //취소버튼 클릭시 백엔드로 max-1해주는 코드
    const deleteNumber = async () => {
        try {
            const id = challenge.id;
            const updatedNumber = number - 1;
            const res = await challengApi.modifyChallenge(id, { number: updatedNumber }, token);
            setNumber(updatedNumber);
        } catch (err) {
            console.error(err);
        }
    }
    //취소버튼 클릭시 백엔드로 유저정보 보내는 코드
    const deleteAttend = async()=>{
        try{
            const challengeId = challenge.id
            const res = await challengApi.deleteSuccess(challengeId, token)
            setRefuse(res.data.payload)
            setUserAttend(false);
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        setNumber(challenge.number);
    }, [challenge]);

    useEffect(()=>{
        getAttend();
    },[challenge])

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="title"
            aria-describedby="body"

        >
            <Box
                className={ChallengesList.ModalBox} >
                <div key={challenge.id} >
                    <Typography id={ChallengesList.title} variant="h6" component="h2">
                        {challenge.name}
                    </Typography>
                    <div>
                        <img
                            src={`http://localhost:8000${challenge.img}`}
                            alt="챌린지 이미지"
                            id={ChallengesList.body2}/>
                        </div>
                    <Typography sx={{fontFamily: 'Giants-Bold'}}>
                        -설명: {challenge.comment}<br />
                        -주의:{challenge.caution}<br />
                        -시작일: {challenge.startDay}<br />
                        -완료일: {challenge.endDay}
                    </Typography>
                    <Typography >
                        <p id={ChallengesList.body4}>-모집인원:{number}/{challenge.max}명</p>
                    </Typography>
                    <Typography >
                        {number>=challenge.max?
                            (<p>모집인원마감</p>)
                        :
                            (userAttend ?
                                <Button onClick={openAttend} className={ChallengesList.body3}>취소하기</Button>
                            :
                                <Button onClick={closeAttend} className={ChallengesList.body3}>참여하기</Button>
                            )
                        }
                    </Typography>
                    <Typography sx={{fontFamily: 'Giants-Bold'}}>
                        포인트점수:{challenge.point}P
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
};
;

export default ChallengeModal;


