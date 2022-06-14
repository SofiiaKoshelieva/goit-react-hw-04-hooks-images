import s from './Styles.module.css';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';
import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setValue] = useState('');
  function onInputChange(e) {
    setValue(e.currentTarget.value.toLowerCase());
  }
  function onFormSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') {
      Notiflix.Notify.warning('Enter a request!!!!!!!');
      return;
    }
    onSubmit(inputValue);
    setValue('');
    e.target.reset();
  }
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <ImSearch />{' '}
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}
