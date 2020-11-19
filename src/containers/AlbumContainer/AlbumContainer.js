import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Header from "../../components/Header";
import Player from "../../components/Reproducer";
import SearchForm from "../../components/SearchForm";


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
        <nav className="Navigation">
          <NavLink exact to="/" className="Link" activeClassName="Link--active">Home</NavLink>
          <NavLink exact to="/albums-list" className="Link" activeClassName="Link--active">Albums</NavLink>
          <NavLink exact to="/artist-list" className="Link" activeClassName="Link--active">Artists</NavLink>
          <NavLink exact to="/songs-list" className="Link" activeClassName="Link--active">Songs</NavLink>
          <NavLink exact to="/apuntes" className="Link" activeClassName="Link--active">Apuntes</NavLink>
        </nav>
        <Router>
          <aside className="album-list">
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
            {
              albums && albums.length !== 0 && (
                <Route path="/albums-list/:id" render={({ match }) => (
                  <DetailsAlbum album={albums.find(g => g.id === eval(match.params.id) )} />
                )}/>
              )
            }
          </section>
        </Router>
      </>
    );
  }
}

const DetailsAlbum = ({ album }) => {

  const [Album, setAlbum] = useState(album)
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    fetch('/songs')
      .then(res => res.json())
      .then(res => res.filter(g => g.album_id === album.id))
      .then(songs => {
        setAlbum({...Album,songs})
        setLoading(false)
      })

  },[album]);

  return (
    <article className="article-album">
      { loading ?
        <p>Cargando ...</p>
        :
        <>
          <img src={album.cover} alt={album.name}/>
          <h1>{album.name}</h1>
          <h2>{album.artist}</h2>
          <ul>
            {
              Album.songs &&
              Album.songs.map(song =>
                <li key={song.id}>
                  <span>
                    {song.name}
                  </span>
                  <span className="album-player">
                    <Player path={song.audio}/>
                  </span>
                </li>
              )
            }
          </ul>
        </>
      }
    </article>
  )
}

export default AlbumContainer;
