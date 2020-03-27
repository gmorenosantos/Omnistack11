import React,{useState, useEffect} from 'react'
import logoImg from '../../assets/logo.svg'
import {Link,useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'
export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName')
    const ongId= localStorage.getItem('ongId')

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
        } catch {
            alert('Erro ao deletar caso, tente novamente!')
        }
        setIncidents(incidents.filter(incident => incident.id !==id))

        
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg}/>
                <span>Bem Vindo {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar Caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul key={incidents.id}>
               {incidents.map(incident => (
                    <li>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                        
                    </button>
                </li>
               ))}

            </ul>
        </div>
    )
}