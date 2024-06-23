import { Button, Card, CardActions, CardContent, CardMedia, Container, Modal, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import noImage from '@/assets/no_Image.png';
import styled from "styled-components";
import axios from "axios";
import Review from "./Review";
import StarIcon from "@mui/icons-material/Star";

const LocationDetailModal = ({
    modalOpen,
    handleCloseModal,
    selectedLocation,
}) => {
    const imageUrl =selectedLocation?.firstimage && selectedLocation?.firstimage.trim() !== "" ? selectedLocation?.firstimage : noImage;
    const [reviews, setReviews] = useState([]);

    const handleNavigate = (
        title,
        contentid,
        contenttypeid,
        createdtime,
        modifiedtime
    ) => {
        // Detail Page redirect
        const url = `/detail/${contentid}?title=${title}&contentId=${contentid}&contenttypeid=${contenttypeid}&createdtime=${createdtime}&modifiedtime=${modifiedtime}`;
        window.open(url, '_blank');
    };
    
    const fetchReviews = async (contentid) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/reviews/list`, 
                { params : { contentId : contentid }}
            );

            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                alert("Failed to fetch reviews: " + response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while fetching reviews: ", error);
        }
    };

    useEffect(() => {
        if (selectedLocation?.contentid) {
            fetchReviews(selectedLocation.contentid);
        }
    }, [selectedLocation]);

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CardSection>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={imageUrl}
                        title={selectedLocation?.title}
                        loading="lazy"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <CardTitle 
                            gutterBottom 
                            variant="h6" 
                            component="div" 
                            onClick={
                                () => handleNavigate(
                                    selectedLocation?.title,
                                    selectedLocation?.contentid,
                                    selectedLocation?.contenttypeid,
                                    selectedLocation?.createdtime,
                                    selectedLocation?.modifiedtime,
                                )
                            }
                        >
                            {selectedLocation?.title}
                        </CardTitle>
                        <Typography variant="body2" color="text.secondary">
                            {selectedLocation?.addr1} {selectedLocation?.addr2}
                        </Typography>
                    </CardContent>

                    <ReviewContainer>
                        <ReviewTitleText>리뷰</ReviewTitleText>
                        {reviews.length == 0 ? (
                            <Typography sx={{ fontSize: 14 }} >등록된 리뷰가 없어요! 😮</Typography>
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
                    </ReviewContainer>

                    <ReviewCardActions>
                        <Button 
                            size="small" 
                            variant="contained" 
                            color="primary" 
                            onClick={handleCloseModal}
                        >
                            닫기
                        </Button>
                    </ReviewCardActions>
                </CardSection>
            </Modal>
        </>
    )
}
export default LocationDetailModal;

const CardSection = styled(Card)`
    max-width: 345px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 2px 15px 40px -10px grey;
    border-radius: 20px;
`;

const CardTitle = styled(Typography)`
    cursor : pointer;
    &:hover {
        font-weight: bold;
    }
`

const ReviewTitleText = styled(Typography)`
    padding-top: 10px;
    padding-bottom: 10px;
`

const ReviewContainer = styled(Container)`
    max-height: 650px;
    overflow-y: auto;
    margin-top: 16px;
    margin-bottom: 16px;
`

const ReviewCardActions = styled(CardActions)`
    margin-top: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
`