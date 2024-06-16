import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import noImage from '@/assets/no_Image.png';

const CardSection = styled(Card)`
    max-width: 345px;
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    box-shadow: 2px 15px 40px -10px grey;
    border-radius: 20px;
`;

const AccommodationCard = ({
    item
}) => {
    const navigate = useNavigate();

    const handleDetailPage = () => {
        navigate(`/accommodation/detail/${item.contentid}?title=${item.title}&contentId=${item.contentid}&contenttypeid=${item.contenttypeid}&createdtime=${item.createdtime}&modifiedtime=${item.modifiedtime}`)
    }

    // 이미지가 없을 때
    const imageUrl = item.firstimage && item.firstimage.trim() !== "" ? item.firstimage : noImage;

    return (
        <>
            <CardSection 
                onClick={handleDetailPage}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={imageUrl}
                    title="green iguana"
                    loading="lazy"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.addr1} {item.addr2}
                    </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto', display: "flex", justifyContent: "flex-end" }}>
                    <Button size="small" variant="contained" color="primary">상세보기</Button>
                </CardActions>
            </CardSection>
        </>
    )
}

export default AccommodationCard;