import { PropTypes } from 'prop-types';
import { useState } from 'react';

import { Modal } from 'components/Modal';

import { ItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ItemImg src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.exact({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

// export class ImageGalleryItem extends Component {

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     const { showModal } = this.state;

//   }
// }

/**
 *
 *
 *
 */
// import { PropTypes } from 'prop-types';
// import { Component } from 'react';

// import { Modal } from 'components/Modal';

// import { ItemImg } from './ImageGalleryItem.styled';

// export class ImageGalleryItem extends Component {
//   static propTypes = {
//     image: PropTypes.exact({
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//       tags: PropTypes.string.isRequired,
//     }),
//   };

//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     const { showModal } = this.state;
//     return (
//       <>
//         <ItemImg src={webformatURL} alt={tags} onClick={this.toggleModal} />
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }
