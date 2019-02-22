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

  savePic = () => {
    const input = document.querySelector('.App').childNodes[0].childNodes[0];
    const nameArr = input.value.split('\\');
    const fileName = nameArr.pop();
    this.props.updateState({
      nameNew: fileName,
      contentTypeNew: input.files[0].type,
      dataNew: this.state.dataURL
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
/*
  changeGrid = () => {
    const fileInput = document.querySelector('#newImage');
    if (this.props.btn === 'add') {
      const formGrid = document.querySelector('.form-grid');
      if (fileInput.value !== null) {
        formGrid.classList.add('col-3');
      } else {
        formGrid.classList.remove('col-3');
      }
    }
  }
*/
  compress = (url) => {
    const newImage = new Image();
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
      this.savePic();
    }
  }

  clear = (e) => {
    this.props.pushList();
    const fileInput = document.querySelector('#newImage');
    fileInput.value = null;
    const formGrid = document.querySelector('.form-grid');
    formGrid.classList.remove('col-4');
    formGrid.classList.remove('col-3');
    this.props.closeModal(e);
    this.setState({
      src: null,
      croppedImageUrl: null
    })
  }

  render(props) {
    const { crop, croppedImageUrl, src } = this.state;
    const formGrid = document.querySelector('.form-grid');
    let addBtn = false;
    if (src && this.props.btn === 'add') {
      formGrid.classList.add('col-3');
    }
    if (croppedImageUrl && this.props.btn === 'add') {
      addBtn = true;
    }
    if (src && croppedImageUrl && this.props.btn === 'add') {
      formGrid.classList.add('col-4');
    }

    return (
      <div className="App">
        <div>
          <input type="file" className="login-form-control" id="newImage" name="newImage" onChange={this.onSelectFile} />
        </div>
        {src && (
          <h4 className="page-image-header">Select Image and Crop</h4>
        )}
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            className={'login-form-control'}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <h4 className="page-image-header">Preview Selection</h4>
        )}
        {croppedImageUrl && (
          <img className="login-form-control" alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )}
        {addBtn && (
          <button type="button" className="img-save-btn" onClick={this.clear}>Save Image to List</button>
        )}
      </div>
    );
  }
}

export default Edit;
