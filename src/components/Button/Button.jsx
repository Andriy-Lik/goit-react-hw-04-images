import css from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ loadNextPage }) {
    return (
        <button className={css.Button} type="button" onClick={loadNextPage}>Load more</button>
    );
}

Button.propTypes = {
    loadNextPage: PropTypes.func.isRequired,
};

export default Button;