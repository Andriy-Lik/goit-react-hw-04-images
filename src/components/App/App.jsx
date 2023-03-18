import React, { useState, useEffect } from "react";
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import searchImages from "services/api";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import Loader from "components/Loader";
import Modal from "components/Modal";

export default function App() {

  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  

  useEffect(() => {
    const handleSearchImages = async (imgName, page) => {
      if(prevState.imgName !== imgName || prevState.page !== page) {
        try {
          setLoading(true);
          const getImages = await searchImages(imgName, page);
    
          if (!getImages.totalHits) {
            setLoading(false);
            setTotalImages(null);
            return toast.error('No images found for your request!');
          }
    
          setLoading(false);
          setTotalImages(getImages.totalHits);
          setImages(getImages.hits);
    
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
      
    };

    handleSearchImages(imgName, page);

  }, [imgName, page, images]);

  const onFormSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setImages([]);
  };

  const loadNextPage = () => {
    setPage(prevState => prevState + 1);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentImageUrl(null);
    setCurrentImageDescription(null);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(true);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  const totalPage = images.length / totalImages;

  return (
    <div  className={css.App}>
      <Toaster />
      <Searchbar onSubmit={onFormSubmit} />
      {images && <ImageGallery images={images} openModal={openModal} />}
      {loading && <Loader />}
      {totalPage < 1 && !loading && (<Button loadNextPage={loadNextPage} />)}
      {showModal && <Modal closeModal={closeModal} currentImageUrl={currentImageUrl} currentImageDescription={currentImageDescription} />}
    </div>
  );
};