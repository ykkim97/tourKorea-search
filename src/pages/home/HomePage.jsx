import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegionCard from "./components/RegionCard";
import axios from "axios";

function HomePage({
    region,
    searchRegion,
    setSearchRegion,
    totalLength,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchTourData = async () => {
            const response = await axios.get('http://localhost:7516/api/search', {
                params: { keyword: region, pageNo: currentPage }
            });
            setSearchRegion(response.data.result);
            setTotalPages(Math.ceil(totalLength / 12));
        };
        fetchTourData();
    }, [totalLength, currentPage]);

    return (
        <>
            {searchRegion && searchRegion.map((item) => (
                <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                    <RegionCard item={item} />
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

export default HomePage;