import React ,{Fragment}from 'react'
import {Header,Card,Image,Button } from 'semantic-ui-react'
 const UserPhotos = ({profile,photos,deletePhoto,setMain,loading}) => {
     let filteredPhotos;
     if(photos){
         filteredPhotos=photos.filter(photo=>photo.url!==profile.photoURL)
     }
    return (
        <Fragment>
            <Header sub color='teal' content='All Photos'/>

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={profile.photoURL||'/assets/user.png'}/>
                    <Button positive>Main Photo</Button>
                </Card>
            {filteredPhotos&&filteredPhotos.map(photo=>(
                <Card key={photo.id}>
                <Image
                    src={photo.url}
                />
                <div className='ui two buttons'>
                    <Button basic loading={loading} color='green' onClick={()=>setMain(photo)}>Main</Button>
                    <Button basic icon='trash' color='red' onClick={()=>deletePhoto(photo)} />
                </div>
            </Card>
            ))}
                    
            </Card.Group>
        </Fragment>
    )
}
export default UserPhotos