import React, { Component } from 'react';
import Header from "../../components/Header";
import {NavLink} from "react-router-dom";
import SearchForm from "../../components/SearchForm";

class ApuntesContainer extends Component {
  render() {
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
        <section className="Apuntes">
          <article>
            <h3>Tareas Pendientes y log de avances.</h3>
            <p>
              Se consigue buscador basandonos en codigo de angel, pero el problema es que aún no entiendo del todo
              los conceptos, por ejemplo se tiene basecontainer y searchcontainer, pero es en el search container donde
              se realiza la busqueda y donde se imprimen los resultados, de esta forma el layout es muy forzado, no
              podría poner el buscador en el navigation y los resultados en otro componente, basicamente lo he
              conseguido extrapolando la linea de pensamiento, es tan sencillo como convertir tu search container en
              tu basecontainer, de ahí le dás el layout que quieras, pero tengo que aprender a usar mejor el store y
              el context api.

              Creo que si consigo dejar los resultados de la busqueda en los props del search container, ha de ser con
              el <b>context api</b> con el que puedo acceder a esos props desde el base container por ejemplo, tengo
              que investigarlo despues.
            </p>

            <p>Seria chulo hacer llamadas a api de youtube con 5 primeros resultados.
              (visto en la construcción del buscador)
              <b>he de descubrir como hacer más de una busqueda por consulta de forma limpia.</b>
            </p>
            <p>Seria chulo linkar resultado seleccionado con youtube-dl: (visto investigando, existe la libreria)</p>
            <blockquote>
              npm install youtube-dl
            </blockquote>
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
              musica pues se reproduce y punto, pero si se elige un resultado de youtube se pasa a la llamada a la
              libreria que ejecuta el youtube-dl y se espera a que tengamos la canción disponible y así el almacen crece,
              despues es solo tirar siempre de los resultados que ya vamos consiguiendo en el almacen para mostrar lo
              que ya se tiene, si no siempre tendrémos los cinco primeros resultados de youtube, poco más.
            </p>
            <p>
              También se pueden meter entradas en el json server haciendo peticiones post a la url base del json server y
              no me tengo ni que cambiar el codigo de como acceder a la info de la canciones, puedo seguir con este json
              server y no habría problema.
              recomiendo (npm install faker) para seguir haciendo pruebas).
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
            <p>
              Esto es imprescindible:
              <a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"
                 target="_blank"
                 rel="noopener noreferrer">
                Diagrama del ciclo de vida de metodos en React</a>
              <br/>(además multilanguage, mejor ejemplo imposible para futuras referencias) (no se ve en el curso ;)
            </p>

            <p>
              <h2 className="text-left">
                <strong>
                  Decir que es mi primera toma de contacto en el mundo de javascript y que todo el merito es del curso y
                  por ende vuestro, menos mal que tenemos los ide's que tenemos hoy en dia que nos ayudan un poco si cabe.
                  <br/>
                  Gracias a training it y a angel y enrique por vuestro tiempos y esfuerzos en toda la ayuda que nos habéis
                  dado este mes, gracias y un saludo, seguiré poniendome las pilas en esto, me va el cuello en ello, jejeje.
                </strong>
              </h2>
            </p>
          </article>
        </section>
      </>
    )
  }
}

export default ApuntesContainer;
