import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from "./MapLocation.module.scss";


interface MapProps {
    latitude: number;
    longitude: number;
}

const MapLocation: React.FC<MapProps> = ({ latitude, longitude }) => {
    const [position, setPosition] = useState<[number, number]>([latitude, longitude]);

    useEffect(() => {
        setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    return (
        <div className={styles.locationOfDevice}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {latitude}  <br />  {longitude}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapLocation;
