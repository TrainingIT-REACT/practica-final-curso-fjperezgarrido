import React, {Component, useLayoutEffect, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

import '../css/general_styles.css'

import Header from "../../components/Header";


class ArtistContainer extends Component {
  state = {
    albums: [],
    artist: [],
    loading: true
  }

  componentDidMount() {
    fetch('/albums')
      .then(res => res.json())
      .then(albums => {
        const artist = new Set(albums.map(album => album.artist))
        this.setState({albums: albums, artist: Array.from(artist), loading: false})
      })
  }

  render() {
    const {artist} = this.state;
    return (
      <>
        <Header/>
        <Router>
          <aside className="artist-list">
            { this.state.loading ?
              <p>Cargando...</p>
              :
              <ul>
                <caption>Artists</caption>
                {
                  this.state.artist.map((artist,index) =>
                    <li key={index}>
                      <Link to={`/artist-list/${artist}`}>{artist}</Link>
                    </li>
                  )
                }
              </ul>
            }
          </aside>
          <section className="artist-details">
            {
              artist && (
                <Route path="/artist-list/:id" render={({ match }) => (
                  <ArtistDetails artist={match.params.id} />
                )
                }
                />
              )
            }
          </section>
        </Router>
      </>
    );
  }
}

const ArtistDetails = ({ artist }) => {

  const [Album, setAlbum] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/albums')
      .then(res => res.json())
      .then(res => res.filter(g => g.artist === artist))
      .then(albums => {
        setAlbum(albums)
        setLoading(false)
      })

  },[artist]);

  return (
    <>
      { loading ?
        <p>Cargando...</p>
        :
        <>
          {
            Album &&
            Album.map(album =>
              <article className="article-artist">
                <img src={album.cover} alt={album.name}/>
                <h1>{album.name}</h1>
                <h2>{artist}</h2>
              </article>
            )
          }
        </>
      }
    </>
  );
}


export default ArtistContainer;
