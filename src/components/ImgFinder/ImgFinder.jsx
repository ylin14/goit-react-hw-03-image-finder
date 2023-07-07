import { Component } from 'react';

import Loader from '../../shared/components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import { query } from '../../shared/api/pixabay';

import s from './imgFinder.module.css';

class ImgFinder extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    q: '',
    page: 1,
    totalPages: 1,
    isModalOpen: false,
    modalImg: {},
  };

  async componentDidUpdate(prevProp, prevState) {
    const { q, page } = this.state;

    if(this.state.page !== prevState.page || this.state.q!== prevState.q) {
      this.setState({ isLoading: true });
      const { totalHits, hits } = await query(q, page);

      try {
        this.setState(prevState=>({
          images: [...prevState.images, ...hits],
          totalPages: totalHits / 12,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setImages = ( q ) => {
    this.setState({
      q,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = modalImg => {
    this.setState({
      isModalOpen: true,
      modalImg,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      modalImg: {}
    });
  };

  render() {
    const {
      isLoading,
      error,
      images,
      totalPages,
      page,
      modalImg,
      isModalOpen,
    } = this.state;
    const { setImages, loadMore } = this;

    return (
      <>
        <Searchbar onSubmit={setImages} />
        {images.length > 0 && (
          <ImageGallery items={images} onClick={this.showModal} />
        )}
        {isLoading && <Loader />}
        {error && <p>Something went wrong: {error}</p>}
        {totalPages > page && !isLoading && images.length > 0 && (
          <Button text="Load More" onClick={loadMore} />
        )}
        {isModalOpen && (
          <Modal close={this.closeModal}>
            <img
              src={modalImg.largeImage}
              alt={modalImg.tags}
              className={s.image}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default ImgFinder;
