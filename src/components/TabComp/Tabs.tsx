import React from 'react';
import styles from './Tabs.module.scss';
import { useSessionStorage } from '../../hooks/useSessionStorage';

interface TabProps {
    label: string;
    children: React.ReactNode;
}

interface TabsProps {
    children: React.ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [value, setValue] = useSessionStorage('tab', 0);

    const handleTabClick = (index: number) => {
        setValue(index);
    };

    return (
        <div>
            <div className={styles.tabTitles}>
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        className={`${styles.tabTitle} ${value === index ? styles.active : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </div>
                ))}
            </div>
            <div className={styles.tabContent}>
                {React.Children.map(children, (child, index) =>
                    value == index ? child.props.children : null
                )}
            </div>
        </div>
    );
};

export default Tabs;
