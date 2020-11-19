import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";


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
        <nav className="Navigation">
          <NavLink exact to="/" className="Link" activeClassName="Link--active">Home</NavLink>
          <NavLink exact to="/albums-list" className="Link" activeClassName="Link--active">Albums</NavLink>
          <NavLink exact to="/artist-list" className="Link" activeClassName="Link--active">Artists</NavLink>
          <NavLink exact to="/songs-list" className="Link" activeClassName="Link--active">Songs</NavLink>
          <NavLink exact to="/apuntes" className="Link" activeClassName="Link--active">Apuntes</NavLink>
        </nav>
        <Router>
          <aside className="artist-list">
            { this.state.loading ?
              <p>Cargando...</p>
              :
              <ul>
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
                <Route path="/artist-list/:artist" render={({ match }) => (
                  <ArtistDetails artist={match.params.artist} />
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
