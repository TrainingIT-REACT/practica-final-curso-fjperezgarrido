import React, { Component } from 'react';

// Css
import './App.css';

class AsideArtists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      artist: [],
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        artist: json
      }));
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  render() {
    return (
      <aside className="album-list">
        <h2>Album List:</h2>
        <hr/>
        { this.state.loading ?
          <p>Cargando...</p>
          : <ul>
            {this.state.artist.map(artist => <li key={artist.id}>{artist.artist}</li>)}
          </ul>
        }
      </aside>

    );
  }
}

export default AsideArtists;
