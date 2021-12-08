import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Acessar from './Acessar';
import CriarVinho from './CriarVinho';
import React from 'react';
import Logo from './Assets/logo.png';
import Grapes from './Assets/icons/grapes.png';
import Barril from './Assets/icons/barril-de-cerveja.png';
import World from './Assets/icons/world.png';
import WineBottle from './Assets/icons/wine-bottles.png';
import Wine1 from './Assets/icons/wine.png';
import Wine2 from './Assets/icons/wine-2.png';
import Wine3 from './Assets/icons/wine-3.png';
import Termometro from './Assets/icons/termometro.png';
import Time from './Assets/icons/time.png';
import Field from './Assets/icons/field.png';

function animeScroll() {
    const target = document.querySelectorAll('[data-anime]');
    const animationClass = 'animate';
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 3);
    target.forEach(element => {
        if (windowTop > element.offsetTop) {
            element.classList.add(animationClass);
        } else if(element.classList.contains(animationClass)) {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

window.addEventListener('scroll', animeScroll);

function App() {
  const [error, setError] = React.useState(false);

  if (error) {
    document.body.classList.remove('loading');
    return (
      <h1 className='error'>Erro! Nenhum vinho encontrado</h1>
    )
  }

  function GetWine() {
    let { id } = useParams();
    const [wine, setWine] = React.useState([]);
    const [fetchEnd, setFetchEnd] = React.useState(false);

    if (!fetchEnd) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    async function getID() {
      try {
        setFetchEnd(false);
        setError(false);
        const response = await fetch(`https://formulabor.com.br/lebonvin-api/json/api/wine/${id}`);
        const resolve = await response.json();
        if (!response.ok) throw new Error;
        setWine(resolve);
      } catch (err) {
        setError(true);
      } finally {
        setFetchEnd(true);
      }
    }

    React.useEffect(() => {
      getID();
    }, [])

    return (
    <main className={'main'} style={fetchEnd ? {display: 'block'} : {display: 'none'}}>
      <img className='logo' src={Logo}></img>
      <div className='banner'></div>
      <section className='wine-main'>
        <div className='wine-img animate' data-anime='left'>
          <img src={fetchEnd && wine.photo.src}></img>
        </div>
        <div className='wine-content animate' data-anime='right'>
          <h1>{fetchEnd && wine.photo.title}</h1>
          <ul>
            <li>Cód {fetchEnd && wine.photo.codigo}</li>
            <li>{fetchEnd && wine.photo.ano}</li>
            <li>{fetchEnd && wine.photo.quantidade}</li>
            <li>{fetchEnd && wine.photo.tipo}</li>
            <li>{fetchEnd && wine.photo.pais}</li>
          </ul>
          <p>
          {fetchEnd && wine.photo.descricao}
          </p>
        </div>
        </section>
        <section className='wine-data'>
          <h2>Ficha Técnica</h2>
          <ul>
            <li data-anime='left'>
              <div className='data-img'>
                <img src={Grapes}></img>
              </div>
              <div className='data-content'>
                <h3>Uva</h3>
                <p>{fetchEnd && wine.photo.uva}</p>
              </div>
            </li>
            <li data-anime='right'>
              <div className='data-img'>
                <img src={Barril}></img>
              </div>
              <div className='data-content'>
                <h3>Amadurecimento</h3>
                <p>{fetchEnd && wine.photo.amadurecimento}</p>
              </div>
            </li>
            <li data-anime='left'>
              <div className='data-img'>
                <img src={World}></img>
              </div>
              <div className='data-content'>
                <h3>País - Região</h3>
                <p>{fetchEnd && wine.photo.regiao}</p>
              </div>
            </li>
            <li data-anime='right'>
              <div className='data-img'>
                <img src={Wine2}></img>
              </div>
              <div className='data-content'>
                <h3>Classificacão</h3>
                <p>{fetchEnd && wine.photo.classificacao}</p>
              </div>
            </li>
            <li data-anime='left'>
              <div className='data-img'>
                <img src={Wine1}></img>
              </div>
              <div className='data-content'>
                <h3>Teor Alcoólico</h3>
                <p>{fetchEnd && wine.photo.teor}</p>
              </div>
            </li>
            <li data-anime='right'>
              <div className='data-img'>
                <img src={WineBottle}></img>
              </div>
              <div className='data-content'>
                <h3>Potencial de guarda</h3>
                <p>{fetchEnd && wine.photo.potencial}</p>
              </div>
            </li>
            <li data-anime='left'>
              <div className='data-img'>
                <img src={Termometro}></img>
              </div>
              <div className='data-content'>
                <h3>Temperatura de serviço</h3>
                <p>{fetchEnd && wine.photo.temperatura}</p>
              </div>
            </li>
            <li data-anime='right'>
              <div className='data-img'>
                <img src={Time}></img>
              </div>
              <div className='data-content'>
                <h3>Safra</h3>
                <p>{fetchEnd && wine.photo.safra}</p>
              </div>
            </li>
            <li data-anime='left'>
              <div className='data-img'>
                <img src={Wine3}></img>
              </div>
              <div className='data-content'>
                <h3>Decantação</h3>
                <p>{fetchEnd && wine.photo.decantacao}</p>
              </div>
            </li>
            <li data-anime='right'>
              <div className='data-img'>
                <img src={Field}></img>
              </div>
              <div className='data-content'>
                <h3>Vinícola</h3>
                <p>{fetchEnd && wine.photo.vinicola}</p>
              </div>
            </li>
          </ul>
        </section>
    </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='acessar' element={<Acessar />}></Route>
        <Route path='criar-vinho' element={<CriarVinho />}></Route>
        <Route path="/vinho/:id">
          <GetWine />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
