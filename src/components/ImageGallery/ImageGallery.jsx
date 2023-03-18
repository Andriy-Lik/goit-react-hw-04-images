import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images, openModal }) {
    return (
        <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id} smallImage={webformatURL} largeImage={largeImageURL} description={tags} openModal={openModal} />
            ))} 
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGallery;