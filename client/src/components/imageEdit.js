//import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

class Edit extends PureComponent {
  state = {
    src: null,
    dataURL: '',
    crop: {
      aspect: 4/3,
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
    axios({
      method: 'post',
      url: '/api/v1/save',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        contentType: 'image/jpeg',
        dataURL: this.state.dataURL
      }
    })
    .then(response => {
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';

      this.setState({
        username: '',
        password: '',
        email: '',
        phone: ''
      });
      */
    })
    .catch((error) => {
      console.log(error);
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
    console.log(pixelCrop);
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
      /*this.setState({
        dataURL: canvas.toDataURL('image/jpeg', .3)
      });*/
    });
  }

  compress = (url) => {
    const newImage = new Image();
    const width = 512;
    const height = 384;
    const fileName = 'brandnew.jpeg';
    newImage.src = url;
    newImage.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = height;
      const newCtx = elem.getContext('2d');
      newCtx.drawImage(newImage, 0, 0, width, height);
      this.setState({
        dataURL: elem.toDataURL('image/jpeg', .9)
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
