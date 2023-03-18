import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, currentImageUrl, currentImageDescription }) => {

    

    const handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            closeModal();
        }
    };

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    return createPortal(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={currentImageUrl} alt={currentImageDescription} loading="lazy" />
            </div>
        </div>,
        modalRoot,
    ); 
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
};

export default Modal;