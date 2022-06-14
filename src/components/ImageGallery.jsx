import ApiService from './ApiService';
import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import s from './Styles.module.css';
const apiService = new ApiService();
export default function ImageGallery({ searchResult }) {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchResult) {
      return;
    }
    setStatus('pending');
    apiService.query = searchResult;
    apiService.fetchPhotos().then(response => {
      if (response.data.totalHits > 0) {
        setResult(response.data.hits);
        setStatus('resolved');
        setTotalHits(response.data.totalHits);
      } else {
        setStatus('rejected');
        alert('ничего не найдено');
      }
    });
  }, [searchResult]);

  function openModal(largeImageURL) {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  }
  function onCloseModal() {
    setShowModal(!showModal);
  }
  function onLoadMore(data) {
    setResult(prevState => {
      return [...prevState, ...data];
    });
  }

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <div>
        {showModal && (
          <Modal largeImageURL={largeImageURL} onCloseModal={onCloseModal} />
        )}
        <ul className={s.imageGallery}>
          <ImageGalleryItem data={result} openModal={openModal} />
        </ul>
        {totalHits > 12 && (
          <Button result={searchResult} hits={totalHits} onClick={onLoadMore} />
        )}
      </div>
    );
  }
}
