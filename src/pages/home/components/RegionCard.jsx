import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const RegionCard = ({
    item
}) => {
    const navigate = useNavigate();

    const handleDetailPage = () => {
        navigate(`/detail/${item.contentid}?title=${item.title}&contentId=${item.contentid}&contenttypeid=${item.contenttypeid}&createdtime=${item.createdtime}&modifiedtime=${item.modifiedtime}`)
    }

    return (
        <>
            <Card 
                sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
                onClick={handleDetailPage}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={item.firstimage}
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
                <CardActions sx={{ mt: 'auto' }}>
                    <Button size="small" variant="contained" color="primary">상세보기</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default RegionCard;