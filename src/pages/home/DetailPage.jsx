import { Box, CssBaseline, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

function DetailPage() {
    const location = useLocation();
    console.log(location.search)

    const [selectedRegion, setSelectedRegion] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const contentId = params.get('contentId');
        const contenttypeId = params.get('contenttypeid');
        const fetchDetail = async () => {
            const response = await axios.get('http://localhost:7516/api/detail', {
                params : { contentid : contentId, contenttypeid: contenttypeId }
            });
            setSelectedRegion(response.data);
        }
        fetchDetail();
    }, [])

    useEffect(() => {
        console.log(selectedRegion, "selectedRegion");
    }, [selectedRegion])

    return (
        <Grid sx={{ padding: "60px" }}>
            <Grid sx={{ paddingBottom: "30px" }}>
                <h1>{selectedRegion[0]?.title}</h1>
            </Grid>
            <Grid>
                <img src={selectedRegion[0]?.firstimage} />
                <Box sx={{ paddingTop: "30px" }}>
                    {selectedRegion[0]?.overview}
                </Box>
                <CssBaseline />
                <div>
                    {/* {selectedRegion[0]?.homepage} */}
                </div>
            </Grid>
        </Grid>
    )
}

export default DetailPage;