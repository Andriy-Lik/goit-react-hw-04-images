import { Component } from "react";
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import searchImages from "services/api";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import Loader from "components/Loader";
import Modal from "components/Modal";

export class App extends Component {
  state = {
    imgName: '',
    page: 1,
    totalImages: null,
    images: [],
    loading: false,
    error: false,
    showModal: false,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imgName, page } = this.state;

    if(prevState.imgName !== imgName || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const getImages = await searchImages(imgName, page);

        if (!getImages.totalHits) {
          this.setState({ loading: false, totalImages: null, });
          return toast.error('No images found for your request!');
        }

        this.setState(({ images }) => ({
          images: [...images, ...getImages.hits],
          loading: false,
          totalImages: getImages.totalHits,
        }));
      } catch (error) {
        this.setState({ error: true, loading: false });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onFormSubmit = imgName => {
    this.setState({ imgName: imgName, page: 1, images: [] });
  };

  loadNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false, currentImageUrl: null, currentImageDescription: null });
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState({ showModal: true, currentImageUrl: currentImageUrl, currentImageDescription: currentImageDescription });
    }
  };

  render() {
    const { images, loading, totalImages, showModal, currentImageUrl, currentImageDescription } = this.state;
    const totalPage = images.length / totalImages;
    
    return (
      <div  className={css.App}>
        <Toaster />
        <Searchbar onSubmit={this.onFormSubmit} />
        {images && <ImageGallery images={images} openModal={this.openModal} />}
        {loading && <Loader />}
        {totalPage < 1 && !loading && (<Button loadNextPage={this.loadNextPage} />)}
        {showModal && <Modal closeModal={this.closeModal} currentImageUrl={currentImageUrl} currentImageDescription={currentImageDescription} />}
      </div>
    );
  }
};
