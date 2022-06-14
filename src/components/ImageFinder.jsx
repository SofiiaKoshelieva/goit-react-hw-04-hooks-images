import { useState } from 'react';
import ImageGallery from './ImageGallery';
import SearchBar from './Searchbar';
export default function ImageFinder() {
  const [value, setValue] = useState(null);
  function onSubmit(value) {
    setValue(value);
  }
  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery searchResult={value} />
    </div>
  );
}
