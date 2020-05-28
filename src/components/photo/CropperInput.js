import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default
 
 
 
class CropperInput extends Component {
 
  cropper= React.createRef()
  cropImage=()=>{
      if(typeof this.cropper.current.getCroppedCanvas()==='undefined'){
          return
      }
      this.cropper.current.getCroppedCanvas().toBlob(blob=>{
        this.props.setImage(blob)
      },'image/jpeg')
      console.log('running crop')
  }
 
  render() {
      const {imagePreview}=this.props
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{height: 200, width: '100%'}}
        // Cropper.js options
        preview='.img-preview'
        aspectRatio={1}
        viewMode={1}
        dragMode='move'
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}

        guides={false}
        crop={this.cropImage} />
    );
  }
}
export default CropperInput