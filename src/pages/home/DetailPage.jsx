import { Box, CssBaseline, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import DetailMap from "./components/DetailMap";
import CLoading from "../../components/Loading/CLoading";

function DetailPage() {
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
            const response = await axios.get('http://localhost:7516/api/detail', {
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

    // useEffect(() => {
    //     console.log(selectedRegion, "selectedRegion");
    // }, [selectedRegion])

    // useEffect(() => {
    //     console.log(mapX, "mapX")
    //     console.log(mapY, "mapY")
    // }, [mapX, mapY])

    useEffect(()=> {
        console.log(isloading)
    }, [isloading])

    return (
        <>
        <Grid sx={{ padding: "60px" }}>
            <Grid sx={{ paddingBottom: "30px" }}>
                <h1>{selectedRegion[0]?.title}</h1>
            </Grid>
            <Grid>
                <Grid container >
                    <Grid xs={6} sx={{ padding: "20px" }}>
                        <img src={selectedRegion[0]?.firstimage} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                    </Grid>
                    <Grid xs={6} sx={{ padding: "20px" }}>
                        <DetailMap 
                            mapX={mapX} 
                            mapY={mapY} 
                            mapLv={mapLv}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ paddingTop: "20px" }}>
                    {selectedRegion[0]?.overview}
                </Box>
                <Box sx={{ paddingTop: "20px", display:"flex", alignItems:"center" }}>
                    <div>
                        <h5>홈페이지 👉</h5>
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: selectedRegion[0]?.homepage }} />
                    </div>
                </Box>
                <CssBaseline />
                <div>

                </div>
            </Grid>
        </Grid>
        </>
    )
}

export default DetailPage;