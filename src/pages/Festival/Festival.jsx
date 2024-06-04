import axios from "axios";
import React, { useEffect, useState } from "react";
import FestivalCard from "./components/FestivalCard";
import { Grid } from "@mui/material";

const Festival = () => {
    const [festivalData, setFestivalData] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fetchFestival = async () => {
            const response = await axios.get('http://localhost:7516/api/festival', {
                params : { startDate : '20170901' }
            });
            setFestivalData(response.data);
            
        }
        // setIsLoading(true);
        fetchFestival();
        // setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(festivalData, "festivalData")
    }, [festivalData])

    return (
        <>
            {festivalData && festivalData.map((item) => (
                <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                    <FestivalCard item={item} />
                </Grid>
            ))}
        </>
    )
}

export default Festival;