import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from "./MapLocation.module.scss";


type Address = {
    A1: string
    A2: string
    country: string

}
interface MapProps {
    latitude: number;
    longitude: number;
    address: Address
}

const MapLocation: React.FC<MapProps> = ({ latitude, longitude, address }) => {
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
                        {address.country}, {address.A1} <br /> {address.A2}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapLocation;
