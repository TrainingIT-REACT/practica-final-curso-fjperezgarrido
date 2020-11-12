import React, { Component } from 'react';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <section className="Home">
        <article>
          <h2>Bienvenido a Reactify, tu reproductor de música favorito</h2>
          <p>Navega y descubre nuestros albums, artistas y canciones, disfruta y pásatelo bien.</p>
          <p>En breve dispondremos de buscador.</p>
        </article>
      </section>
    )
  }
}

export default Home;
