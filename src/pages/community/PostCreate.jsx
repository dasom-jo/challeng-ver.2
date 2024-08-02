import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { postApi } from '../../api/services/post';
import UploadIcon from '@mui/icons-material/Upload';


export default function PostCreate({commId, setPosts, posts, setOriginalPosts}) {
    const{
        register,
        reset,
        handleSubmit,
        formState: {isSubmitting, errors},
    } = useForm()

    const {loginUser} = useAuth();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        try {
            if(loginUser){
                setOpen(true)
            } else {
                throw new Error();
            }
        } catch (error) {
            Swal.fire({
                text: '로그인 이후에 가능해요',
                icon: "error"
            });
        }
    };

    const onRegist = (async (data)=>{
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('img', data.img[0]);
            formData.append('category', commId)
            const res = await postApi.addPost(formData, localStorage.getItem("token"));
            if (res.data.code === 200) {
                Swal.fire({
                    title: "게시글 등록!",
                    icon: "success"
                });
                setPosts([res.data.payload, ...posts]);
                setOriginalPosts([res.data.payload, ...posts]);
                handleClose();
            }else {
                throw new Error('알 수 없는 에러');
            }
        }catch (err) {
            Swal.fire({
                title: "에러 발생",
                icon: "error"
            });
            handleClose();
        }
    })

    const handleClose = () => {
        reset()
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<UploadIcon />} onClick={handleClickOpen} style={{height:'56px', backgroundColor: '#00aeda'}}>
                게시글 등록
            </Button>

            <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(onRegist),
            }}
            >
            <DialogTitle>게시글 등록</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="글 제목"
                        type="text"
                        fullWidth
                        autoComplete="off"
                        {...register('title',
                            {
                                required: '글제목은 필수 입력입니다.',
                                maxLength: {
                                    value: 30,
                                    message: '글제목은 최대 30자까지 입력가능합니다.'
                                }
                            }
                        )}
                        error={errors.title ? true : false}
                        helperText={errors.title && errors.title.message}
                    />
                    <TextField
                        label="글 내용"
                        spellCheck={false}
                        multiline
                        rows={5}
                        fullWidth
                        style={{marginTop:5}}
                        autoComplete="off"
                        {...register('content',
                            {
                                required: '글내용은 필수 입력입니다.',
                                maxLength: {
                                    value: 150,
                                    message: '글내용은 최대 150자까지 입력가능합니다.'
                                }
                            }
                        )}
                        error={errors.content ? true : false}
                        helperText={errors.content && errors.content.message}
                    />
                    <TextField
                        type='file'
                        accept="image/*"
                        {...register('img', {required: '이미지는 필수 입력입니다.',})}
                        style={{marginTop:5}}
                        error={errors.img ? true : false}
                        helperText={errors.img && errors.img.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >등록</Button>
                    <Button onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}