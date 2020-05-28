import React, {useState,useEffect,Fragment} from 'react';
import {connect}from 'react-redux'
import {toastr}from 'react-redux-toastr'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Image, Segment, Header, Divider, Grid, Button} from 'semantic-ui-react';
import Dropzone from '../../../components/photo/Photo_Dropzone'
import CropperInput from '../../../components/photo/CropperInput'
import {uploadPhoto,deletePhoto,setMainphoto} from '../../../store/actions/index'
import AsyncHoc from '../../../components/HOC/AsyncHoc'
import UserPhotos from '../../../components/photo/userPhotos'
const MyPhoto =(props) => {
        const [files,setfiles]=useState([])
        const [image,setImage]=useState(null)
        useEffect(()=>{
            return ()=>files.forEach(file=>URL.revokeObjectURL(file.preview))
        },[files])

        const handleupload=async ()=>{
            try{
            await props.uploadPhoto(image,files[0].name)
            handleCancelCrop()
            toastr.success('Success','Photo has been uploaded')
            }catch(error){
                console.log(error)
                toastr.error('Opps','Something went wrong in uploading photo')
            }
        }
        const handleCancelCrop=()=>{
            setfiles([])
            setImage(null)
        }
        const handleDeletePhoto= async (photo)=>{
            try{
                await props.deletePhoto(photo)
                toastr.success('Success','Your Photo has been deleted')
            }catch(error){
                toastr.error('Opps',error.message)
            }
        }
        const handleSetMainphoto= async (photo)=>{
            try{
                await props.setMainphoto(photo)
            }catch(error){
                toastr.error('oops',error.message)
            }
        }
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <Dropzone setfiles={setfiles}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {files.length>0&&<CropperInput setImage={setImage} imagePreview={files[0].preview}/>}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview & Upload' />
                        {files.length>0&&
                        <Fragment>
                        <div className='img-preview' style={{height:'200px',width:'200px',overflow:'hidden'}}>
                        </div>
                        <Button.Group>
                            <Button onClick={handleupload} style={{width:'100px'}} positive icon='check'></Button>
                            <Button onClick={handleCancelCrop} style={{width:'100px'}}  icon='cancel'></Button>
                        </Button.Group>
                        </Fragment>
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <UserPhotos profile={props.profile} photos={props.photos} 
                deletePhoto={handleDeletePhoto} 
                setMain={handleSetMainphoto} 
                loading={props.loading}/>
            </Segment>
        );
    }
const mapStateToProps=(state)=>{
    return {
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        photos:state.firestore.ordered.photos,
        loading:state.async.isLoading
    }
}

const mapDispatchToProps={
    uploadPhoto,
    deletePhoto,
    setMainphoto
}
const query=({auth})=>{
    console.log(auth,'sdasd')
    return [
        {
            collection:'users',
            doc: auth.uid,// this thing is null after reload, 
            subcollections:[{collection:'photos'}],
            storeAs:'photos'
        }
    ]
}
export default compose(
    AsyncHoc,
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(auth=>query(auth)),
    
                )(MyPhoto);