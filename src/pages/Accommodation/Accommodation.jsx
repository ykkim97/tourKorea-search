import React, { useEffect, useState } from "react";
import useAccommodation from "../../store/accommodation/useAccommodation";
import AccommodationCard from "./components/AccommodationCard";
import { Grid, Pagination } from "@mui/material";
import axios from "axios";

const Accommodation = ({
    totalLength
}) => {
    const { accommodationData, setAccommodationData } = useAccommodation();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fetchAccommodation = async () => {
            const response = await axios.get('http://localhost:7516/api/accommodation', {
                params : { pageNo: currentPage }
            });
            setAccommodationData(response.data.result);
            setTotalPages(Math.ceil(totalLength / 12));
        }
        fetchAccommodation();
    }, [totalLength, currentPage])

    return (
        <>
            {accommodationData && accommodationData.map((item) => (
                <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                    <AccommodationCard item={item} />
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

export default Accommodation;