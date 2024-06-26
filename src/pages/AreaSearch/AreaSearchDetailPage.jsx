import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import DetailMap from "./components/DetailMap";
import CLoading from "../../components/Loading/CLoading";
import useSearch from "../../store/search/useSearch";
import useAreaSearch from "../../store/areaSearch/ussAreaSearch";
import MiddleTabs from "./components/MiddleTabs";
import noImage from '@/assets/no_Image.png';

function AreaSearchDetailPage() {
    const { searchAreaBasedData,setSearchAreaBasedData, areaValue, setAreaValue } = useAreaSearch();
    const location = useLocation();
    const [isloading, setIsLoading] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [mapX, setMapX] = useState(0);
    const [mapY, setMapY] = useState(0);
    const [mapLv, setMapLv] = useState(6);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const contentId = params.get('contentId');
        const contenttypeId = params.get('contenttypeid');
        const fetchDetail = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/areaBasedSearch/detail`, {
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
                    <Typography>{selectedRegion[0]?.overview}</Typography>
                </Box>

                <Box sx={{ padding : '20px', width: "100%" }}>
                    <MiddleTabs selectedRegion={selectedRegion} />
                </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default AreaSearchDetailPage;