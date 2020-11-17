import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import '../../css/general_styles.css';

import Header from "../../components/Header";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

// Ejemplos de uso del player de audio
// import Player from "../../components/Reproducer";

// const Player = () => (
//   <AudioPlayer
//     autoPlay
//     src="http://example.com/audio.mp3"
//     onPlay={e => console.log("onPlay")}
//     // other props here
//   />
// );


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
                  <li className="text-left" key={song.id}>
                    <Link to={`/songs-list/${song.id}`}>
                      {song.name}
                    </Link>
                    <span className="text-right">
                      <ToTimeString seconds={song.seconds} />
                    </span>
                  </li>
                )}
              </ul>
            }
          </aside>
          <section className="songs-details">
              <Route path="/songs-list/:songid" render={({ match }) => (
                <SongDetails song={eval(match.params.songid)} />
              )}/>

          </section>
        </Router>
      </>
    );
  }
}


const ToTimeString = ({seconds}) => {
  return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}

const SongDetails = ({ song }) => {

  const [Song,setSong] = useState(null)
  // const [Album,setAlbum] = useState(null)

  useEffect( () => {
    fetch('/songs')
      .then(res => res.json())
      .then(res => res.find(g => g.id === song))
      .then(song => {
        setSong(song)
      })
  },[song]);

  return (
    <>
      <article className="song-details">
        { Song &&
        <>
          <p key={Song.id}>
            <span>{Song.name}</span>
          </p>
          <AudioPlayer

            autoPlay={false}
            src={Song.audio}
            onPlay={e => console.log("onPlay")}
          />

          <p>Resta meter el toggle del portal aqui</p>
        </>
        }
      </article>
    </>
  )
}

export default SongsContainer;
