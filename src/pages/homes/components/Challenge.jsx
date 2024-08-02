import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ChallengesList from "../css_module/ChallengesList.module.css";
import { RiStarSmileFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { challengApi } from "../../../api/services/challenge";
import ChallengeModal from "../components/ChallengeModal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// 이페이안에는 챌린지 컴포넌트가 들어있습니다 하단의ChallengeCard는 메인페이지에서 보여주는 페이지입니다
//ChallengeModal 컴포넌트는 ChallengeModal.jsx파일에 있습니다
export default function Challenge({ challengeList }) {
  const { loginUser } = useAuth();
  //챌린지의 디테일(모달창내용)
  const [challengeDetail, setChallengeDetail] = useState();
  //챌린지상세모달창의 상태 관리 코드
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달창의 오픈코드
  const handleOpen = (challenge) => {
    setIsModalOpen(true);
    setChallengeDetail(challenge);
  };
  //모달창 클로즈코드
  const handleClose = () => setIsModalOpen(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {challengeList?.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          handleOpen={handleOpen}
          loginUser={loginUser}
        />
      ))}
      { challengeDetail &&
                <ChallengeModal isModalOpen={isModalOpen} handleClose={handleClose} challenge={challengeDetail}/>
      }
    </Carousel>
  );
}

//메인에 보여주는 챌린지 내용

const ChallengeCard = ({ challenge, handleOpen }) => {
  const token = localStorage.getItem("token");
  const { loginUser } = useAuth();
  //관심챌린지 백엔드로 전송하는 상태관리코드
  const [postChallenge, setPostChallenge] = useState();
  //관심취소챌린지 백엔드로 전송하는 상태관리코드
  const [deleChallenge, setdeleChallenge] = useState();
  //관심'별' 상태관리코드
  const [starLike, setStarLike] = useState(false);

  const handleStar = (challenge) => {
    postStar(challenge.id);
    setStarLike(true);
  };
  const handleUnstar = (challenge) => {
    deleteStar(challenge.id);
    setStarLike(false);
  };
  //별모양 누르면 흥미있는 챌린지에 업로드
  const postStar = async (id) => {
    try {
      const res = await challengApi.interestChallenge(id, token);
      setPostChallenge(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  //별모양 다시 누르면 흥미있는 챌린지 삭재
  const deleteStar = async (id) => {
    try {
      const res = await challengApi.uninterestChallenge(id, token);
      setdeleChallenge(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };
  //흥미있는(별모양을 킨) 챌린지코드
  useEffect(() => {
    const interesterArr = challenge.Interester;
    const result = interesterArr.some((obj) => obj.id === loginUser);
    setStarLike(result);
  }, [challenge.Interester, loginUser]);

  //흥미없는(별모양을 끈)챌린지 코드
  useEffect(() => {
    const uninteresterArr = challenge.Interester;
    const result = uninteresterArr.some((obj) => obj.id === loginUser);
    setStarLike(result);
  }, []);

  return (

    <Card
      key={challenge.id}
      className={ChallengesList.ChallengeCard}
      sx={{Width: 300, boxShadow: "5px 5px 20px 1px gray" }}
    >
      <CardActionArea onClick={() => handleOpen(challenge)}>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:8000${challenge.img}`}
          alt="챌린지사진"
        />
        <CardContent>
          <Typography
            sx={{ fontFamily: "Giants-Bold" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {challenge.name}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Giants-Bold" }}>
            시작일: {challenge.startDay}
            <br />
            완료일: {challenge.endDay}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Typography variant="body3">
        {loginUser ? (
          starLike ? (
            <RiStarSmileFill
              onClick={() => handleUnstar(challenge)}
              style={{ fontSize: "30px", margin: "10px", color: "yellow" }}
            />
          ) : (
            <RiStarSmileFill
              onClick={() => handleStar(challenge)}
              style={{ fontSize: "30px", margin: "10px", color: "black" }}
            />
          )
        ) : (
          ""
        )}
      </Typography>
    </Card>
  );
};
