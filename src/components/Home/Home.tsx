import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
    const navigate = useNavigate();

    const redirectTo = (url: string) => {
        navigate(url);
    };
    return (
        <div className={styles.container}>
            <h4 className={styles.info}>Nokia's Network as Code, a platform empowering you to develop applications that seamlessly integrate with the network and unlock the potential to create something new, amazing and powerful.</h4>
            <h2 className={styles.api}>Test following APIs</h2>

            <ul className={styles.availableApis}>
                <li onClick={() => redirectTo('/location-verification')}>
                    <Link to="/location-verification">
                        <span>Location Verification</span>
                    </Link>
                </li>
                <li onClick={() => redirectTo('/location-retrieval')}>
                    <Link to="/location-retrieval">
                        <span>Location Retrieval</span>
                    </Link>
                </li>

                <li onClick={() => redirectTo('/qod')}>
                    <Link to="/qod">
                        <span>QoD</span>
                    </Link>
                </li>

                <li onClick={() => redirectTo('/sim-swap')}>
                    <Link to="/sim-swap">
                        <span>Sim Swap</span>
                    </Link>
                </li>
            </ul>
        </div >
    );
};

export default Home;