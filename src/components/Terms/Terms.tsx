
import styles from './Terms.module.scss';

interface TermsProps {
    onAccept: () => void;
}

const Terms: React.FC<TermsProps> = ({ onAccept }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Terms and Conditions</h2>
                <p>
                    By using this website, you agree to our <a href="https://developer.networkascode.nokia.io/legal/terms-of-service" target="_blank" rel="noopener noreferrer">Network as Code Terms and Conditions</a>. You must
                    accept these terms to proceed.
                </p>
                <button onClick={onAccept} className={styles.acceptButton}>
                    Accept
                </button>
            </div>
        </div>
    );
};

export default Terms;
