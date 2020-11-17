import React, { Component } from 'react';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <section className="Home">
          <h2 className="text-center">Bienvenido a Reactify, tu reproductor de música favorito</h2>
          <h5 className="text-center">Navega y descubre nuestros albums, artistas y canciones, disfruta de la música y pásatelo bien.</h5>

        <article>
          <h3>Tareas Pendientes</h3>
          <p>En breve dispondremos de un buscador.</p>
          <p>Seria chulo hacer llamadas a api de youtube con 5 primeros resultados</p>
          <p>Seria chulo linkar resultado seleccionado con youtube-dl:</p>
          <blockquote>
            youtube-dl -i -x --audio-format mp3
            --prefer-ffmpeg
            --no-playlist (solo canciones individuales por resultado, no playlist)
            --write-thumbnail (imagen para caratula)
            --write-info-json (si se quiere traerse info de la cancion y ponerla en el reproductor)
            --output TEMPLATE (habrá que currarse una buena template para el naming de las canciones)
          </blockquote>

          <p>
            La idea sería buscar primero en el directorio donde se almacenan las canciones con sus metadatos y
            proporcionar los cinco primeros resultados de youtube, si se escoge una cancion del directorio propio de
            musica pues se reproduce y punto, pero si se elige un resultado de youtube se pasa al script que ejecuta
            el youtube-dl y se espera a que tengamos la canción disponible y así el almacen crece, despues es solo
            tirar siempre de los resultados que ya vamos consiguiendo en el almacen para mostrar lo que ya se tiene,
            si no siempre tendrémos los cinco primeros resultados de youtube (quien dice cinco dice...), poco más.
          </p>
          <p>SADDD:(    he descubierto que hay muchos proyectos igualitos a este, jejejeje, no me lo esperaba. </p>
        </article>
        <article>
          <h3>Aprendido</h3>
          <p>
            He aprovechado y lo estoy maquetando todo con flex, que me imagino que tengo que familiarizarme con el
            si voy a empezar a meter react-bootstrap o algo así, de igual modo aprender.
          </p>
          <p>
            Estoy cambiando entre componentes de clases y componentes funcionales para familiarizarme con los hooks
          </p>
          <p>La familiarización con redux y store y providers y actions y reducers y middlewares, cuesta mucho, paciencia</p>
          <p>Integraré con precommit si me dá tiempo, sorry</p>
          <p>Esto es imprescindible: <a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" rel="noopener noreferrer">Diagrama del ciclo de vida de metodos en React</a> (además multilanguage)</p>
        </article>
      </section>
    )
  }
}

export default Home;
