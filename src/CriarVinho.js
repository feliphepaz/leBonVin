import React from 'react';
import { useNavigate } from 'react-router';
import './CriarVinho.css';

const CriarVinho = () => {
    const [userID, setUserID] = React.useState('');
    const [wines, setWines] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserID();
        userWines();
        if (!window.localStorage.getItem('Token')) {
            navigate('/acessar');
        }
    }, [userID])

    async function getUserID() {
        const response = await fetch('https://formulabor.com.br/lebonvin-api/json/api/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token'),
            },
        });
        const resolve = await response.json();
        setUserID(resolve.id)
    }

    async function userWines() {
        const response = await fetch(`https://formulabor.com.br/lebonvin-api/json/api/wine/?_user=${userID}`);
        const resolve = await response.json();
        setWines(resolve);
    }

    async function deleteWine(e) {
        const wine = e.currentTarget;
        await fetch(`https://formulabor.com.br/lebonvin-api/json/api/wine/${wine.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token'),
            },
        });
        wine.parentElement.style.display = 'none';
    }


    const [nome, setNome] = React.useState('');
    const [codigo, setCodigo] = React.useState('');
    const [ano, setAno] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [pais, setPais] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [uva, setUva] = React.useState('');
    const [amadurecimento, setAmadurecimento] = React.useState('');
    const [regiao, setRegiao] = React.useState('');
    const [classificacao, setClassificacao] = React.useState('');
    const [teor, setTeor] = React.useState('');
    const [potencial, setPotencial] = React.useState('');
    const [temperatura, setTemperatura] = React.useState('');
    const [safra, setSafra] = React.useState('');
    const [decantacao, setDecantacao] = React.useState('');
    const [vinicola, setVinicola] = React.useState('');
    const [img, setImg] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    function createNotify(message, status) {
        const div = document.createElement('div');
        div.classList.add('notify');
        div.classList.add(status);
        div.innerText = message;
        document.body.appendChild(div);
        setTimeout(function() { 
            div.style.display = 'none'
        }, 4000);
    }

    async function handleForm(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('img', img.raw);
            formData.append('nome', nome);
            formData.append('codigo', codigo);
            formData.append('ano', ano);
            formData.append('quantidade', quantidade);
            formData.append('tipo', tipo);
            formData.append('pais', pais);
            formData.append('descricao', descricao);
            formData.append('uva', uva);
            formData.append('amadurecimento', amadurecimento);
            formData.append('regiao', regiao);
            formData.append('classificacao', classificacao);
            formData.append('teor', teor);
            formData.append('potencial', potencial);
            formData.append('temperatura', temperatura);
            formData.append('safra', safra);
            formData.append('decantacao', decantacao);
            formData.append('vinicola', vinicola);

            const response = await fetch('https://formulabor.com.br/lebonvin-api/json/api/wine', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('Token'),
                },
                body: formData,
            });
            if (!response.ok) throw new Error;
            createNotify('Vinho criado com sucesso', 'sucesso');
        } catch (err) {
            createNotify('Erro na criação', 'erro');
        } finally {
            setLoading(false);
        }
    }

    function handleImgForm({target}) {
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        })
    }


    return (
        <section className='criar-vinho'>
            <form className='form criar-vinho-form' onSubmit={handleForm}>
                <input type='text' placeholder='Nome do Vinho' value={nome} onChange={({target}) => setNome(target.value)} />
                <input type='text' placeholder='Código' value={codigo} onChange={({target}) => setCodigo(target.value)} />
                <input type='text' placeholder='Ano' value={ano} onChange={({target}) => setAno(target.value)} />
                <input type='text' placeholder='Quantidade' value={quantidade} onChange={({target}) => setQuantidade(target.value)} />
                <input type='text' placeholder='Tipo' value={tipo} onChange={({target}) => setTipo(target.value)} />
                <input type='text' placeholder='País' value={pais} onChange={({target}) => setPais(target.value)} />
                <textarea placeholder='Descrição' value={descricao} onChange={({target}) => setDescricao(target.value)} />
                <input type='text' placeholder='Uva' value={uva} onChange={({target}) => setUva(target.value)} />
                <textarea type='text' placeholder='Amadurecimento' value={amadurecimento} onChange={({target}) => setAmadurecimento(target.value)} />
                <input type='text' placeholder='Região' value={regiao} onChange={({target}) => setRegiao(target.value)} />
                <input type='text' placeholder='Classificação' value={classificacao} onChange={({target}) => setClassificacao(target.value)} />
                <input type='text' placeholder='Teor' value={teor} onChange={({target}) => setTeor(target.value)} />
                <input type='text' placeholder='Potencial' value={potencial} onChange={({target}) => setPotencial(target.value)} />
                <input type='text' placeholder='Temperatura' value={temperatura} onChange={({target}) => setTemperatura(target.value)} />
                <input type='text' placeholder='Safra' value={safra} onChange={({target}) => setSafra(target.value)} />
                <input type='text' placeholder='Decantação' value={decantacao} onChange={({target}) => setDecantacao(target.value)} />
                <input type='text' placeholder='Vinícola' value={vinicola} onChange={({target}) => setVinicola(target.value)} />
                <input type='file' name='img' id='img' onChange={handleImgForm} />
                {img.preview && <div className='img-preview' style={{backgroundImage: `url('${img.preview}')`}}></div>}
                <input className='submit' type='submit' value={loading ? 'Criando...' : 'Criar Vinho'} disabled={loading && 'disabled'} />
            </form>
            <ul className='criar-vinho-list'>
                {wines.map((wine) => (
                    <li className='vinho' key={wine.id} style={{background: `url('${wine.src}') no-repeat center center`}}>
                        <h2>{wine.title}</h2>
                        <h2 onClick={deleteWine} id={wine.id} className='x'>X</h2>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CriarVinho
