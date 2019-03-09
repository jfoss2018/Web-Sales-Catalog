import React, { Component } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

class MyComponent extends Component {
  render() {

    const images = this.props.images;

    return (
      <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
    );
  }
}

export default MyComponent;
