import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Acessar from './Acessar';
import CriarVinho from './CriarVinho';
import React from 'react';
import Logo from './Assets/logo.png';

function App() {

  function GetWine() {
    let { id } = useParams();
    const [wine, setWine] = React.useState([]);
    const [fetchEnd, setFetchEnd] = React.useState(false);

    async function getID() {
      try {
        setFetchEnd(false);
        const response = await fetch(`http://lebonvin.local/json/api/wine/${id}`);
        const resolve = await response.json();
        if (!response.ok) throw new Error;
        setWine(resolve);
      } catch (err) {
        console.log('Fetch falhou');
      } finally {
        setFetchEnd(true);
      }
    }

    React.useEffect(() => {
      getID();
    }, [])

    return (
    <main className='main' style={fetchEnd ? {display: 'block'} : {display: 'none'}}>
      <img className='logo' src={Logo}></img>
      <div className='banner'></div>
      <section className='wine-main'>
        <div>
          <img src={fetchEnd && wine.photo.src}></img>
        </div>
        <div>
          <h1>{fetchEnd && wine.photo.title}</h1>
          <ul>
            <li>Cód 655</li>
            <li>2014</li>
            <li>750ml</li>
            <li>Tinto Seco</li>
            <li>Estados Unidos</li>
          </ul>
          <p>
          Le Volte dell’Ornellaia combina a expressão mediterrânea de generosidade com estrutura e complexidade, refletindo a filosofia de Ornellaia. Le Volte dell'Ornellaia é um bom vinho para os amantes de vinhos completos. As diferentes variedades foram fermentadas separadamente em pequenos tanques de aço para manter suas características varietais intactas. A fermentação alcoólica foi seguida da fermentação malolática, novamente em tanques de aço. O vinho estagiou durante 10 meses, parte em barrica de Ornellaia e parte em tanques de cimento, de forma a obter o equilíbrio perfeito entre a estrutura tânica e a expressão de fruta fresca. “Le Volte dell'Ornellaia 2018 reflete perfeitamente as características do vintage, revelando grande elegância e equilíbrio. O seu nariz é maravilhosamente complexo, muito frutado com delicadas notas florais e picantes. A textura tânica e suave é marcante na boca, terminando com um final nítido e vivo."
          <br></br>
          - Olga Fusari - Winemaker
          </p>
        </div>
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
