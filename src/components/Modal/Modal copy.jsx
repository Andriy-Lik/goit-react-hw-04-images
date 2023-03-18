import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    static propTypes ={
        closeModal: PropTypes.func.isRequired,
        currentImageUrl: PropTypes.string,
        currentImageDescription: PropTypes.string,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    };

    handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            this.props.closeModal();
        }
    };

    render() {
        const { currentImageUrl, currentImageDescription } = this.props;
        return createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={currentImageUrl} alt={currentImageDescription} loading="lazy" />
                </div>
            </div>,
            modalRoot,
        );
        
    }
}

