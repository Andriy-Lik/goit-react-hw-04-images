import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ smallImage, largeImage, description, openModal }) {
    return (
        <li className={css.ImageGalleryItem} onClick={openModal}>
            <img className={css.ImageGalleryItemImage} src={smallImage} data-large={largeImage} alt={description} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;