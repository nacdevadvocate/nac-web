import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="https://developer.networkascode.nokia.io/" target="_blank">
                        <span>Network as Code</span>
                    </a>

                </div>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com/nokia" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com/nokia" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com/nokia" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com/company/nokia" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://youtube.com/nokia" target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
