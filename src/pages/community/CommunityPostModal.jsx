import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Button} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { postApi } from "../../api/services/post";
import { userApi } from "../../api/services/user";
import { getRelativeTime } from "../../utils/date";
import PostComment from "./PostComment";

export default function CommunityPostModal({
  postDetail,
  setPosts,
  posts,
  handleClosePost,
  postComment,
  setPostComment,
  getComment,
}) {

  const { loginUser } = useAuth();
  const [pressedLike, setPressedLike] = useState();
  const [myFollowing, setMyFollowing] = useState();
  const [showComment, setShowComment] = useState(false);

  // 게시글 삭제
  const deletePost = async (id) => {
    const res = await postApi.deletePost(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setPosts(posts.filter((p) => p.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      handleClosePost();
    }
  };
  // --------

  // 게시글 작성자 팔로우 관련
  const getFollowings = async (id) => {
    try {
      const res = await userApi.getFollowings(
        id,
        localStorage.getItem("token")
      );
      setMyFollowing(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const followUser = async (id) => {
    const res = await userApi.followUser(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings(loginUser);
    }
  };

  const unfollowUser = async (id) => {
    const res = await userApi.unFollowUser(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings(loginUser);
    }
  };
  // --------

  // 댓글창 관련
  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  // 게시글 좋아요 관련
  const getLikedPostsByUserId = async (id) => {
    try {
      const res = await postApi.getLikedPostsByUserId(
        id,
        localStorage.getItem("token")
      );
      setPressedLike(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (id) => {
    try {
      const res = await postApi.likePost(id, localStorage.getItem("token"));
      if (res.data.code === 200) {
        getLikedPostsByUserId(loginUser);
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요를 누르는 중 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };

  const unlikePost = async (id) => {
    try {
      const res = await postApi.unlikePost(id, localStorage.getItem("token"));
      if (res.data.code === 200) {
        getLikedPostsByUserId(loginUser);
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요 취소를 하는 중 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };
  // --------

  const handleClick = () => {
    window.open(
      `http://localhost:8000/${postDetail.img}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    getComment(postDetail.id);
  }, []);

  useEffect(() => {
    getFollowings(loginUser);
    getLikedPostsByUserId(loginUser);
  }, [loginUser]);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardHeader
        avatar={<Avatar src={`http://localhost:8000/${postDetail.User.img}`} />}
        title={postDetail.User.nickname}
        subheader={getRelativeTime(postDetail.createdAt)}
        action={
          loginUser && loginUser !== postDetail.UserId ? (
            myFollowing?.findIndex((f) => f.id === postDetail.UserId) !== -1 ? (
              <Button onClick={() => unfollowUser(postDetail.UserId)}>
                팔로우 취소
              </Button>
            ) : (
              <Button onClick={() => followUser(postDetail.UserId)}>
                팔로우
              </Button>
            )
          ) : (
            ""
          )
        }
      />

      <CardMedia
        component="img"
        // height="200"
        style={{ width: "100%", cursor: "pointer" }}
        title="클릭하면 확대된 사진을 볼 수 있어요"
        image={`http://localhost:8000/${postDetail.img}`}
        onClick={handleClick}
        alt="본문 이미지"
      />
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {postDetail.content}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {loginUser ? (
            pressedLike?.findIndex((f) => f.id == postDetail.id) === -1 ? (
              <IconButton>
                <FavoriteBorderIcon
                  style={{ color: "red" }}
                  onClick={() => {
                    likePost(postDetail.id);
                  }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <FavoriteIcon
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(postDetail.id);
                  }}
                />
              </IconButton>
            )
          ) : null}

          <IconButton onClick={toggleComment}>
            <ModeCommentIcon sx={{color:'#4483FD'}}/>
          </IconButton>
        </div>
        {loginUser == postDetail.UserId && (
          <Button onClick={() => deletePost(postDetail.id)}>삭제</Button>
        )}
      </CardActions>
      <CardActions>
        {showComment && <PostComment postComment={postComment} setPostComment={setPostComment} postDetail={postDetail}/>}
      </CardActions>
    </Card>
  );
}
