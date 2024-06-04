import axios from "axios";
import React, { useEffect, useState } from "react";
import FestivalCard from "./components/FestivalCard";
import { Grid, Pagination } from "@mui/material";

const Festival = ({
    totalLength,
    region
}) => {
    const [festivalData, setFestivalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fetchFestival = async () => {
            const response = await axios.get('http://localhost:7516/api/festival', {
                params : { startDate : '20170901', pageNo: currentPage }
            });
            setFestivalData(response.data.result);
            setTotalPages(Math.ceil(totalLength / 12));
        }
        fetchFestival();
    }, [totalLength, currentPage])

    return (
        <>
            {festivalData && festivalData.map((item) => (
                <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                    <FestivalCard item={item} />
                </Grid>
            ))}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="success"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </>
    )
}

export default Festival;