import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Css
import './AsideAlbums.css';

class AsideAlbums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: [],
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: json
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
          :
            <ul>
              {this.state.albums.map(albums =>
                <li key={albums.id}>
                  <Link to={`/album/${albums.id}`}>
                    {albums.name}
                  </Link>
                </li>
              )}
            </ul>
        }
      </aside>
    );
  }
}

export default AsideAlbums;
