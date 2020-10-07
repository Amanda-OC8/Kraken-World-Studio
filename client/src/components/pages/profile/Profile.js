import React from 'react'


import Container from 'react-bootstrap/Container'



const Profile = props => {

    return (
        <Container>
            <h1>Soy el perfil de  {props.theUser.username}</h1>
        </Container>
    )
}

export default Profile