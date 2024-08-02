import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { postApi } from "../../api/services/post";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { getRelativeTime } from "../../utils/date";

const PostComment = ({postComment, setPostComment, postDetail}) => {
  const { loginUser } = useAuth();
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const SHOW_POST_NUM = 5;
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const onRegist = async (data) => {
    try {
      const commentInput = {
        content: data.content,
        postId: postDetail.id,
      };
      const res = await postApi.uploadComment(
        commentInput,
        localStorage.getItem("token")
      );
      if (res.data.code === 200) {
        setPostComment(res.data.payload);
        reset();
      } else {
        throw new Error("알 수 없는 에러");
      }
    } catch (err) {
      Swal.fire({
        text: '로그인 이후에 가능해요',
        icon: "error"
    });
    }
  };

  const deleteComment = async (id) => {
    const res = await postApi.deleteComment(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setPostComment(postComment.filter((c) => c.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
    }
  };

  // pagination 관련
  useEffect(() => {
    setTotalPage(Math.ceil(postComment?.length / SHOW_POST_NUM));
  }, [postComment]);

  const handlePage = (e, v) => {
    setCurPage(v);
  };
  // --------

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onRegist)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          multiline
          sx={{ width: "100%", marginBottom: "10px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" disabled={isSubmitting}>
                  <AddCommentIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          {...register("content", {
            required: "댓글은 필수 입력입니다.",
            maxLength: {
              value: 150,
              message: "댓글은 최대 150자까지 입력가능합니다.",
            },
          })}
          spellCheck={false}
          error={errors.content ? true : false}
          helperText={errors.content && errors.content.message}
        />
      </Box>
      {/* 댓글목록 뿌려주기 */}
      {postComment &&
        postComment
          .slice(SHOW_POST_NUM * (curPage - 1), SHOW_POST_NUM * curPage)
          .map((c) => {
            return (
              <>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={`http://localhost:8000/${c.User.img}`} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ width: "80%" }}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {c.User.nickname}
                          <p
                            style={{
                              marginRight: "0px",
                              fontSize: "12px",
                            }}
                          >
                            {getRelativeTime(c.createdAt)}
                          </p>
                        </Typography>
                        <br />
                        {c.content}
                      </>
                    }
                  />
                  {loginUser == c.UserId && (
                    <Button
                      onClick={() => {
                        deleteComment(c.id);
                      }}
                    >
                      삭제
                    </Button>
                  )}
                </ListItem>
              </>
            );
          })}
      <Stack sx={{ alignItems: "center", mt: "20px" }}>
        <Pagination count={totalPage} onChange={handlePage}></Pagination>
      </Stack>
    </List>
  );
};

export default PostComment;
