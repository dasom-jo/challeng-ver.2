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

// 챌린지 컴포넌트
export default function Challenge({ challengeList }) {
  const { loginUser } = useAuth();
  // 챌린지 디테일
  const [challengeDetail, setChallengeDetail] = useState();
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달 열기
  const handleOpen = (challenge) => {
    setIsModalOpen(true);
    setChallengeDetail(challenge);
  };
  // 모달 닫기
  const handleClose = () => setIsModalOpen(false);

  // 반응형 설정
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // 데스크탑에서 한 번에 1개 카드
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1, // 태블릿에서 한 번에 1개 카드
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1, // 모바일에서 한 번에 1개 카드
    },
  };
  const CustomLeftArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="cursor-pointer text-2xl"
      style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 10 }}
    >
      ◀
    </div>
  );

  const CustomRightArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="cursor-pointer text-2xl"
      style={{ position: 'absolute', top: '50%', right: '-320px', zIndex: 10 }}
    >
      ▶
    </div>
  );

  return (
<Carousel
  swipeable={true}
  draggable={false}
  showDots={false}
  responsive={responsive}
  infinite={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-10-px"
  arrows
  customLeftArrow={<CustomLeftArrow />}
  customRightArrow={<CustomRightArrow />}
  style={{ position: 'relative' }} // 추가적인 스타일링
>
  {challengeList?.map((challenge) => (
    <ChallengeCard
      key={challenge.id}
      challenge={challenge}
      handleOpen={handleOpen}
      loginUser={loginUser}
    />
  ))}
  {challengeDetail && (
    <ChallengeModal
      isModalOpen={isModalOpen}
      handleClose={handleClose}
      challenge={challengeDetail}
    />
  )}
</Carousel>

  );
}

// 챌린지 카드 컴포넌트
const ChallengeCard = ({ challenge, handleOpen, loginUser }) => {
  const token = localStorage.getItem("token");
  // 관심 챌린지 상태 관리
  const [postChallenge, setPostChallenge] = useState();
  const [deleChallenge, setDeleChallenge] = useState();
  const [starLike, setStarLike] = useState(false);

  const handleStar = (challenge) => {
    postStar(challenge.id);
    setStarLike(true);
  };

  const handleUnstar = (challenge) => {
    deleteStar(challenge.id);
    setStarLike(false);
  };

  // 별모양 클릭 시 관심 챌린지 등록
  const postStar = async (id) => {
    try {
      const res = await challengApi.interestChallenge(id, token);
      setPostChallenge(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  // 별모양 클릭 시 관심 챌린지 삭제
  const deleteStar = async (id) => {
    try {
      const res = await challengApi.uninterestChallenge(id, token);
      setDeleChallenge(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  // 관심 챌린지 상태 확인
  useEffect(() => {
    const interesterArr = challenge.Interester;
    const result = interesterArr.some((obj) => obj.id === loginUser);
    setStarLike(result);
  }, [challenge.Interester, loginUser]);

  return (
    <div>
      <Card
        className={ChallengesList.ChallengeCard}
        sx={{ width: 300, boxShadow: "5px 5px 20px 1px gray" }} // 너비 설정
      >
      <CardActionArea onClick={() => handleOpen(challenge)} >
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
    </div>

  );
};
