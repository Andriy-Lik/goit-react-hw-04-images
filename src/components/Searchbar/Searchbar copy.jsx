import { Component } from "react";
import PropTypes from 'prop-types';
import { BiSearch } from "react-icons/bi";
import toast from 'react-hot-toast';
import css from './Searchbar.module.css';


class Searchbar extends Component {
    state = {
        imgName: '',
    };

    nameChange = e => {
        this.setState({ imgName: e.currentTarget.value.toLowerCase() });
    };

    formSubmit = e => {
        e.preventDefault();
        
        const { imgName } = this.state;
        if (imgName.trim() === '') {
            toast.error('Enter a search term!');
            return;
        }
        
        this.props.onSubmit(imgName);
        this.setState({ imgName: '' });
    };

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.formSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <BiSearch className={css.SearchFormIcon} />
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.imgName}
                        onChange={this.nameChange}
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;