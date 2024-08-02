import { useState, useContext, useEffect } from "react";

import Modal from 'react-modal';
import { UserChallengeItem } from "./ChallengeManage";
import { challengApi } from "../../api/services/challenge";
import challengeCertification from './css_module/Certification.module.css'

const Certification = () => {
    const [modal, setModal] = useState(false);
    const open = () => { setModal(true); }
    const close = () => { setModal(false); }

    return (
        <>
            <button className={challengeCertification.AuthButton} onClick={open}>인증</button>
            <CertificationModal close={close} modal={modal} />
        </>
    );
}

export default Certification;

export const CertificationModal = ({ close, modal }) => {
    const token = localStorage.getItem("token");
    const challengeItem = useContext(UserChallengeItem);
    const [myImg, setMyImg] = useState(null);
    const [preImg, setPreImg] = useState(null);
    const [complete, setComplete] = useState();
    const [showChallengeList, setShowChallengeList] = useState([]);

    const showChallenge = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setMyImg(file);
                setPreImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadChallenge = async () => {
        const data = {
            img: myImg,
            SuccessId: challengeItem.id
        };
        try {
            if (myImg) {
                const res = await challengApi.uploadCheck(data, token);
                setComplete(res.data.payload);
                alert("인증완료하였습니다");
                showList();
                setMyImg(null);
                setPreImg(null);
            } else {
                alert("이미지를 업로드해야 챌린지 인증이 가능합니다");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const showList = async () => {
        try {
            const id = challengeItem.ChallengeId;
            const res = await challengApi.getCheckByChallengeId(id);
            if (res && res.data) {
                setShowChallengeList(res.data);
            } else {
                console.error("Unexpected response structure", res);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        showList();
    }, [modal]);


    return (
        <Modal
            isOpen={modal}
            onRequestClose={close}
            contentLabel="챌린지 인증모달"
            className={challengeCertification.customModal}
        >
            <div className={challengeCertification.modalContent}>
                <div className={challengeCertification.modalHeader}>
                    <h3>{challengeItem.Challenge.name}</h3>
                    <p style={{ color: 'gray' }}>인증 처리는 오전 12시 이후 갱신 됩니다</p>
                </div>
                <div className={challengeCertification.modalBody}>
                    <label
                        style={{
                            border: '1px solid gray',
                            padding: "5px",
                            margin: "5px",
                            borderRadius: "5%",
                            backgroundColor: '#00aeda',
                            cursor: 'pointer'
                        }}
                        htmlFor="uploadImg"
                    >이미지찾기</label>
                    <input type="file" onChange={showChallenge} id="uploadImg" style={{ display: 'none' }} />
                    {preImg ?
                        <img src={preImg} alt="나의 인증 이미지" style={{ width: '318px', height: '318px' }} />
                        : ""
                    }
                    <button onClick={uploadChallenge}>인증완료</button>
                    <p>일자별 인증 현황리스트</p>
                    <div className={challengeCertification.challengeList}>
                        {showChallengeList.map(item => (
                            item.SuccessId === challengeItem.id && (
                                <div key={item.id} className={challengeCertification.CertificationList}>
                                    <p>ID: {challengeItem.UserId}</p>
                                    <p>Date: {item.createdAt}</p>
                                    <img
                                        src={`http://localhost:8000${item.img}`}
                                        alt="타 유저의 인증 이미지"
                                        className={challengeCertification.CertificationImg} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
