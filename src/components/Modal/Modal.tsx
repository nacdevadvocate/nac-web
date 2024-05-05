import React, { useEffect, useRef, ReactNode, CSSProperties } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
    modalStyle?: CSSProperties;
    children: ReactNode;
    show: boolean;
    onClose: () => void;
    backdropStyle?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const bRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (show && modalRef.current) {
            modalRef.current.classList.add(styles.visible);
        } else if (modalRef.current) {
            modalRef.current.classList.remove(styles.visible);
        }
    }, [show]);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (bRef.current && !bRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <React.Fragment>
            <div
                ref={modalRef}
                style={backdropStyle}
                className={styles.modal__wrap}
                onClick={handleOutsideClick}
            >
                <div style={modalStyle} ref={bRef} className={styles.modal}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
