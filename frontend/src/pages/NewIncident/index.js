import React,{useState} from 'react'
import logoImg from '../../assets/logo.svg'
import{FiArrowLeft} from 'react-icons/fi'
import{Link, useHistory} from 'react-router-dom'
import './styles.css'
import api from '../../services/api'
export default function NewIncident(){
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[value, setValue] = useState('')
    
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')
    async function HandleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
            
        };

        try{
            await api.post('incidents',data,{
                headers:{
                    Authorization:ongId,
                },
            })
            history.push('/profile')
         
        }catch (err){
            alert('Erro no cadastro!!')
        }
    }
    return (
        <div className="NewIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={HandleNewIncident}>
                    <input 
                        placeholder="Nome do caso"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        />
                    <textarea
                         placeholder="Descrição do caso"
                         value={description}
                        onChange={e=>setDescription(e.target.value)}
                         />
                    <input 
                        placeholder="Valor"
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                        />

                    

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}