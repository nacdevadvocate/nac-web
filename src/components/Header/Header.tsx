import { useState } from "react"
import { FaHome } from "react-icons/fa";
import { FaLocationDot, FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    return (
        <header id={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Link className={styles.logo} to="/">
                        NaC APIs
                    </Link>
                    <nav className={styles.navlinks}>
                        <ul>
                            <li>
                                <Link to="/">
                                    <FaHome className={`${styles.icon} ${styles.homeIcon}`} />
                                    <span>Home</span>
                                </Link>
                            </li>


                            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <div className={styles.dropdownWrapper}>
                                    <div className={styles.dropdownMain}>
                                        <FaLocationDot className={`${styles.icon} ${styles.barIcon}`} />
                                        <span>Location</span>
                                    </div>

                                    {isDropdownOpen &&
                                        <ul className={styles.dropdownContent} onMouseEnter={handleMouseEnter}>
                                            <li>
                                                <Link to="/location-verification">
                                                    <span>Location Verification</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/location-retrieval">
                                                    <span>Location Retrieval</span>
                                                </Link>
                                            </li>
                                        </ul>}

                                </div>
                            </li>

                            <li>
                                <a href="https://developer.networkascode.nokia.io/" target="_blank">
                                    <FaCircleInfo className={`${styles.icon} ${styles.homeIcon}`} />
                                    <span>NaC-Help</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;