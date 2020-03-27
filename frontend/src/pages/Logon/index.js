import React,{useState} from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import {Link,useHistory} from 'react-router-dom'
import api from '../../services/api'

export default function Logon(){

    const[id,setId] = useState('')
    const history = useHistory()
    async function handleLogon(e){
        e.preventDefault(e)

        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',response.data.name)
            history.push('/profile')

        }catch (err){
            alert('Falha no Login, tente novamente')

        }
    }
    return(
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon!!</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        />
                    <button className="button" type="subimit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
                
           </section>

           <img src={heroesImg} alt="Heroes"/>
       </div>
    );
}