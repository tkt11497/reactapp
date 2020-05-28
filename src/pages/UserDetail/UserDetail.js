import React, {useEffect} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment,Modal,Tab} from "semantic-ui-react";
import {useFirestoreConnect,isEmpty} from 'react-redux-firebase'
import {connect} from 'react-redux'
import differenceInYears from 'date-fns/differenceInYears'
import {format} from 'date-fns'
import Spinner from '../../components/Spinner/Spinner'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload'
import {getUserEvents} from '../../store/actions/index'


const UserDetail = (props) =>{
    const{profile,profilePhotos,isProfileLoading,currentUserId,events,eventsLoading}=props
    useFirestoreConnect([{collection:'users',doc:props.match.params.id,storeAs:'profile' },{
        collection:'users',
        doc: props.match.params.id, 
        subcollections:[{collection:'photos'}],
        storeAs:'profilePhotos'
    }])
    useEffect(() => {
        let fetchData=async()=>{
             await props.getUserEvents(props.match.params.id)

        }
        fetchData()
      },[])
    const panes=[
        {menuItem:'All Events',pane:{key:'allevents'}},
        {menuItem:'Past Events',pane:{key:'pastevents'}},
        {menuItem:'Future Events',pane:{key:'futureevents'}},
        {menuItem:'Hosted Events',pane:{key:'hosted'}}
    ]// for semantic ui tab

    const changeTab=(e,data)=>{
        props.getUserEvents(props.match.params.id,data.activeIndex)
    }
    

    if(!isProfileLoading&&profile){
        const isCureentUSer=props.match.params.id==currentUserId
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                            <LazyLoad height={150} placeholder={<Item.Image avatar size='small' src={'/assets/user.png'}/>}>
                                <Item.Image avatar size='small' src={profile.photoURL?profile.photoURL:'/assets/user.png'}/>
                                </LazyLoad>
                                <Item.Content verticalAlign='bottom'>
                                <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
                                <Header as='h3'>{profile.occupation?profile.occupation:''}</Header>
                                    <br/>
                                <Header as='h3'>{ profile.dateOfBirth?differenceInYears(Date.now(), profile.dateOfBirth.toDate()):"User haven't specify age"},
                                {profile.city?profile.city:"User haven't specify current city"}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content={`About ${profile.displayName}`}/>
                                <p>I am a: <strong>{profile.occupation?profile.occupation:"User haven't specify yet"}</strong></p>
                                <p>Originally from <strong>{profile.origin?profile.origin:"User haven't specify yet"}</strong></p>
                                <p>Member Since: <strong>{format(profile.createdAt.toDate(),'do LLLL yyyy')}</strong></p>
                                {profile.dateOfBirth&&<p>Date of Birth: <strong>{format(profile.dateOfBirth.toDate(),'do LLLL yyyy')}</strong></p>}
                                {profile.about&&<p>{profile.about}</p>}

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                {
                                    profile.interests?profile.interests.map((interest,index)=>(
                                        <Item key={index}>
                                        <Icon name='heart'/>
                                    <Item.Content>{interest}</Item.Content>
                                    </Item>
                                    )):<p>No Interest</p>
                                }
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        {isCureentUSer?<Button color='teal' fluid basic content='Edit Profile' as={Link} to='/settingdashboard'/>:
                         <Button color='teal' fluid basic content='Follow User' />
                        }
                       
                       
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        {profilePhotos&&

                        
                        <Image.Group size='small'>
                            
                            {profilePhotos.map(photo=>(
                                <LazyLoad key={photo.id} height={150} offset={-100} placeholder={<Image src={'/assets/user.png'}/>}>
                                <Image src={photo.url}/>
                                </LazyLoad>
                            ))}
                        </Image.Group>
                        
                        
                            }
                        
                        
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached loading={eventsLoading}> 
                        <Header icon='calendar' content='Events'/>
                        <Tab onTabChange={(e,data)=>changeTab(e,data)} panes={panes} menu={{secondary:true,pointing:true}}/>
                            <br/>
                        <Card.Group itemsPerRow={5}>
                            {events&&events.map(event=>(

                                    <Card as={Link} to={`/eventdetail/${event.id}`} key={event.id}>
                                    <Image src={`/assets/categoryImages/${event.category}.jpg`}/>
                                    <Card.Content>
                                        <Card.Header textAlign='center'>
                                            {event.title}
                                        </Card.Header>
                                        <Card.Meta textAlign='center'>
                                            <div>{format(event.date&&event.date.toDate(),'dd LLL yyyy')}</div>
                                            <div>{format(event.date&&event.date.toDate(),'h:mm a')}</div>
                                        </Card.Meta>
                                    </Card.Content>
                                    </Card>

                            ))}
                           


                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
    else{
        return (<Modal
        size='large'
        open={true} 
        basic
    >
       
                <Spinner />
           
       
    </Modal>)
    }
    }

const mapStateToProps=(state,ownProps)=>{
    return {
        profile:state.firestore.ordered.profile&&state.firestore.ordered.profile[0],
        profilePhotos:state.firestore.ordered.profilePhotos&&state.firestore.ordered.profilePhotos,
        isProfileLoading:state.firestore.status.requesting['profile'],
        currentUserId:state.firebase.auth.uid,
        events:state.events,
        eventsLoading:state.async.isLoading
    }
}
const mapDispatchToProps={
    getUserEvents
}

//export default connect()(firestoreConnect([{collection:'users',doc:this.props.match.params.id}])( UserDetail));
export default connect(mapStateToProps,mapDispatchToProps)(UserDetail)