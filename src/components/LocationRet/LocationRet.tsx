import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./LocationRet.module.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import MapLocation from "../MapLocation/MapLocation";
import axios from "axios";
import Loading from "../Loading/Loading";
import { isAxiosError } from "../../utils/isAxiosError";
import Alert from "../Alert/Alert";
import { useSessionStorageBase64 } from "../../hooks/useSessionStorage";

const LocationRet = () => {
    const [storedValue] = useSessionStorageBase64('rpTkn', '');
    const [isActive, setIsActive] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);



    const openModal = () => {
        console.log("Model open is active")
        setIsActive(true)
        setError("")
    }

    const [selectedDevice, setSelectedDevice] = useState("networkAccessIdentifier");
    const [deviceValue, setDeviceValue] = useState("");
    const [maxAge, setMaxAge] = useState<number | undefined>(60);


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



    const options = {
        method: 'POST',
        url: import.meta.env.VITE_LOC_RET_URL,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': storedValue,
            'X-RapidAPI-Host': import.meta.env.VITE_LOC_RET_HOST
        },
        data: {
            device: {
                ...(selectedDevice === "phoneNumber"
                    ? { phoneNumber: deviceValue }
                    : { networkAccessIdentifier: deviceValue }
                )
            },
            maxAge: maxAge
        }
    }

    const retrieveLocationHandler = async () => {
        setIsActive(false)

        // if (!isValidEmail(deviceValue.trim())) {
        //     return setError('Invalid network access identifier format.');
        // }
        if (deviceValue.trim() === '') {
            return setError('Network access identifier can not be empty.');
        }
        try {
            console.log({ selectedDevice, deviceValue, maxAge })
            setLoading(true)

            const response = await axios.request(options);

            // Handle successful location retrieve
            console.log('Location retrieve', response.data);
            setData(response.data)

        } catch (error) {
            console.log("Caught error:", error);

            if (isAxiosError(error)) {
                let errorMessage: string;

                if (error.response && error.response.data) {
                    if (error.response.data.detail) {
                        const errorDetail = error.response.data.detail;

                        // Handle if `detail` is an array of objects with a `msg` property
                        if (Array.isArray(errorDetail)) {
                            if (errorDetail.length > 0 && 'msg' in errorDetail[0]) {
                                errorMessage = errorDetail.map((errorItem) => errorItem.msg).join(', ');
                            } else {
                                errorMessage = 'An unexpected error occurred.';
                            }
                        }
                        // Handle if `detail` is a string
                        else if (typeof errorDetail === 'string') {
                            errorMessage = errorDetail;
                        }
                        // Default case if `detail` is an unexpected structure
                        else {
                            errorMessage = 'An unexpected error occurred.';
                        }
                    }
                    // If `detail` is not present but `message` is
                    else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                    // Default case for other unknown error structures
                    else {
                        errorMessage = 'An unexpected error occurred.';
                    }
                } else {
                    errorMessage = 'An unexpected error occurred.';
                }

                setError(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,);
            } else {
                console.log("Error went to else block, not Axios error:", error);
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }


    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Location retrieval</h1>
            <div className={styles.btnContainer}>
                <button onClick={openModal} className={`${styles.btn} ${styles['btn-masterful']}`} disabled={loading}>
                    <FaLocationDot className={styles.icon} />
                    <span className={styles.btnTxt}>Retrieve location</span>
                </button>
            </div>


            {loading && <div className={styles.centerDiv}>
                <Loading message="Retrieving...." />
            </div>
            }

            {error && <Alert
                type="error"
                title="Error happened during retrieving location"
                body={error} onClose={() => setError("")}
            />}

            {data && <MapLocation
                latitude={data.area.center?.latitude}
                longitude={data.area.center?.longitude}
            // address={data.civicAddress} 
            />
            }


            <Modal show={isActive} onClose={() => setIsActive(false)}>
                <div className={styles.content}>
                    <div className={styles.modalHeader}>
                        <h2>Retrieve location</h2>
                        <FaTimes
                            className={`${styles.icon} ${styles.iconClose}`}
                            onClick={() => setIsActive(false)}
                        />
                    </div>
                    <div className={styles.modalBody}>
                        <label htmlFor="categorySelect" className={styles.categoryLabel}>
                            Select a device
                        </label>
                        <select id="categorySelect" className={styles.categorySelect} value={selectedDevice} onChange={handleDeviceChange}>
                            <option value="networkAccessIdentifier">Network Access Identifier</option>
                            <option value="phoneNumber">Phone Number</option>
                        </select>

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
                    <div className={styles.modalFooter}>
                        <button
                            className={`${styles.btn} ${styles.btnRetrieve}`}
                            onClick={retrieveLocationHandler}
                        >
                            Retrieve
                        </button>
                        <button
                            className={`${styles.btn} ${styles.btnCancel}`}
                            onClick={() => setIsActive(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default LocationRet