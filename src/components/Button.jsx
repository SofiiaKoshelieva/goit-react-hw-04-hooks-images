import { useState } from 'react';
import s from './Styles.module.css';
import ApiService from './ApiService';
import Loader from './Loader';
const apiService = new ApiService();
export default function Button({ result, totalHits, onClick }) {
  const [status, setStatus] = useState('resolved');
  const [counter, setCounter] = useState(1);
  function onLoadMoreClick() {
    if (counter === 1) {
      apiService.incrementPage();
    }

    setStatus('pending');
    setCounter(counter + 1);

    apiService.query = result;
    apiService.fetchPhotos().then(response => {
      onClick(response.data.hits);
      if (counter * 12 >= totalHits) {
        setStatus('rejected');
      } else {
        setStatus('resolved');
      }
    });
  }

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <button className={s.button} onClick={onLoadMoreClick}>
        Load more
      </button>
    );
  }
}
