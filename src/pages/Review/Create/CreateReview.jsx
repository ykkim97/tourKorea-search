import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import useLoginUser from '../../../store/Login/useLoginUser';
import { toast } from 'react-toastify';

const CreateReview = ({ 
    openReviewModal, 
    setOpenReviewModal, 
    scroll,
    setScroll,
    handleClickOpen, 
    handleClose,
    fetchReviews,
}) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [locationId, setLocationId] = useState("");
    const [nickname, setNickname] = useState("");
    const [userId, setUserId] = useState("");
    const [rating, setRating] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [locationTitle, setLocationTitle] = useState('');

    const { userData } = useLoginUser();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const contentId = params.get('contentId');
        const contentTitle = params.get('title');
        setLocationId(contentId);
        setLocationTitle(contentTitle);
        setUserId(userData.userId)
        setNickname(userData.userNickname);
    }, [])

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (openReviewModal) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openReviewModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const reviewData = {
            locationId,
            userId,
            nickname,
            rating,
            title,
            description,
            images,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/reviews/create`, reviewData);
            if (response.data.success) {
                toast("리뷰가 작성되었습니다!");
                handleClose();
                fetchReviews();
                // form data reset
                setLocationId("");
                setNickname("");
                setRating(1);
                setTitle("");
                setDescription("");
                setImages([]);
            } else {
                toast("[리뷰 쓰기 실패] : " + response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while submitting the review: ", error);
            toast("[데이터 전송 실패]");
        } finally {
            setLoading(false);
        }
    }

    const handleImageChange = (e) => {
        setImages([...images, ...e.target.files]);
    };

    return (
        <React.Fragment>
            <Dialog
                open={openReviewModal}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">리뷰 작성</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <StyledForm onSubmit={handleSubmit}>
                                    <StyledRating
                                        name="rating"
                                        value={rating}
                                        onChange={(e, newValue) => setRating(newValue)}
                                        precision={1}
                                        max={5}
                                        size="large"
                                        required
                                    />
                                    <input
                                        type='hidden'
                                        name='locationId'
                                        value={locationId}
                                        fullWidth
                                        required
                                    />
                                    <input
                                        type='hidden'
                                        name='nickname'
                                        value={nickname}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="제목"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="내용"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        fullWidth
                                        required
                                        multiline
                                        rows={10}
                                    />
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ marginTop: '20px' }}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>취소</Button>
                                        <Button type="submit">작성</Button>
                                    </DialogActions>
                                </StyledForm>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default CreateReview;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledRating = styled(Rating)`
    margin-top: 16px;
`;