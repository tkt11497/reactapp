import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Icon,Header} from 'semantic-ui-react'

const  MyDropzone=({setfiles}) =>{
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setfiles(acceptedFiles.map(file=>Object.assign(file,{
      preview: URL.createObjectURL(file)
    })))
  }, [setfiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple:false,
    accept:'image/*'
      })

  return (
    <div {...getRootProps()} className={'dropzone '+(isDragActive&& 'dropzone--isActive')}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge'/>
      <Header content='Click or Drop Images here'/>
    </div>
  )
}
export default MyDropzone