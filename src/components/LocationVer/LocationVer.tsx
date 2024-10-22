import { useState } from "react";
import styles from "./LocationVer.module.scss";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Loading from "../Loading/Loading";
import { isAxiosError } from "../../utils/isAxiosError";
import Alert from "../Alert/Alert";
import { useSessionStorageBase64 } from "../../hooks/useSessionStorage";

const LocationVer = () => {
    const [storedValue] = useSessionStorageBase64('rpTkn', '');
    const [isActive, setIsActive] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);


    const [selectedDevice, setSelectedDevice] = useState("networkAccessIdentifier");
    const [deviceValue, setDeviceValue] = useState("");
    const [radius, setRadius] = useState<number | undefined>(undefined);
    const [maxAge, setMaxAge] = useState<number | undefined>(60);
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [latitude, setLatitude] = useState<number | undefined>(undefined);

    const openModal = () => {
        console.log("Model open is active")
        setIsActive(true)
        setData("")
        setError("")
    }

    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSelectedDevice(e.target.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceValue(e.target.value);
    };
    const handleMaxAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setMaxAge(isNaN(value) ? undefined : value);
    };
    const handleRadiusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setRadius(isNaN(value) ? undefined : value);
    };
    const handleLongitudeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setLongitude(isNaN(value) ? undefined : value);
    };
    const handleLatitudeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setLatitude(isNaN(value) ? undefined : value);
    };


    const options = {
        method: 'POST',
        url: import.meta.env.VITE_LOC_VER_URL,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': storedValue,
            'X-RapidAPI-Host': import.meta.env.VITE_LOC_VER_HOST
        },
        data: {
            device: {
                ...(selectedDevice === "phoneNumber"
                    ? { phoneNumber: deviceValue }
                    : { networkAccessIdentifier: deviceValue }
                )
            },
            area: {
                center: {
                    latitude: latitude,
                    longitude: longitude
                },
                radius: radius
            },
            maxAge: maxAge
        }
    }

    const verifyLocationHandler = async () => {
        setIsActive(false)
        if (maxAge && maxAge < 60) {
            return setError('Max age should be at least 60.');
        }


        if (deviceValue.trim() === '') {
            return setError('Network access identifier can not be empty.');
        }
        try {
            console.log({ selectedDevice, deviceValue, maxAge, radius, longitude, latitude })
            setLoading(true)

            const response = await axios.request(options);

            // Handle successful location retrieve
            console.log('Location retrieve', response.data);
            setData(response.data)

        } catch (error) {
            console.log(error)
            if (isAxiosError(error)) {
                let errorMessage: string;

                if (error.response && error.response.data) {
                    if (error.response.data.detail) {
                        // Case 1: error.response.data.detail is present
                        const errorDetails = error.response.data.detail;

                        if (Array.isArray(errorDetails) && errorDetails.length > 0 && 'msg' in errorDetails[0]) {
                            errorMessage = errorDetails.map((errorItem) => errorItem.msg).join(', ');
                        } else {
                            errorMessage = 'An unexpected error occurred.';
                        }
                    } else if (error.response.data.message) {
                        // Case 2: error.response.data.message is present
                        errorMessage = error.response.data.message;
                    } else {
                        errorMessage = 'An unexpected error occurred.';
                    }
                } else {
                    errorMessage = 'An unexpected error occurred.';
                }

                setError(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Location verification</h1>
            {
                !isActive && <div className={styles.btnContainer}>
                    <button onClick={openModal} className={`${styles.btn} ${styles['btn-masterful']}`} disabled={loading || isActive}>
                        <FaLocationDot className={styles.icon} />
                        <span className={styles.btnTxt}>Verify location</span>
                    </button>
                </div>
            }




            {isActive && <div className={styles.locationVerify}>
                <div className={styles.verifyBody}>
                    <div className={styles.inputRow}>
                        <label htmlFor="categorySelect" className={styles.categoryLabel}>
                            Select a device:
                        </label>
                        <select id="categorySelect" className={styles.categorySelect} value={selectedDevice} onChange={handleDeviceChange}>
                            <option value="networkAccessIdentifier">Network Access Identifier</option>
                            <option value="phoneNumber">Phone Number</option>
                        </select>
                    </div>

                    <div className={styles.inputRow}>
                        {
                            selectedDevice == "phoneNumber" ?
                                <>
                                    <label htmlFor="phoneNumber" className={styles.networkAccessIdentifierLabel}>
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        className={styles.networkAccessIdentifier}
                                        onChange={handleInputChange}
                                        value={deviceValue}
                                        placeholder="+3671234567"
                                    /></>
                                :
                                <>
                                    <label htmlFor="networkAccessIdentifier" className={styles.networkAccessIdentifierLabel}>
                                        Network Access Identifier
                                    </label>
                                    <input
                                        type="eamil"
                                        id="networkAccessIdentifier"
                                        className={styles.networkAccessIdentifier}
                                        onChange={handleInputChange}
                                        value={deviceValue}
                                        placeholder="device@testcsp.net"
                                    />
                                </>

                        }

                    </div>
                    <div className={styles.inputRow}>
                        <label htmlFor="latitude" className={styles.latitudeLabel}>
                            Latitude
                        </label>
                        <input
                            type="number"
                            id="latitude"
                            className={styles.latitudeInput}
                            onChange={handleLatitudeInputChange}
                            value={latitude}
                            placeholder="0.0"
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <label htmlFor="longitude" className={styles.longitudeLabel}>
                            Longitude
                        </label>
                        <input
                            type="number"
                            id="longitude"
                            className={styles.longitudeInput}
                            onChange={handleLongitudeInputChange}
                            value={longitude}
                            placeholder="0.0"
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <label htmlFor="radius" className={styles.radiusLabel}>
                            Radius
                        </label>
                        <input
                            type="number"
                            id="radius"
                            className={styles.radius}
                            onChange={handleRadiusInputChange}
                            value={radius}
                            placeholder="10000"
                            min={0}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <label htmlFor="maxAge" className={styles.maxAgeLabel}>
                            Max age
                        </label>
                        <input
                            type="number"
                            id="maxAge"
                            className={styles.maxAgeInput}
                            onChange={handleMaxAgeInputChange}
                            value={maxAge}
                            placeholder="60"
                            min={60}
                        />
                    </div>
                </div>
                <div className={styles.retrieveFooter}>
                    <button
                        className={`${styles.btn} ${styles.btnRetrieve}`}
                        onClick={verifyLocationHandler}
                    >
                        Verify
                    </button>
                    <button
                        className={`${styles.btn} ${styles.btnCancel}`}
                        onClick={() => setIsActive(false)}
                    >
                        Cancel
                    </button>
                </div>

            </div>}

            {loading &&

                <div className={styles.centerDiv}>
                    <Loading message="Verifiying...." />
                </div>
            }

            {error && <Alert
                type="error"
                title="Error happened during retrieving location"
                body={error}
                onClose={() => setError("")}
            />}

            {data && <Alert
                type="info"
                title="Location verified successfully"
                body={`Verification result is ${data.verificationResult}`}
                onClose={() => setData("")}
            />}




        </div>
    )
}

export default LocationVer