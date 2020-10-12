import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: this.props.search
        }
    }


    handleInputChange = e => {
        e.preventDefault()
        let newSearch = e.target.value
        this.props.filterProjects(newSearch)

    }
    render() {

        return (
            <Form >
                <Form.Group>                    
                   <input type="text" name="search" value={this.state.search} onChange={this.handleInputChange} />
                </Form.Group>
            </Form>
        )
    }

}

export default SearchBar;
