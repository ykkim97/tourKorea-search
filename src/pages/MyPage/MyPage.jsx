import { Box, Button, Container, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLoginUser from '../../store/Login/useLoginUser';

const MyPage = () => {
    const { userData, setUserData, userToken, setUserToken } = useLoginUser();

    const navigate = useNavigate();
    
    const handleUpdateMyInfo = () => {
        navigate('/mypage/updateMyInfo');
    }

    useEffect(() => {
        console.log(userData, "userData")
    }, [userData])

    const formattedDate = new Date(userData?.userBirthDay).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <MyPageContainer>
            <TitleBox pl={2}>
                <TitleText fontSize={23}><strong>마이페이지</strong></TitleText>
            </TitleBox>
            <IntroBox pl={2}>
                <Typography mb={2}>
                    <strong>김영권님 반갑습니다.</strong>
                    <Button color='success'>일반회원</Button>
                </Typography>
                <Button variant='contained' color='info' onClick={handleUpdateMyInfo}>회원 정보 수정</Button>
            </IntroBox>

            <InfoBox>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>성명</strong></TableCell>
                            <TableCell>{userData?.userName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>이메일</strong></TableCell>
                            <TableCell>{userData?.userEmail}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>생년월일</strong></TableCell>
                            <TableCell>{formattedDate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>닉네임</strong></TableCell>
                            <TableCell>{userData?.userNickname}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>회원등급</strong></TableCell>
                            <TableCell>{userData?.userRole === 0 ? '일반회원' : '관리자'}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </InfoBox>
            
            <MyPostBox>
                <Typography pl={2}>
                    <strong>작성글</strong>
                    <Typography>작성한 글이 없습니다.</Typography>
                </Typography>
            </MyPostBox>
        </MyPageContainer>
    );
};

export default MyPage;

const MyPageContainer = styled(Container)({
    width: '100%',
})

const TitleBox = styled(Box)({
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const IntroBox = styled(Box)({
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const InfoBox = styled(Box)({
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})

const MyPostBox = styled(Box)({
    marginTop : '20px',
    padding : "20px 0 20px 0",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    width: '100%',
    height: '400px',
})

const TitleText = styled(Typography)({
    textAlign: "left",
    color: "black",
})