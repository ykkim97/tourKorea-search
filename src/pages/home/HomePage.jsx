import { Box, Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegionCard from "./components/RegionCard";
import axios from "axios";
import useSearch from "../../store/search/useSearch";
import styled from "styled-components";

function HomePage({
    totalLength,
}) {
    const { searchRegion,setSearchRegion, region, setRegion } = useSearch();

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
            {/* <MyPageContainer>필터</MyPageContainer> */}
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
                sx={{ mt: 2, margin:'auto', padding: "30px" }}
            />
        </>
    )
}

export default HomePage;

// const MyPageContainer = styled(Container)({
//     paddingLeft: '20px',
//     marginTop : '20px',
//     padding : "20px 0 20px 0",
//     boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
// })