import React from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import axios from 'axios';

class GalleryPage extends React.Component {
state = {
  query: '',
  images: '',
  page: 1
}

async componentDidUpdate(prevProps, prevState, snapshot) {
  const images = await axios.get('https://pixabay.com/api/', {
    params: {
      key: "36646585-26402b3ebc9d7faa9c1077b57",
      q: this.state.query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: this.state.page,
    }
  })
}

  onSubmit(query) {
    this.setState({q: query});
  };

  render() {
    return (
      <Searchbar onSubmit={this.onSubmit}/>
    )
  }
}

export default GalleryPage;
