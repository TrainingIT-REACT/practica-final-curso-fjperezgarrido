import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './AlbumContainer.css';
import {Link} from "react-router-dom";

import Header from "../../components/Header";
// import DetailsAlbum from "../../components/DetailsAlbum";


class AlbumContainer extends Component {
  state = {
    albums: []
  }

  componentDidMount() {
    fetch('/albums')
      .then(res => res.json())
      .then(albums => {
        this.setState({albums})
      })
  }

  render() {
    const {albums} = this.state;
    return (
      <>
        <Header/>
        <Router>
          <aside className="album-list">
            <h2>Album List:</h2>
            <hr/>
            { this.state.loading ?
              <p>Cargando...</p>
              :
              <ul>
                {this.state.albums.map(albums =>
                  <li key={albums.id}>
                    <Link to={`/albums-list/${albums.id}`}>
                      {albums.name}
                    </Link>
                  </li>
                )}
              </ul>
            }
          </aside>
          <section className="album-details">
            {/*<Route path="/albums-list/:id" component={DetailsAlbum}/>*/}
            {albums && (
              <Route path="/albums-list/:id" render={({ match }) => (
                //Por algun motivo he tenido que poner un eval para que match me funcione,
                // en video demo de react router dom no es necesario no se el motivo
                <DetailsAlbum album={albums.find(g => g.id === eval(match.params.id) )} />
              )}/>
            )}
          </section>
        </Router>
      </>
    );
  }
}

const DetailsAlbum = ({ album }) => {
  const [Album, setAlbum] =useState(album)

  useEffect(() => {

    fetch('/songs')
      .then(res => res.json())
      .then(res => res.filter(g => g.album_id === album.id))
      .then(songs => {
        setAlbum({...Album,songs})
      })

  },[]);


  return (
    <article className="article-album">
      <img src={Album.cover} alt={Album.name}/>
      <h1>{Album.name}</h1>
      <h2>{Album.artist}</h2>
      {
        <ul>
          {
            Album.songs &&
            Album.songs.map(song =>
              <li key={song.id}>{song.name} {song.seconds}</li>
            )
          }

        </ul>
      }

    </article>
  )
}



export default AlbumContainer;
