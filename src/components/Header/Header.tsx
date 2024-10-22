import { useState } from "react"
import { FaHome, FaSimCard, FaTimes } from "react-icons/fa";
import { FaLocationDot, FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useSessionStorageBase64 } from "../../hooks/useSessionStorage";
import Modal from "../Modal/Modal";
import { GiNetworkBars } from "react-icons/gi";

const Header = () => {
    const [value, setValue] = useSessionStorageBase64('rpTkn', '');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const addOrUpdateTokenModal = () => {
        setIsActive(true)
    }

    const addOrUpdateTokenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const addOrUpdateTokenSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim() == "") {
            return setError("Token can not be an empty.")
        }
        if (inputValue.trim().length < 49) {
            return setError("Token should be minimum 50 caracters length.")
        }
        setValue(inputValue);
        setInputValue('');
        setIsActive(false)
    };


    console.log(value)


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
                                <Link to="/qod">
                                    <GiNetworkBars className={`${styles.icon} ${styles.homeIcon}`} />
                                    <span>QoD</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/sim-swap">
                                    <FaSimCard className={`${styles.icon} ${styles.homeIcon}`} />
                                    <span>Sim Swap</span>
                                </Link>
                            </li>

                            <li>
                                <a href="https://developer.networkascode.nokia.io/" target="_blank">
                                    <FaCircleInfo className={`${styles.icon} ${styles.homeIcon}`} />
                                    <span>NaC</span>
                                </a>
                            </li>

                            <li>
                                <button className={styles.addToken} onClick={addOrUpdateTokenModal}>{value ? "Update" : "Add"} Token</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>



            <Modal show={isActive} onClose={() => setIsActive(false)}>
                <div className={styles.content}>
                    <div className={styles.modalHeader}>
                        <h2>{value ? "Update token" : "Add token"}</h2>
                        <FaTimes
                            className={`${styles.icon} ${styles.iconClose}`}
                            onClick={() => setIsActive(false)}
                        />
                    </div>
                    <div className={styles.modalBody}>
                        <p className={styles.errorModal}>{error && error}</p>
                        <input
                            type="password"
                            id="token"
                            className={styles.maxAgeInput}
                            onChange={addOrUpdateTokenHandler}
                            value={inputValue}
                            placeholder="***************"
                            min={60}
                        />
                    </div>
                    <div className={styles.modalFooter}>
                        <button
                            className={`${styles.btn} ${styles.btnRetrieve}`}
                            onClick={addOrUpdateTokenSubmit}
                        >
                            {value ? "Update" : "Add"}
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
        </header>
    );
};

export default Header;