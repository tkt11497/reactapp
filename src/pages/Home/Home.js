import React from 'react'
import {Segment, Container,Header, Image,Button,Icon} from 'semantic-ui-react'
export const Home = (props) => {
    return (
           <Segment inverted textAlign='center' vertical className='masthead'>
           <Container text>
             <Header as='h1' inverted>
               <Image
                 size='massive'
                 src='/logo512.png'
                 alt='logo'
                 style={{ marginBottom: 12 }}
               />
               Prototype v0.1beta
             </Header>
             <Button size='huge' inverted onClick={()=>props.history.push('/eventdashboard')}>
               Get started
               <Icon name='right arrow' inverted />
             </Button>
           </Container>
         </Segment>
    )
}
export default Home