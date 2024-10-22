import { useState } from "react";
import styles from "./QoD.module.scss";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import Loading from "../Loading/Loading";
import { isAxiosError } from "../../utils/isAxiosError";
import { useSessionStorage, useSessionStorageBase64 } from "../../hooks/useSessionStorage";
import Tabs from "../TabComp/Tabs";
import Tab from "../TabComp/Tab";
import { SessionData } from "../../types/sessionDatatypes";
import toast from "react-hot-toast";
import { FormValues } from "../../types/sessionCreateTypes";
import qosProfiles from "../../utils/profiles";


const QoD = () => {
    const [storedValue] = useSessionStorageBase64('rpTkn', '');
    const [value, setValue] = useSessionStorage('tab',);
    const [loading, setLoading] = useState<boolean>(false);
    const [sessionCreateLoading, setSessionCreateLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'json' | 'table'>('json');

    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [sessionId, setSessionId] = useState<string>("");

    console.log({ value })

    const sessionOptions = {
        method: 'GET',
        url: import.meta.env.VITE_QOD_URL,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': storedValue,
            'X-RapidAPI-Host': import.meta.env.VITE_QOD_HOST
        }
    }


    const fetchSessionsData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.request(sessionOptions);
            console.log(response)
            setData(response.data);
        } catch (error) {
            console.log({ error })
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

                setError(errorMessage);
                toast(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            } else {
                console.log("Error went to else block, not Axios error:", error);
                setError('An unexpected error occurred.');
                toast('An unexpected error occurred.',
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    };



    const sessionGetOptions = {
        method: 'GET',
        url: import.meta.env.VITE_QOD_URL + "/" + sessionId,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': storedValue,
            'X-RapidAPI-Host': import.meta.env.VITE_QOD_HOST
        }
    }


    const fetchSessionData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.request(sessionGetOptions);
            console.log(response)
            setSessionData(response.data);
        } catch (error) {
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

                setError(errorMessage);
                toast(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            } else {
                console.log("Error went to else block, not Axios error:", error);
                setError('An unexpected error occurred.');
                toast('An unexpected error occurred.',
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    };


    const sessionDeleteOptions = {
        method: 'DELETE',
        url: import.meta.env.VITE_QOD_URL + "/" + sessionId,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': storedValue,
            'X-RapidAPI-Host': import.meta.env.VITE_QOD_HOST
        }
    }

    const deleteSessionData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.request(sessionDeleteOptions);
            if (response.status == 204) {
                setSessionId("")
                toast('Session deleted.',
                    {
                        icon: '✅',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        } catch (error) {
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

                setError(errorMessage);
                toast(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            } else {
                console.log("Error went to else block, not Axios error:", error);
                setError('An unexpected error occurred.');
                toast('An unexpected error occurred.',
                    {
                        icon: '❌',
                        duration: 10000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    };


    const jsonToTableData = (data: any) => {
        const tableData: { key: string; value: any }[] = [];

        const flattenObject = (obj: any, prefix = '') => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    const newKey = prefix ? `${prefix}.${key}` : key;
                    if (typeof value === 'object' && value !== null) {
                        flattenObject(value, newKey);
                    } else {
                        tableData.push({ key: newKey, value: value });
                    }
                }
            }
        };

        flattenObject(data);
        return tableData;
    };

    // Function to copy JSON to clipboard
    const copyToClipboard = async (single: boolean) => {
        console.log(single)
        try {
            await navigator.clipboard.writeText(JSON.stringify(single ? sessionData : data, null, 2));
            toast('Copied',
                {
                    icon: '✅',
                    duration: 5000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Initial form values
    const initialFormValues: FormValues = {
        profileSelect: 'QOS_M',
        duration: 180,
        notificationUrl: '',
    };

    // State to store form values
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Mandatory fields validation
        if (!formValues.profileSelect) {
            return toast.error('QoD Profile is required');
        }

        if (!formValues.duration) {
            return toast.error('Duration is required');
        } else if (formValues.duration <= 0) {
            return toast.error('Duration must be greater than 0');
        }

        if (!formValues.notificationUrl) {
            return toast.error('Notification URL is required');
        } else if (!/https?:\/\/.+\..+/i.test(formValues.notificationUrl)) {
            return toast.error('Enter a valid URL');
        }

        if (!formValues.phoneNumber && !formValues.networkAccessIdentifier && !formValues.deviceIpv6) {
            return toast.error('At least one of Phone Number, Network Access Identifier, or Device IPv6 is required');
        }
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };






    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formValues);

            // Constructing the sessData object only with non-empty fields
            const sessData: any = {};
            if (formValues.profileSelect) {
                sessData.qosProfile = formValues.profileSelect;
            }

            if (formValues.phoneNumber || formValues.networkAccessIdentifier || formValues.devicePublicIp || formValues.deviceIpv6) {
                sessData.device = {};
                if (formValues.phoneNumber) sessData.device.phoneNumber = formValues.phoneNumber;
                if (formValues.networkAccessIdentifier) sessData.device.networkAccessIdentifier = formValues.networkAccessIdentifier;

                if (formValues.devicePublicIp || formValues.devicePublicPort) {
                    sessData.device.ipv4Address = {
                        publicAddress: formValues.devicePublicIp,
                        publicPort: formValues.devicePublicPort,
                    };
                }

                if (formValues.deviceIpv6) {
                    sessData.device.ipv6Address = formValues.deviceIpv6;
                }
            }

            if (formValues.appServerIpv4 || formValues.appServerIpv6) {
                sessData.applicationServer = {};
                if (formValues.appServerIpv4) sessData.applicationServer.ipv4Address = formValues.appServerIpv4;
                if (formValues.appServerIpv6) sessData.applicationServer.ipv6Address = formValues.appServerIpv6;
            }



            if (formValues.notificationUrl || formValues.notificationAuthToken) {
                sessData.webhook = {};
                if (formValues.notificationUrl) sessData.webhook.notificationUrl = formValues.notificationUrl;
                if (formValues.notificationAuthToken) sessData.webhook.notificationAuthToken = formValues.notificationAuthToken;
            }

            if (formValues.duration) {
                sessData.duration = formValues.duration;
            }

            console.log('Final sessData:', sessData);


            setSessionCreateLoading(true)
            setError(null);

            const sessionCreateOptions = {
                method: 'POST',
                url: import.meta.env.VITE_QOD_URL,
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': storedValue,
                    'X-RapidAPI-Host': import.meta.env.VITE_QOD_HOST
                },
                data: sessData

            }

            try {

                const response = await axios.request(sessionCreateOptions);

                if (response.status == 201) {
                    setSessionCreateLoading(false)
                    setSessionData(response.data)
                    setFormValues(initialFormValues);  // Reset to initial values
                    setSessionId(response.data.sessionId)
                    setValue("2")

                }
                console.log(response)
            } catch (error) {
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

                    setError(errorMessage);
                    toast(errorMessage.includes("Invalid API key") ? "Invalid API key" : errorMessage,
                        {
                            icon: '❌',
                            duration: 10000,
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                } else {
                    console.log("Error went to else block, not Axios error:", error);
                    setError('An unexpected error occurred.');
                    toast('An unexpected error occurred.',
                        {
                            icon: '❌',
                            duration: 10000,
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                }
            } finally {
                setSessionCreateLoading(false)
            }
        }
    };




    const tableData = jsonToTableData(sessionData);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Quality of Service on Demand</h1>


            <Tabs>
                <Tab label="Create session">
                    <form className={styles.createSessionContainer} onSubmit={handleSubmit}>
                        <div className={styles.verifyBody}>


                            <div className={styles.inputRow}>

                                <label htmlFor="phoneNumber" className={styles.networkAccessIdentifierLabel}>
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className={styles.latitudeInput}
                                    value={formValues.phoneNumber || ''}
                                    onChange={handleInputChange}
                                    placeholder="+3671234567"
                                />

                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="networkAccessIdentifier" className={styles.networkAccessIdentifierLabel}>
                                    Network Access Identifier
                                </label>
                                <input
                                    type="email"
                                    id="networkAccessIdentifier"
                                    name="networkAccessIdentifier"
                                    className={styles.latitudeInput}
                                    value={formValues.networkAccessIdentifier || ''}
                                    onChange={handleInputChange}
                                    placeholder="device@testcsp.net"
                                />


                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="profileSelect" className={styles.categoryLabel}>
                                    QoD Profile
                                </label>
                                <select
                                    id="profileSelect"
                                    name="profileSelect"
                                    value={formValues.profileSelect}
                                    className={styles.categorySelect}
                                    onChange={handleInputChange}
                                >
                                    {qosProfiles.map((profile) => (
                                        <option key={profile} value={profile}>
                                            {profile}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="duration" className={styles.latitudeLabel}>
                                    Duration
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    value={formValues.duration}
                                    onChange={handleInputChange}
                                    className={styles.latitudeInput}
                                    placeholder="180"
                                    min={0}
                                />

                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="devicePublicIp" className={styles.latitudeLabel}>
                                    Device IPv4 Public Address
                                </label>
                                <input
                                    type="text"
                                    id="devicePublicIp"
                                    name="devicePublicIp"
                                    value={formValues.devicePublicIp}
                                    className={styles.latitudeInput}
                                    onChange={handleInputChange}
                                    placeholder="233.252.0.2"
                                />

                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="devicePrivateIp" className={styles.latitudeLabel}>
                                    Device IPv4 Private Address
                                </label>
                                <input
                                    type="text"
                                    id="devicePrivateIp"
                                    name="devicePrivateIp"
                                    className={styles.latitudeInput}
                                    value={formValues.devicePrivateIp}
                                    onChange={handleInputChange}
                                    placeholder="192.0.2.25"
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="devicePublicPort" className={styles.latitudeLabel}>
                                    Device Public Port
                                </label>
                                <input
                                    type="number"
                                    id="devicePublicPort"
                                    className={styles.latitudeInput}
                                    name="devicePublicPort"
                                    value={formValues.devicePublicPort}
                                    onChange={handleInputChange}
                                    placeholder="80"
                                />
                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="deviceIpv6" className={styles.latitudeLabel}>
                                    Device IPv6 Address
                                </label>
                                <input
                                    type="text"
                                    id="deviceIpv6"
                                    name="deviceIpv6"
                                    className={styles.latitudeInput}
                                    value={formValues.deviceIpv6}
                                    onChange={handleInputChange}
                                    placeholder="2001:db8:1234:5678:9abc:def0:fedc:ba98"
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="appServerIpv4" className={styles.latitudeLabel}>
                                    App server IPv4 Address
                                </label>
                                <input
                                    type="text"
                                    id="appServerIpv4"
                                    name="appServerIpv4"
                                    className={styles.latitudeInput}
                                    value={formValues.appServerIpv4}
                                    onChange={handleInputChange}
                                    placeholder="233.252.0.2"
                                />
                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="ipv4Address" className={styles.latitudeLabel}>
                                    App server IPv6 Address
                                </label>
                                <input
                                    type="text"
                                    id="appServerIpv6"
                                    name="appServerIpv6"
                                    className={styles.latitudeInput}
                                    value={formValues.appServerIpv6}
                                    onChange={handleInputChange}
                                    placeholder="2001:db8:1234:5678:9abc:def0:fedc:ba98"
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="notificationUrl" className={styles.latitudeLabel}>
                                    Notification URL
                                </label>
                                <input
                                    type="url"
                                    id="notificationUrl"
                                    name="notificationUrl"
                                    className={styles.latitudeInput}
                                    value={formValues.notificationUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://notification-server.com"
                                />
                            </div>
                            <div className={styles.inputRow}>
                                <label htmlFor="notificationAuthToken" className={styles.latitudeLabel}>
                                    Notification Auth Token
                                </label>
                                <input
                                    type="text"
                                    id="notificationAuthToken"
                                    name="notificationAuthToken"
                                    className={styles.latitudeInput}
                                    value={formValues.notificationAuthToken}
                                    onChange={handleInputChange}
                                    placeholder="c8974e592c2fa383d4a3960714"
                                />
                            </div>

                        </div>
                        <div className={styles.retrieveFooter}>
                            {

                                sessionCreateLoading ?
                                    <button className={`${styles.btn} ${styles.loading} ${styles.btnRetrieve}`}>Creating</button>
                                    : <button
                                        type="submit"
                                        className={`${styles.btn} ${styles.btnRetrieve}`}
                                    >
                                        Create
                                    </button>
                            }



                            {/* <button
                                className={`${styles.btn} ${styles.btnCancel}`}
                                onClick={() => setIsActive(false)}
                            >
                                Cancel
                            </button> */}
                        </div>

                    </form>
                </Tab>
                <Tab label="Extend session">
                    <div className={styles.idContainer}>
                        <input
                            type="number"
                            id="ipv4Address"
                            className={styles.idInput}
                            onChange={handleInputChange}
                            value={sessionId}
                            placeholder="Provide session ID..."
                        />
                        <button
                            disabled
                            className={styles.btnExtend}
                            onClick={() => console.log("Extend")}
                        >
                            Extend session
                        </button>
                    </div>

                </Tab>
                <Tab label="Get session">
                    <div className={styles.idContainer}>
                        <input
                            type="text"
                            className={styles.idInput}
                            onChange={(e) => setSessionId(e.target.value)}
                            value={sessionId}
                            placeholder="Provide session ID..."
                        />
                        <button
                            className={styles.btnExtend}
                            onClick={fetchSessionData}
                        >
                            Get session
                        </button>
                    </div>

                    {loading && <div className={styles.centerDiv}>
                        <Loading message="Retrieving session...." />
                    </div>
                    }


                    <>
                        {sessionData && !loading && !error && (
                            <>
                                <div className={styles.btns}>
                                    <button
                                        onClick={() => setViewMode('json')}
                                        className={`${styles.button} ${viewMode === 'json' ? styles.active : ''}`}
                                    >
                                        Show JSON
                                    </button>
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={`${styles.button} ${viewMode === 'table' ? styles.active : ''}`}
                                    >
                                        Show Table
                                    </button>
                                </div>

                                {

                                    viewMode === 'json' ? (
                                        <div className={styles.jsonData}>
                                            <h2 className={styles.sessTitle}>Session in JSON</h2>
                                            {viewMode === 'json' && (
                                                <button
                                                    onClick={() => copyToClipboard(true)}
                                                    className={styles.copyButton}
                                                >
                                                    <FaCopy className={`${styles.icon} ${styles.copyIcon}`} />

                                                </button>
                                            )}
                                            <pre className={styles.jsonOutput}>
                                                {JSON.stringify(sessionData, null, 2)}
                                            </pre>
                                        </div>
                                    ) : (

                                        <>
                                            <h2>Session in Table</h2>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Key</th>
                                                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((row, index) => (
                                                        <tr key={index}>
                                                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.key}</td>
                                                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{String(row.value)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )
                                }
                            </>
                        )}

                    </>



                </Tab>
                <Tab label="Get all session">
                    <div className={styles.idContainer}>
                        <button
                            className={styles.btnExtend}
                            onClick={fetchSessionsData}
                        >
                            Get All sessions
                        </button>
                    </div>
                    <>
                        {data && (
                            <>
                                <div className={styles.btns}>
                                    <button
                                        onClick={() => setViewMode('json')}
                                        className={`${styles.button} ${viewMode === 'json' ? styles.active : ''}`}
                                    >
                                        Show JSON
                                    </button>
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={`${styles.button} ${viewMode === 'table' ? styles.active : ''}`}
                                    >
                                        Show Table
                                    </button>
                                </div>

                                {

                                    viewMode === 'json' ? (
                                        <div className={styles.jsonData}>
                                            <h2 className={styles.sessTitle}>Session in JSON</h2>
                                            {viewMode === 'json' && (
                                                <button
                                                    onClick={() => copyToClipboard(false)}
                                                    className={styles.copyButton}
                                                >
                                                    <FaCopy className={`${styles.icon} ${styles.copyIcon}`} />

                                                </button>
                                            )}
                                            <pre className={styles.jsonOutput}>
                                                {/* {JSON.stringify(data, null, 2)} */}
                                                {JSON.stringify(data, null, 2)}
                                            </pre>
                                        </div>
                                    ) : (

                                        <>
                                            <h2>Session in Table</h2>

                                            {data?.map((singleData: any, index: number) => (
                                                <table key={index} className={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Key</th>
                                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {jsonToTableData(singleData).map((row, index) => (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.key}</td>
                                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{String(row.value)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ))}

                                        </>
                                    )
                                }
                            </>
                        )}

                    </>

                    {loading && <div className={styles.centerDiv}>
                        <Loading message="Retrieving all sessions...." />
                    </div>
                    }
                </Tab>
                <Tab label="Delete session">
                    <div className={styles.idContainer}>
                        <input
                            type="text"
                            className={styles.idInput}
                            onChange={(e) => setSessionId(e.target.value)}
                            value={sessionId}
                            placeholder="Provide session ID..."
                        />
                        <button
                            className={styles.btnDelete}
                            onClick={() => deleteSessionData()}
                        >
                            Delete session
                        </button>
                    </div>

                    {loading && <div className={styles.centerDiv}>
                        <Loading message="Deleting session...." />
                    </div>
                    }
                </Tab>
            </Tabs>

        </div>
    )
}

export default QoD