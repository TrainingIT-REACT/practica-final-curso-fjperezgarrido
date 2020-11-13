import React, {Component, useLayoutEffect, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './AlbumContainer.css';
import {Link} from "react-router-dom";

import Header from "../../components/Header";
import Player from "../../components/Reproducer";



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
            { this.state.loading ?
              <p>Cargando...</p>
              :
              <ul>
                <caption>Albums</caption>
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

  const [Album, setAlbum] = useState(album)

  useLayoutEffect(() => {
      fetch('/songs')
        .then(res => res.json())
        .then(res => res.filter(g => g.album_id === album.id))
        .then(songs => {
          setAlbum({...Album,songs})
        })

  },[album]);

  return (
    <article className="article-album">
      <img src={album.cover} alt={album.name}/>
      <h1>{album.name}</h1>
      <h2>{album.artist}</h2>
      {
        <ul>
          {
            Album.songs &&
            Album.songs.map(song =>
              <li key={song.id}>
                <span>
                  {song.name}
                </span>
                <span>

                <Player path={song.audio}/>
                </span>
              </li>
            )
          }
        </ul>
      }
    </article>
  )
}

export default AlbumContainer;
