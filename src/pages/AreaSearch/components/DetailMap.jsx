import React, { useEffect } from "react";

const { kakao } = window;

const DetailMap = ({
    mapX,
    mapY,
    mapLv,
}) => {

    useEffect(() => {
        const container = document.getElementById('map');
        const markerPosition = new kakao.maps.LatLng(mapY, mapX)
        const options = {
            center : markerPosition,
            level : mapLv
        };
        const map = new kakao.maps.Map(container, options);

        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        marker.setMap(map);
    }, [mapX, mapY])
    
    return (
        <div id="map" style={{
            width: "100%", height: "100%", objectFit: "cover"
        }}>
        </div>
    )
}

export default DetailMap;
