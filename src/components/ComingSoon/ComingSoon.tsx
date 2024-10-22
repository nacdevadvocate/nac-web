import React from "react";
import styles from "./ComingSoon.module.scss";

const ComingSoon: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Coming Soon</h1>
                <p className={styles.description}>
                    Sim Swap is in progress, but we are coming soon. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;
