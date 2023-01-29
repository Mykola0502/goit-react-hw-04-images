import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchPictures } from '../../services/pictures-api';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';

import { Container, InfoText } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  const handleFormSubmit = query => {
    if (searchQuery !== query.trim()) {
      setSearchQuery(query.trim());
      setImages([]);
      setPage(1);
      setTotalHits(0);
    }
  };

  const picturesHits = useRef(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    if (page === 1) {
      picturesHits.current = 0;
    }
    const onSearch = async (query, page) => {
      try {
        setLoading(true);
        const pictures = await fetchPictures(query, page);
        setImages(prevState => [...prevState, ...pictures.hits]);
        setTotalHits(pictures.totalHits);
        picturesHits.current += pictures.hits.length;
        console.log(picturesHits.current);
        if (!pictures.hits.length) {
          toast.error(`No images found for "${searchQuery}", try again😢`, {
            position: 'top-right',
            autoClose: 2000,
          });
        }
        if (page >= 1 && pictures.hits.length) {
          toast.success(
            `Found ${picturesHits.current} images out of ${pictures.totalHits}`,
            {
              position: 'top-right',
              autoClose: 2000,
              theme: 'light',
            }
          );
          if (picturesHits.current >= pictures.totalHits) {
            toast.success(
              `You reached the end of the search list for "${searchQuery}"`,
              {
                position: 'top-right',
                autoClose: 2000,
              }
            );
          }
        }
      } catch (error) {
        setError('No images found, try again😢');
      } finally {
        setLoading(false);
      }
    };

    onSearch(searchQuery, page);
    return;
  }, [page, searchQuery]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {error && <h2>{error}</h2>}
      {searchQuery ? (
        images.length ? (
          <ImageGallery images={images}></ImageGallery>
        ) : (
          !loading &&
          !error && <InfoText>No images found for "{searchQuery}"</InfoText>
        )
      ) : (
        <InfoText>Enter text for search!</InfoText>
      )}
      {loading && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </Container>
  );
};
