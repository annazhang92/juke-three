import React, { Component } from 'react';
import FilterInput from '../components/FilterInput'
import AllArtists from '../components/AllArtists'
import axios from 'axios';

export default class FilterableArtistsContainer extends Component{
  constructor () {
    super();
    this.state = {
      inputValue: '',
      artists:[]
    }
    this.handleChange =this.handleChange.bind(this);
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  handleChange (evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value
    });
  }

  
  render (){
    const inputValue = this.state.inputValue.toLowerCase();
    const filteredArtists = this.state.artists.filter((artist) =>{
      var nameLowerCase = artist.name.toLowerCase();
      return nameLowerCase.match(inputValue);
    })
 


    return (
      <div>
        <FilterInput handleChange={this.handleChange} />
        <AllArtists artists={filteredArtists} />
      </div>
    );
  }
}



