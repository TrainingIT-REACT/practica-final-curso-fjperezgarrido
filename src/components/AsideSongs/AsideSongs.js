import React, { Component } from 'react';

// Css
import './App.css';

class AsideSongs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      songs: [],
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('/songs');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: json
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
            {this.state.songs.map(songs => <li key={songs.id}>{songs.name}</li>)}
          </ul>
        }
      </aside>

    );
  }
}

export default AsideSongs;
