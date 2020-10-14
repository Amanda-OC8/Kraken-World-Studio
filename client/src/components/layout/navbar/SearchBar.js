import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBInput } from "mdbreact"

class SearchBar extends Component {

    handleSearch = e => {

        this.props.searchProjects(e.target.value)

    }

    render() {

        return (
            <>

                <MDBCol md="6">
                    <div className="active-pink-3 active-pink-4 mb-4">
                        < input className="form-control my-0 py-1 form-control form-control-sm ml-3 w-75" type="text" placeholder='Buscador' onChange={this.handleSearch} />
                    </div>
                </MDBCol>

                < input className="input searcher" type="text" placeholder='Buscador' onChange={this.handleSearch} />
            </>

        )
    }

}

export default SearchBar;

