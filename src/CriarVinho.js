import React from 'react';
import './CriarVinho.css';

const CriarVinho = () => {
    const [userID, setUserID] = React.useState('');
    const [wines, setWines] = React.useState([]);

    React.useEffect(() => {
        getUserID();
        userWines();
    }, [userID])

    async function getUserID() {
        const response = await fetch('http://lebonvin.local/json/api/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token'),
            },
        });
        const resolve = await response.json();
        setUserID(resolve.id)
    }

    async function userWines() {
        const response = await fetch(`http://lebonvin.local/json/api/wine/?_user=${userID}`);
        const resolve = await response.json();
        setWines(resolve);
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
    const [img, setImg] = React.useState({});
    const [loading, setLoading] = React.useState(false);

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

            const response = await fetch('http://lebonvin.local/json/api/wine', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('Token'),
                },
                body: formData,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
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
            <div className='criar-vinho-1'>
                <form className='form criar-vinho-form' onSubmit={handleForm}>
                    <input type='text' placeholder='Nome do Vinho' value={nome} onChange={({target}) => setNome(target.value)} />
                    <input type='text' placeholder='Código' value={codigo} onChange={({target}) => setCodigo(target.value)} />
                    <input type='text' placeholder='Ano' value={ano} onChange={({target}) => setAno(target.value)} />
                    <input type='text' placeholder='Quantidade' value={quantidade} onChange={({target}) => setQuantidade(target.value)} />
                    <input type='text' placeholder='Tipo' value={tipo} onChange={({target}) => setTipo(target.value)} />
                    <input type='text' placeholder='País' value={pais} onChange={({target}) => setPais(target.value)} />
                    <textarea placeholder='Descrição' value={descricao} onChange={({target}) => setDescricao(target.value)} />
                    <input type='text' placeholder='Uva' value={uva} onChange={({target}) => setUva(target.value)} />
                    <input type='text' placeholder='Amadurecimento' value={amadurecimento} onChange={({target}) => setAmadurecimento(target.value)} />
                    <input type='text' placeholder='Região' value={regiao} onChange={({target}) => setRegiao(target.value)} />
                    <input type='text' placeholder='Classificação' value={classificacao} onChange={({target}) => setClassificacao(target.value)} />
                    <input type='text' placeholder='Teor' value={teor} onChange={({target}) => setTeor(target.value)} />
                    <input type='text' placeholder='Potencial' value={potencial} onChange={({target}) => setPotencial(target.value)} />
                    <input type='text' placeholder='Temperatura' value={temperatura} onChange={({target}) => setTemperatura(target.value)} />
                    <input type='file' name='img' id='img' onChange={handleImgForm} />
                    <input className='submit' type='submit' value={loading ? 'Criando...' : 'Criar Vinho'} disabled={loading && 'disabled'} />
                </form>
                <div>
                    {img.preview && <div className='img-preview' style={{backgroundImage: `url('${img.preview}')`}}></div>}
                </div>
            </div>
            <ul className='criar-vinho-2'>
                {wines.map((wine) => (
                    <li key={wine.id}>{wine.title}</li>
                ))}
            </ul>
        </section>
    )
}

export default CriarVinho
