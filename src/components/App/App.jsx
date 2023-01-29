import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchPictures } from '../../services/pictures-api';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';

import { Container, InfoText } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    loading: false,
    images: [],
    page: 1,
    totalHits: 0,
    picturesHits: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      // this.setState({ loading: true });

      // setTimeout(() => {
      //   this.onSearch(nextQuery, nextPage);
      // }, 3000);
      this.onSearch(nextQuery, nextPage);
    }
  }

  handleFormSubmit = query => {
    const { searchQuery } = this.state;
    if (searchQuery !== query.trim()) {
      this.setState({
        searchQuery: query.trim(),
        images: [],
        page: 1,
        totalHits: 0,
        picturesHits: 0,
      });
    }
  };

  async onSearch(query, page) {
    const { picturesHits } = this.state;

    try {
      this.setState({ loading: true });
      const pictures = await fetchPictures(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...pictures.hits],
        totalHits: pictures.totalHits,
        picturesHits: prevState.picturesHits + pictures.hits.length,
      }));

      toast.success(
        `Found ${picturesHits + pictures.hits.length} images out of ${
          pictures.totalHits
        }`,
        {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
        }
      );
    } catch (error) {
      this.setState({ error: 'No images found, try again😢' });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchQuery, images, totalHits, loading, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>

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
          <Button onClick={this.loadMore} />
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </Container>
    );
  }
}
