import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const MapSearchPage = () => {
    const [mapX, setMapX] = useState(0);
    const [mapY, setMapY] = useState(0);
    const [searchList, setSearchList] = useState([]);

    const fetchlocationBasedList = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/locationBasedSearch?mapY=${mapX}&mapX=${mapY}`);
        setSearchList(response.data);
        
    }

    useEffect(() => {
        const container = document.getElementById('map');
        const markerPosition = new kakao.maps.LatLng(37.57861, 126.97722)
        const options = {
            center : markerPosition,
            level : 5
        };
        const map = new kakao.maps.Map(container, options);

        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', async function (mouseEvent) {
            var latlng = mouseEvent.latLng;
            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            setMapX(latlng.getLng());
            setMapY(latlng.getLat());
            fetchlocationBasedList();
            marker.setPosition(latlng);
            
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = message;
        });
    }, [])

    useEffect(() => {
        console.log(mapX, mapY)
    }, [mapX, mapY])

    useEffect(() => {
        console.log(searchList, "거리반경장소 목록")
    }, [searchList])

    return (
        <MapSearchContainer>
            <div id="map" style={{
                width: "100%", height: "100%", objectFit: "cover",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}>
            </div>
            <div id="result" style={{ padding: "10px", marginTop: "10px", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: "#fff" }}>
                클릭한 위치의 정보가 여기에 표시됩니다.
            </div>
        </MapSearchContainer>
    )
}

export default MapSearchPage;

const MapSearchContainer = styled(Container)({
    width: "100%",
    height: "70dvh",
    padding: "10px",
    marginTop: "40px"
})