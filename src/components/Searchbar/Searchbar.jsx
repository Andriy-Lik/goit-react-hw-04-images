import { useState } from "react";
import PropTypes from 'prop-types';
import { BiSearch } from "react-icons/bi";
import toast from 'react-hot-toast';
import css from './Searchbar.module.css';


const Searchbar = ({ onSubmit }) => {
    const [imgName, setImgName] = useState('');

    const nameChange = e => {
        setImgName(e.currentTarget.value.toLowerCase());
    };

    const formSubmit = e => {
        e.preventDefault();
        
        if (imgName.trim() === '') {
            toast.error('Enter a search term!');
            return;
        }
        
        onSubmit(imgName);
        setImgName('');
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={formSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <BiSearch className={css.SearchFormIcon} />
                </button>

                <input
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={imgName}
                    onChange={nameChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;