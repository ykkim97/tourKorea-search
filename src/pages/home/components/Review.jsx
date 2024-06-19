import { CardContent, Typography, CardActions, Box, Button } from "@mui/material";
import Card from '@mui/material/Card';
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useLoginUser from "../../../store/Login/useLoginUser";
import { useNavigate } from "react-router-dom";
import CreateReview from "../../Review/Create/CreateReview";
import StarIcon from "@mui/icons-material/Star";

const rows = [
    { userId : 'qwer9877', title : "괜찮은 여행지", stars: 5, desc: "Very Good!"  },
    { userId : 'ykkim97', title : "가족들이랑 가기 좋은 듯해요", stars: 4, desc: "정말 좋아요!"  },
    { userId : 'uyl139', title : "그저 그래요.", stars: 3, desc: "So So...."  },
    { userId : 'tylllZex', title : "정말 좋아요", stars: 3, desc: "Very Good!...."  },
]

const Review = () => {
    const navigate = useNavigate();
    const { userData } = useLoginUser();
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpenReviewModal(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpenReviewModal(false);
    };

    const handleAddReview = async () => {
        if (!userData) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        } else {
            setOpenReviewModal(true);
            setScroll('paper')
        }
    }

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const params = new URLSearchParams(location.search);
        const contentId = params.get('contentId');

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/reviews/list`, 
                { params : { contentId : contentId }}
            );
            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                alert("Failed to fetch reviews: " + response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while fetching reviews: ", error);
            // alert("An error occurred while fetching reviews.");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            {reviews.length == 0 ? (
                <Typography p={3}>등록된 리뷰가 없습니다.</Typography>
            ) : (
                reviews?.map((review) => (
                    <Card variant="outlined" key={review?._id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <StarIcon sx={{ color : "#f2e60c" }} key={i} />
                                ))}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {review.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {review.nickname}
                            </Typography>
                            <Typography variant="body2">
                                {review.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}

            <Box sx={{ textAlign: "right", pt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddReview}>리뷰 작성하기</Button>
            </Box>

            {openReviewModal === true ? (
                <CreateReview 
                    openReviewModal={openReviewModal} 
                    setOpenReviewModal={setOpenReviewModal} 
                    scroll={scroll} 
                    setScroll={setScroll} 
                    handleClickOpen={handleClickOpen}  
                    handleClose={handleClose} 
                    fetchReviews={fetchReviews}
                />
            ) : null}
        </Box>
    )
}

export default Review;