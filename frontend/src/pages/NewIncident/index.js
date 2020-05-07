import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

   async function handleaNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('erro ao cadastrar o caso, tente novamente!');
        }
    }

    return(
    <div className="new-incident-container">
    <div className="content">
    <section>
        <img src={logoImg} alt="be the hero"></img>
        <h1>Cadastrar novo caso</h1>
        <p>descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
        <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home</Link>
        </section>   
        
        <form onSubmit={handleaNewIncident} >
            <input 
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <textarea  
            placeholder="Descrição" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
            <input 
            placeholder="valor em reais" 
            value={value}
            onChange={e => setValue(e.target.value)}
            />

          
    
            <button className="button" type="submit">Cadastar</button>
        </form> 
        </div>       
    </div>
    )
}