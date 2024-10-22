import React, { useState } from 'react';
import styles from './FormComponent.module.scss';

interface DevicePorts {
    ranges: { from: number; to: number }[];
    ports: number[];
}

interface ApplicationServer {
    ipv4Address: string;
    ipv6Address: string;
}

interface Device {
    phoneNumber: string;
    networkAccessIdentifier: string;
    ipv4Address: { publicAddress: string; publicPort: number };
    ipv6Address: string;
}

interface Webhook {
    notificationUrl: string;
    notificationAuthToken?: string;
}

interface FormData {
    duration: number;
    notificationUrl: string;
    qosProfile: string;
    device?: Device;
    applicationServer?: ApplicationServer;
    devicePorts?: DevicePorts;
    applicationServerPorts?: DevicePorts;
    webhook?: Webhook;
}

const FormComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        duration: 0,
        notificationUrl: '',
        qosProfile: ''
    });

    const [showDeviceFields, setShowDeviceFields] = useState(false);
    const [showAppServerFields, setShowAppServerFields] = useState(false);
    const [showDevicePorts, setShowDevicePorts] = useState(false);
    const [showAppServerPorts, setShowAppServerPorts] = useState(false);
    const [showWebhookAuthToken, setShowWebhookAuthToken] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted', formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>Duration (seconds)</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>Notification URL</label>
                <input
                    type="text"
                    name="notificationUrl"
                    value={formData.notificationUrl}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>QoS Profile</label>
                <input
                    type="text"
                    name="qosProfile"
                    value={formData.qosProfile}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Would you like to provide a Webhook Auth Token?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="showWebhookAuthToken"
                            value="yes"
                            checked={showWebhookAuthToken}
                            onChange={() => setShowWebhookAuthToken(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="showWebhookAuthToken"
                            value="no"
                            checked={!showWebhookAuthToken}
                            onChange={() => setShowWebhookAuthToken(false)}
                        />
                        No
                    </label>
                </div>
            </div>
            {showWebhookAuthToken && (
                <div className={styles.formGroup}>
                    <label>Notification Auth Token</label>
                    <input
                        type="text"
                        name="notificationAuthToken"
                        onChange={handleChange}
                    />
                </div>
            )}

            {/* Radio Toggle for Device fields */}
            <div className={styles.formGroup}>
                <label>Would you like to provide Device Information?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="showDeviceFields"
                            value="yes"
                            checked={showDeviceFields}
                            onChange={() => setShowDeviceFields(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="showDeviceFields"
                            value="no"
                            checked={!showDeviceFields}
                            onChange={() => setShowDeviceFields(false)}
                        />
                        No
                    </label>
                </div>
            </div>
            {showDeviceFields && (
                <div className={styles.section}>
                    <h3>Device Information</h3>
                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Network Access Identifier</label>
                        <input
                            type="text"
                            name="networkAccessIdentifier"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>IPv4 Address (Public)</label>
                        <input
                            type="text"
                            name="ipv4AddressPublic"
                            placeholder="Public Address"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>IPv4 Public Port</label>
                        <input
                            type="number"
                            name="ipv4AddressPort"
                            placeholder="Public Port"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>IPv6 Address</label>
                        <input
                            type="text"
                            name="ipv6Address"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            <div className={styles.formGroup}>
                <label>Would you like to provide Application Server Information?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="showAppServerFields"
                            value="yes"
                            checked={showAppServerFields}
                            onChange={() => setShowAppServerFields(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="showAppServerFields"
                            value="no"
                            checked={!showAppServerFields}
                            onChange={() => setShowAppServerFields(false)}
                        />
                        No
                    </label>
                </div>
            </div>
            {showAppServerFields && (
                <div className={styles.section}>
                    <h3>Application Server Information</h3>
                    <div className={styles.formGroup}>
                        <label>IPv4 Address</label>
                        <input
                            type="text"
                            name="appServerIPv4"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>IPv6 Address</label>
                        <input
                            type="text"
                            name="appServerIPv6"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            <div className={styles.formGroup}>
                <label>Would you like to provide Device Ports?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="showDevicePorts"
                            value="yes"
                            checked={showDevicePorts}
                            onChange={() => setShowDevicePorts(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="showDevicePorts"
                            value="no"
                            checked={!showDevicePorts}
                            onChange={() => setShowDevicePorts(false)}
                        />
                        No
                    </label>
                </div>
            </div>
            {showDevicePorts && (
                <div className={styles.section}>
                    <h3>Device Ports</h3>
                    <div className={styles.formGroup}>
                        <label>Ports Range (From)</label>
                        <input
                            type="number"
                            name="devicePortsFrom"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ports Range (To)</label>
                        <input
                            type="number"
                            name="devicePortsTo"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            <div className={styles.formGroup}>
                <label>Would you like to provide Application Server Ports?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="showAppServerPorts"
                            value="yes"
                            checked={showAppServerPorts}
                            onChange={() => setShowAppServerPorts(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="showAppServerPorts"
                            value="no"
                            checked={!showAppServerPorts}
                            onChange={() => setShowAppServerPorts(false)}
                        />
                        No
                    </label>
                </div>
            </div>
            {showAppServerPorts && (
                <div className={styles.section}>
                    <h3>Application Server Ports</h3>
                    <div className={styles.formGroup}>
                        <label>Ports Range (From)</label>
                        <input
                            type="number"
                            name="appServerPortsFrom"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ports Range (To)</label>
                        <input
                            type="number"
                            name="appServerPortsTo"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
};

export default FormComponent;
