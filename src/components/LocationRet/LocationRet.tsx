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
import { isValidEmail } from "../../utils/isValidEmail";

const LocationRet = () => {
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
    const [networkAccessIdentifier, setNetworkAccessIdentifier] = useState("");
    const [maxAge, setMaxAge] = useState<number | undefined>(undefined);


    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSelectedDevice(e.target.value);
    };

    const handleNetworkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNetworkAccessIdentifier(e.target.value);
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
            'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key,
            'X-RapidAPI-Host': import.meta.env.VITE_LOC_RET_HOST
        },
        data: {
            device: {
                networkAccessIdentifier: networkAccessIdentifier,
            },
            maxAge: maxAge
        }
    }

    const retrieveLocationHandler = async () => {
        setIsActive(false)
        if (maxAge && maxAge < 60) {
            return setError('Max age should be at least 60.');
        }

        if (!isValidEmail(networkAccessIdentifier.trim())) {
            return setError('Invalid network access identifier format.');
        }
        if (networkAccessIdentifier.trim() === '') {
            return setError('Network access identifier can not be empty.');
        }
        try {
            console.log({ selectedDevice, networkAccessIdentifier, maxAge })
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

                setError(errorMessage);
            } else {
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
                address={data.civicAddress} />
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
                            Select a device:
                        </label>
                        <select id="categorySelect" className={styles.categorySelect} value={selectedDevice} onChange={handleDeviceChange}>
                            <option value="networkAccessIdentifier">Network Access Identifier</option>
                            <option value="phoneNumber" disabled>Phone Number</option>
                        </select>

                        <label htmlFor="networkAccessIdentifier" className={styles.networkAccessIdentifierLabel}>
                            Network Access Identifier
                        </label>
                        <input
                            type="eamil"
                            id="networkAccessIdentifier"
                            className={styles.networkAccessIdentifier}
                            onChange={handleNetworkInputChange}
                            value={networkAccessIdentifier}
                            placeholder="device@testcsp.net"
                        />

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