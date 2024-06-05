import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegionCard from "./components/RegionCard";
import axios from "axios";
import useSearch from "../../store/search/useSearch";
import useAreaSearch from "../../store/areaSearch/ussAreaSearch";

function AreaSearch({
    totalLength,
}) {
    const { searchRegion, setSearchRegion, region, setRegion } = useSearch();
    const { areaValue, setAreaValue, searchAreaBasedData, setSearchAreaBasedData } = useAreaSearch();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchTourData = async () => {
            const response = await axios.get('http://localhost:7516/api/areaBasedSearch', {
                params: { areaCode: areaValue, pageNo: currentPage }
            });
            setSearchRegion(response.data.result);
            setTotalPages(Math.ceil(totalLength / 12));
        };
        fetchTourData();
    }, [totalLength, currentPage]);
    
    return (
        <>
            {searchAreaBasedData && searchAreaBasedData.map((item) => (
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

export default AreaSearch;