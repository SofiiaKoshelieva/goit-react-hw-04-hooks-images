import s from './Styles.module.css';
export default function ImageGalleryItem({ data, openModal }) {
  return data.map(({ webformatURL, largeImageURL }, index) => {
    return (
      <li key={index} className={s.imageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={s.imageGalleryItemImage}
          onClick={() => openModal(largeImageURL)}
        />
      </li>
    );
  });
}
