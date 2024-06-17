import { Box, CssBaseline, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DetailMap from "../../home/components/DetailMap";
import MiddleTabs from "./MiddleTabs";
import noImage from '@/assets/no_Image.png';

const AccommodationDetailPage = () => {
    const location = useLocation();
    const [isloading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [mapX, setMapX] = useState(0);
    const [mapY, setMapY] = useState(0);
    const [mapLv, setMapLv] = useState(6);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const startdate = params.get('eventstartdate');
        const enddate = params.get('eventenddate');
        setStartDate(startdate)
        setEndDate(enddate)
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const contentId = params.get('contentId');
        const contenttypeId = params.get('contenttypeid');
        const fetchDetail = async () => {
            const response = await axios.get('http://localhost:7516/api/accommodation/detail', {
                params : { contentid : contentId, contenttypeid: contenttypeId }
            });
            setSelectedRegion(response.data);
        }
        setIsLoading(true);
        fetchDetail();
        setIsLoading(false);
    }, [])

    useEffect(() => {
        setMapX(Number(selectedRegion[0]?.mapx));
        setMapY(Number(selectedRegion[0]?.mapy));
        setMapLv(Number(selectedRegion[0]?.mlevel));
    }, [selectedRegion])

    return (
        <>
            
                <Grid sx={{ padding: "60px" }}>
                    <Grid sx={{ paddingBottom: "30px" }}>
                        <h1>{selectedRegion[0]?.title}</h1>
                    </Grid>
                    <Grid>
                        <Grid container >
                            <Grid xs={6} sx={{ padding: "20px" }}>
                                <img src={selectedRegion[0]?.firstimage ? selectedRegion[0]?.firstimage : noImage} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                            </Grid>
                            <Grid xs={6} sx={{ padding: "20px" }}>
                                <DetailMap 
                                    mapX={mapX} 
                                    mapY={mapY} 
                                    mapLv={mapLv}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ padding: "20px" }}>
                            {selectedRegion[0]?.overview}
                        </Box>
                        
                        <Box sx={{ padding : '20px', width: "100%" }}>
                            <MiddleTabs selectedRegion={selectedRegion} />
                        </Box>
                    </Grid>
                </Grid>
        </>
    )
}

export default AccommodationDetailPage;