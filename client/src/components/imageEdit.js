import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

class Edit extends PureComponent {
  state = {
    src: null,
    dataURL: '',
    crop: {
      /*aspect: 4/3,*/
      aspect: this.props.aspectRatio,
      x: 0,
      y: 0,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result }),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  savePic = (e) => {
    e.preventDefault();
    const input = document.querySelector('.App').childNodes[0].childNodes[0];
    const nameArr = input.value.split('\\');
    const fileName = nameArr.pop();
    this.props.updateState({
      image: {
        name: fileName,
        contentType: input.files[0].type,
        data: this.state.dataURL
      }
    });
  }

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');

      this.compress(canvas.toDataURL('image/jpeg'));
    });
  }

  compress = (url) => {
    const newImage = new Image();
    /*const width = 512;
    const height = 384;*/
    const width = this.props.width;
    const height = this.props.height;
    const fileName = 'brandnew.jpeg';
    newImage.src = url;
    newImage.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = height;
      const newCtx = elem.getContext('2d');
      newCtx.drawImage(newImage, 0, 0, width, height);
      this.setState({
        dataURL: elem.toDataURL('image/jpeg', this.props.quality)
      });
    }
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="App">
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )}
        {croppedImageUrl && (
          <button onClick={this.savePic}>Save</button>
        )}
      </div>
    );
  }
}

export default Edit;
