import React from 'react';
import { useNavigate } from 'react-router-dom';

const Acessar = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    console.log(loading);
    console.log(username, password);

    React.useEffect(() => {
        if (window.localStorage.getItem('Token')) {
            navigate('/criar-vinho');
        }
    })

    async function handleForm(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('http://lebonvin.local/json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"username": username, "password": password})
            });
            const resolve = await response.json();
            window.localStorage.setItem('Token', resolve.token);
            navigate('/criar-vinho');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className='form' onSubmit={handleForm}>
            <input type='text' placeholder='Nome de Usuário' value={username} onChange={({target}) => setUsername(target.value)} />
            <input type='password' placeholder='Senha' value={password} onChange={({target}) => setPassword(target.value)} />
            <input className='submit' type='submit' value={loading ? 'Acessando...' : 'Acessar'} disabled={loading && 'disabled'} />
        </form>
    )
}

export default Acessar
