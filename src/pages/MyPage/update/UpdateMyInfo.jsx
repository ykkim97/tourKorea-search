import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginUser from '../../../store/Login/useLoginUser';
import axios from "axios";

const UpdateMyInfo = () => {
    const { userData, setUserData } = useLoginUser();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState(userData?.userNickname || '');
    const [email, setEmail] = useState(userData?.userEmail || '');
    const [birthday, setBirthday] = useState(userData?.userBirthDay || '');

    const handleSave = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/update`, {
                userId: userData.userId,
                nickname: nickname,
                email: email,
                birthdate: birthday,
            })

            if (response.data.success) {
                setUserData({
                    ...userData,
                    nickname: nickname,
                    email: email,
                    birthday: birthday,
                });
                navigate('/mypage');
            } else {
                console.error("Update failed: ", response.data.message);
            }
        } catch(error) {
            console.error("An error occurred while updating the user data: ", error);
        }
    };

    useEffect(() => {
        console.log("userData => ", userData)
    }, [userData])

    return (
        <MyPageContainer>
            <TitleBox>
                <TitleText fontSize={23}><strong>회원 정보 수정</strong></TitleText>
            </TitleBox>
            <IntroBox>
                <Typography mb={2} sx={{ display:"flex", alignItems: "center" }}>
                    <strong style={{ paddingLeft: '20px' }}>김영권님 반갑습니다.</strong>
                    <Button color='success'>일반회원</Button>
                </Typography>
                <Button variant='contained' color='info' onClick={handleSave} sx={{ marginLeft: '20px'}}>저장</Button>
            </IntroBox>

            <InfoBox>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>성명</strong></TableCell>
                            <TableCell>
                                <TableCell>{userData?.userName}</TableCell>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>이메일</strong></TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>생년월일</strong></TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>닉네임</strong></TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>회원등급</strong></TableCell>
                            <TableCell>{userData?.userRole === 0 ? '일반회원' : '관리자'}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </InfoBox>
        </MyPageContainer>
    );
};

export default UpdateMyInfo;

const MyPageContainer = styled(Container)({
    fontFamily:'Pretendard-Regular',
    width: '100%',
})

const TitleBox = styled(Box)({
    paddingLeft: '20px',
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const IntroBox = styled(Box)({
    paddingLeft: '20px',
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const InfoBox = styled(Box)({
    paddingLeft: '20px',
    marginTop : '20px',
    padding : "20px 0 43px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const TitleText = styled(Typography)({
    paddingLeft: '20px',
    textAlign: "left",
    color: "black",
})
