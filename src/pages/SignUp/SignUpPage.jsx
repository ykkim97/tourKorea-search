import React from 'react';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CssBaseline,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled(Container)`
    width: 100%;
    height: 80vh;
    min-width: 300px;
    padding-top: 100px;
`;

const SignUpBox = styled(Box)({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const SignUpForm = styled('form')({
    width: '100%',
    marginTop: 1,
});

const SubmitButton = styled(Button)({
    margin: '3px 0 2px',
});

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data); // { email, password, name, gender, birthdate, nickname }

        axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('회원가입 성공:', response.data);
            alert('회원가입이 완료되었습니다!');
            navigate("/login");
        })
        .catch(error => {
            console.error('회원가입 실패:', error);
        });
    };

    return (
        <SignUpContainer component="main" maxWidth="xs">
            <CssBaseline />
            <SignUpBox>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <SignUpForm onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register('email', { required: '이메일을 확인하세요.' })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password', { required: '비밀번호를 확인하세요.' })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                        {...register('name', { required: '이름을 입력하세요.' })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />
                    <RadioGroup row aria-label="gender" name="gender" defaultValue="male">
                        <Grid container spacing={1}>
                            <Grid item>
                                <FormControlLabel value="male" control={<Radio color="primary" />} label="남성" {...register('gender')} />
                            </Grid>
                            <Grid item>
                                <FormControlLabel value="female" control={<Radio color="primary" />} label="여성" {...register('gender')} />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="birthdate"
                        label="생년월일"
                        name="birthdate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register('birthdate', { required: '생년월일을 입력하세요.' })}
                        error={!!errors.birthdate}
                        helperText={errors.birthdate ? errors.birthdate.message : ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="닉네임"
                        name="nickname"
                        autoComplete="nickname"
                        {...register('nickname', { required: '닉네임을 입력하세요.' })}
                        error={!!errors.nickname}
                        helperText={errors.nickname ? errors.nickname.message : ''}
                    />
                    <SubmitButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        회원가입
                    </SubmitButton>
                </SignUpForm>
            </SignUpBox>
        </SignUpContainer>
    );
};

export default SignUpPage;
