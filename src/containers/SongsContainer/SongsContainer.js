import React, {Component, useLayoutEffect, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './SongsContainer.css';
import {Link} from "react-router-dom";

import Header from "../../components/Header";
// import DetailsAlbum from "../../components/DetailsAlbum";
import Player from "../../components/Reproducer";

class SongsContainer extends Component {
  state = {
    albums: [],
    songs: [],
    loading: true,
  }

  componentDidMount() {
    fetch('/songs')
      .then(res => res.json())
      .then(songs => {
        this.setState({songs: songs, loading: false})
      })
  }

  render() {
    const {state} = this.state;
    return (
      <>
        <Header/>
        <Router>
          <aside className="album-list">
            { this.state.loading ?
              <p>Cargando...</p>
              :
              <ul>
                {this.state.songs.map(song =>
                  <li key={song.id}>
                    <Link to={`/songs-list/${song.id}`}>
                      {song.name}
                    </Link>
                  </li>
                )}
              </ul>
            }
          </aside>
          <section className="songs-details">

              <Route path="/songs-list/:id" render={({ match }) => (
                //Por algun motivo he tenido que poner un eval para que match me funcione,
                // en video demo de react router dom no es necesario no se el motivo
                <SongDetails song_id={eval(match.params.id)} />
              )}/>

          </section>
        </Router>
      </>
    );
  }
}

const SongDetails = ({ song_id }) => {

  const [Song,setSong] = useState(null)
  const [Album,setAlbum] = useState(null)

  useLayoutEffect( () => {
    fetch('/songs')
      .then(res => res.json())
      .then(res => res.find(g => g.id === song_id))
      .then(song => {
        setSong(song)
      })
  },[song_id]);

  return (
    <>
      <article className="song-details">
        <ul>
          { Song &&
          <li key={Song.id}>
            <span>{Song.name}</span>
            <span>
              <Player path={Song.audio}/>
            </span>

          </li>

          }
        </ul>
      </article>
    </>
  )
}

export default SongsContainer;
