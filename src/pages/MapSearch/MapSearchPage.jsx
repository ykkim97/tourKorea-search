import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import noImage from '@/assets/no_Image.png';
import LocationDetailModal from "./components/LocationDetailModal";

const MapSearchPage = () => {
    const [mapX, setMapX] = useState(0);
    const [mapY, setMapY] = useState(0);
    const [searchList, setSearchList] = useState([]);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null); // selected location info
    const [modalOpen, setModalOpen] = useState(false); // modal open state

    const fetchlocationBasedList = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/locationBasedSearch?mapY=${mapX}&mapX=${mapY}`);
        setSearchList(response.data);
    }

    useEffect(() => {
        const container = document.getElementById('map');
        const markerPosition = new kakao.maps.LatLng(37.57861, 126.97722);
        const options = {
            center: markerPosition,
            level: 5
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
        
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(mapInstance);

        kakao.maps.event.addListener(mapInstance, 'click', async function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            setMapX(latlng.getLng());
            setMapY(latlng.getLat());

            fetchlocationBasedList();

            marker.setPosition(latlng);
        });
    }, []);

    useEffect(() => {
        fetchlocationBasedList();
    }, [mapX, mapY]);

    useEffect(() => {
        if (!map) return;

        // Remove existing markers
        markers.forEach(marker => marker.setMap(null));

        // 마커 이미지 설정
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        var imageSize = new kakao.maps.Size(36, 43);
        var imageOption = {offset: new kakao.maps.Point(27, 69)};
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

        // Add new markers
        const newMarkers = searchList?.result?.map(location => {
            const markerPosition2 = new kakao.maps.LatLng(location.mapy, location.mapx);

            const marker2 = new kakao.maps.Marker({
                position: markerPosition2,
                image: markerImage,
                text: location?.title || '-'
            });
            marker2.setMap(map);

            // 마커에 클릭 이벤트 
            kakao.maps.event.addListener(marker2, 'click', function () {
                setSelectedLocation(location); // 선택된 위치 설정
                setModalOpen(true); // 모달 열기
            });

            return marker2;
        });

        // Update the markers state
        setMarkers(newMarkers || []);

        // TODO: searchList
        console.log(searchList, "searchList")
    }, [searchList, map]);

    const handleCloseModal = () => {
        setModalOpen(false); // 모달 닫기
    };

    return (
        <MapSearchContainer>
            <div id="map" style={{
                width: "100%", height: "100%", objectFit: "cover",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}>
            </div>
            
            {/* detail modal */}
            <LocationDetailModal 
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal}
                selectedLocation={selectedLocation}
            />
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

const CardSection = styled(Card)`
    max-width: 345px;
    display: flex;
    flex-direction: column;
    height: 100%;
    // cursor: pointer;
    box-shadow: 2px 15px 40px -10px grey;
    border-radius: 20px;
`;