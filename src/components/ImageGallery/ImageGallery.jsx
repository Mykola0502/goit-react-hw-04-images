import { PropTypes } from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Gallery, Item } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, ...otherProps }) => {
        return (
          <Item key={id}>
            <ImageGalleryItem {...otherProps}></ImageGalleryItem>
          </Item>
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
