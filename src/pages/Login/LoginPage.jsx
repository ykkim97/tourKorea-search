import React from 'react';
import {useForm} from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CssBaseline
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginUser from '../../store/Login/useLoginUser';

const LoginContainer = styled(Container)`
    width: 100%;
    height: 80dvh;
    min-width: 300px;
    padding-top: 100px;
`;

const LoginBox = styled(Box)({
    marginTop: 8, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
});

const LoginForm = styled('form')({
    width: '100%',
    marginTop: 1
});

const SignupNavigator = styled(Typography)`
    cursor: pointer;
    &:hover {
        font-weight: bold
    }
`;

const SubmitButton = styled(Button)({margin: '3px 0 2px'});

const LoginPage = () => {
    const { setUserData } = useLoginUser();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {
            errors
        }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
        axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/login`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Login status', response.data);
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name === 'x_auth') {
                    localStorage.setItem('x_auth', value);
                }
            });
            setUserData(response.data)
            navigate("/");
        })
        .catch(error => {
            alert('계정을 확인해주세요.')
            console.error('회원가입 실패:', error);
        });
    };

    return (
        <LoginContainer component="main" maxWidth="xs">
            <CssBaseline/>
            <LoginBox>
                <Typography component="h1" variant="h5">
                    계정 로그인
                </Typography>
                <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required="required"
                        fullWidth="fullWidth"
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus="autoFocus"
                        {...register('email', { required: '이메일을 확인하세요.' })}
                        error={!!errors.email}
                        helperText={errors.email
                            ? errors.email.message
                            : ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required="required"
                        fullWidth="fullWidth"
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password', { required: '비밀번호를 확인하세요.' })}
                        error={!!errors.password}
                        helperText={errors.password
                            ? errors.password.message
                            : ''}
                    />
                    <SubmitButton
                        type="submit"
                        fullWidth="fullWidth"
                        variant="contained"
                        color="primary"
                    >
                        로그인
                    </SubmitButton>

                    <Box textAlign="right">
                        <SignupNavigator 
                            onClick={() => navigate("/signup")}
                        >
                            계정이 없으신가요?
                        </SignupNavigator>
                    </Box>

                </LoginForm>
            </LoginBox>
        </LoginContainer>
    );
};

export default LoginPage;
