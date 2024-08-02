import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


export default function SignUp() {
    const{
        register,
        handleSubmit,
        formState:{isSubmitting, isSubmitted, errors},
        getValues
    } = useForm({mode: 'onChange'})


    const navigate = useNavigate()

    const onRegist = (async (data) => {
        const { id, nickname, password, passwordCheck } = data
        try {
            if (id && nickname && password && passwordCheck && (password === passwordCheck)) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/join`, {
                    id,
                    password,
                    nickname
                })
                if (res.data.code === 200) {
                    Swal.fire({
                        title: "축하합니다!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/signin');
                } else {
                    throw new Error('알 수 없는 에러');
                }
            } else {
                throw new Error("입력값을 확인해주세요");
            }
        } catch (err) {
            Swal.fire({
                title: "에러 발생",
                text: err.response.data? err.response.data.message : '알 수 없는 에러',
                icon: "error"
            });
        }
    });
    return (
        <>
        <img 
            src={`${process.env.PUBLIC_URL}/main.jpg`}
            style={{height:'300px', width:'100vw'}}
        />
        <Container component="main" maxWidth="xs" sx={{marginBottom:'40px'}}>
            <CssBaseline />
            <Box
                sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: '#00aeda' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>

            <Box component="form"
                onSubmit={handleSubmit(onRegist)}

                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    // 필요 없는듯?
                    // id="id"
                    // name="id"
                    label="아이디"
                    {...register("id",
                            {
                                required: '아이디는 필수 입력입니다.',
                                pattern: {
                                    value: /^[a-z0-9_-]{5,20}$/,
                                    message: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
                                }
                            }
                        )
                    }
                    error={errors.id ? true : false}
                    helperText={errors.id && errors.id.message}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='password'
                            autoComplete="off"
                            margin="normal"
                            name="password"
                            required
                            fullWidth
                            id="password"
                            label="비밀번호"
                            {...register("password",
                                {
                                    required: '비밀번호는 필수 입력입니다.',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                                        message: "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
                                    }
                                }
                            )}
                            error={errors.password ? true : false}
                            helperText={errors.password && errors.password.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='password'
                            autoComplete="off"
                            margin="normal"
                            required
                            fullWidth
                            id="passwordCheck"
                            label="비밀번호 확인"
                            name="passwordCheck"
                            {...register("passwordCheck",
                                {
                                    required: '비밀번호는 필수 입력입니다.',
                                    validate: (e) => {
                                        if (e === getValues('password')) {
                                            return true
                                        } else {
                                            return "비밀번호 입력값과 같아야 합니다."
                                        }
                                    }
                                }
                            )}
                            error={errors.passwordCheck ? true : false}
                            helperText={errors.passwordCheck && errors.passwordCheck.message}
                        />
                    </Grid>
                </Grid>
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    id="nickname"
                    label="닉네임"
                    name="nickname"
                    {...register('nickname',
                        {
                            required: '닉네임은 필수 입력입니다.',
                            minLength: {
                                value: 2,
                                message: '2자리 이상 닉네임을 사용하세요.'
                            },
                            maxLength: {
                                value: 10,
                                message: '10자리 이하 닉네임을 사용하세요.'
                            }
                        }
                    )}
                    error={errors.nickname ? true : false}
                    helperText={errors.nickname && errors.nickname.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , backgroundColor:'#00aeda'}}
                    disabled={isSubmitting}
                >
                    회원가입
                </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2" color="#00aeda">
                                이미 아이디가 있으신가요?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </>
    );
}