import React from 'react';
import { FaInfoCircle, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import styles from './Alert.module.scss';

type AlertProps = {
    type: 'info' | 'success' | 'error' | 'warning';
    title: string;
    body: string;
    onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({ type, title, body, onClose }) => {
    let IconComponent;

    switch (type) {
        case 'info':
            IconComponent = FaInfoCircle;
            break;
        case 'success':
            IconComponent = FaCheckCircle;
            break;
        case 'error':
            IconComponent = FaTimesCircle;
            break;
        case 'warning':
            IconComponent = FaExclamationTriangle;
            break;
        default:
            IconComponent = FaInfoCircle;
    }


    return (
        <div className={`${styles.alert} ${styles[`alert--${type}`]}`}>
            <IconComponent className={`${styles.icon} ${styles.iconCustom}`} />
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.body}>{body}</div>
            </div>

            <div className={styles.closeIcon} onClick={onClose}>
                <FaTimes />
            </div>
        </div>
    );
};

export default Alert;
