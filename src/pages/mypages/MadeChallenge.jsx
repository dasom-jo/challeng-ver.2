import { useState } from "react";
import Modal from 'react-modal';
import { challengApi } from "../../api/services/challenge";
import myButtons from "./css_module/Buttons.module.css";
import madeChallenge from './css_module/MadeChallenge.module.css';

const MadeChallenge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const OpenModal = () => setIsOpen(true);
    const CloseModal = () => setIsOpen(false);

    return (
        <div>
            <button
                className={myButtons.MadeChallenge}
                onClick={OpenModal}
            >
            챌린지개설
            </button>
            <MadeChallengeModal
                isOpen={isOpen}
                CloseModal={CloseModal}
            />
        </div>
    );
}

export default MadeChallenge;

//챌린지 기획 모달--------------------------------------------------------
export const MadeChallengeModal = ({ isOpen, CloseModal }) => {
    const token = localStorage.getItem('token');
    //전체파일 상태관리
    const [uploadPlan, setUploadPlan] = useState();
    //각각 상태관리
    const [img, setImg] = useState(null);
    const [challengeName, setChallengeName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [caution, setCaution] = useState("");
    const [deposit, setDeposit] = useState("");
    const [max, setMax] = useState(20);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(file);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleChallengeNameChange = (e) => setChallengeName(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handleCautionChange = (e) => setCaution(e.target.value);
    const handleMaxChange = (e) => setMax(e.target.value);
    const handleDepositChange = (e) => setDeposit(e.target.value);

    const uploadChallenge = async () => {
        if (!challengeName || !startDate || !endDate || !introduction || !deposit) {
            alert('필수 필드를 모두 입력해야 합니다.');
            return;
        }

        // 서버로 전송할 데이터 구성
        const data = {
            name: challengeName,
            startDay: startDate,
            endDay: endDate,
            comment: introduction,
            caution: caution,
            point: deposit,
            max: max,
            img: img
        };
        try {
            const res = await challengApi.uploadChallenge(data, token);
            setUploadPlan(res.data.payload);
            alert("챌린지 등록이 완료되었습니다");
            CloseModal();
        } catch (err) {
            console.error(err);
        }
    }

    const DeleteBtn = () => {
        CloseModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={CloseModal}
                contentLabel="챌린지 기획서"
                className={madeChallenge.MadeModal}
            >
                <h3 className={madeChallenge.name}>챌린지 기획서</h3>
                <div className={madeChallenge.image}>
                    <label htmlFor={madeChallenge.mainImg} id={madeChallenge.Click}>이미지 등록하기 click!</label>
                    <input type="file" onChange={handleImageUpload} id={madeChallenge.mainImg}></input>
                    {imagePreview && <img src={imagePreview} alt="대표 이미지 미리보기" />}
                    <div>
                        <label>챌린지 이름</label>
                        <input type="text" placeholder="8글자 내외로 작성하세요" onChange={handleChallengeNameChange}></input>
                    </div>
                    <div>
                        <label>챌린지 기간</label>
                        <input type="date" onChange={handleStartDateChange}></input>
                        -
                        <input type="date" onChange={handleEndDateChange}></input>
                    </div>
                    <div>
                        <label>챌린지 소개</label>
                        <input
                            type="text"
                            placeholder="챌린지 소개와 인증방법을 소개해주세요"
                            onChange={handleIntroductionChange}
                            className={madeChallenge.Input}
                        ></input>
                    </div>
                    <div>
                        <label>챌린지 주의사항</label>
                        <input
                            type="text"
                            placeholder="이건 꼭 챙기자!"
                            onChange={handleCautionChange}
                            className={madeChallenge.Input}
                        ></input>
                    </div>
                    <div>
                        <label>모집인원</label>
                        <input type="text" onChange={handleMaxChange}></input>:명
                    </div>
                    <div>
                        <label>우승상금</label>
                        <input type="number" onChange={handleDepositChange}></input>:P
                    </div>
                    <div>
                        <button onClick={uploadChallenge}>등록하기</button>
                        <button onClick={DeleteBtn}>취소하기</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
