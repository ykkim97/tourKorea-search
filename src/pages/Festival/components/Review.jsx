import { CardContent, Typography, CardActions, Box, Button } from "@mui/material";
import Card from '@mui/material/Card';
import React from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../../store/Login/useLoginUser";

const rows = [
    { userId : 'qwer9877', title : "괜찮은 여행지", stars: 5, desc: "Very Good!"  },
    { userId : 'ykkim97', title : "가족들이랑 가기 좋은 듯해요", stars: 4, desc: "정말 좋아요!"  },
    { userId : 'uyl139', title : "그저 그래요.", stars: 3, desc: "So So...."  },
    { userId : 'tylllZex', title : "정말 좋아요", stars: 3, desc: "Very Good!...."  },

]

const Review = () => {
    const { userData } = useLoginUser();
    const navigate = useNavigate();

    const handleAddReview = async () => {
        if (!userData) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        } else {
            navigate('/review');
        }
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            {rows?.map((row) => (
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            ⭐⭐⭐⭐
                        </Typography>
                        <Typography variant="h6" component="div">
                            {row.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {row.userId}
                        </Typography>
                        <Typography variant="body2">
                            {row.desc}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            <Box sx={{ textAlign: "right", pt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddReview}>리뷰 작성하기</Button>
            </Box>
        </Box>
    )
}

export default Review;