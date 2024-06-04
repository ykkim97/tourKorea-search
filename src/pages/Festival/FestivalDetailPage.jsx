import { Box, CssBaseline, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DetailMap from "../home/components/DetailMap";
import axios from "axios";
import CLoading from "../../components/Loading/CLoading";
import useSearch from "../../store/search/useSearch";

const FestivalDetailPage = () => {
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
            const response = await axios.get('http://localhost:7516/api/festival/detail', {
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
            {isloading ? (
                <CLoading loading={isloading}/>
            ) : (
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

                        <hr style={{ marginTop : "20px" }}/>

                        <Box sx={{ paddingTop: "20px" }}>
                            {selectedRegion[0]?.overview}
                        </Box>

                        <hr style={{ marginTop : "20px", marginBottom:"20px" }}/>

                        <Box>
                            <div style={{ display : "flex", alignItems: "center" }}>
                                <h5>홈페이지 | </h5> 
                                <h5 dangerouslySetInnerHTML={{ __html: selectedRegion[0]?.homepage }} />
                            </div>
                            <h5>주소 | {selectedRegion[0]?.addr1} {selectedRegion[0]?.addr2}</h5>
                            <h5>행사시작일 | {startDate.slice(0,4)}년 {startDate.slice(4,6)}월 {startDate.slice(6,8)}일</h5>
                            <h5>행사종료일 | {endDate.slice(0,4)}년 {endDate.slice(4,6)}월 {endDate.slice(6,8)}일</h5>
                            <h5>{selectedRegion[0]?.telname} | {selectedRegion[0]?.tel}</h5>
                        </Box>
                        
                        <CssBaseline />
                        <div>

                        </div>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default FestivalDetailPage;