import React from 'react'

import Container from 'react-bootstrap/Container'


const Footer = () => {

    return (

        <div className="footer-copyright text-center py-3">
            <Container fluid>
                &copy; {new Date().getFullYear()} Copyright: Kraken Wordls Studio 
            </Container>
        </div>
    )
}

export default Footer