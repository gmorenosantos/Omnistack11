import React, {useState} from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import{Link,useHistory} from 'react-router-dom'
import{FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'


export default function Resgiter(){
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[whatsapp, setWhatsapp] = useState('')
    const[city, setCity] = useState('')
    const[uf, setUf] = useState('')

    const history = useHistory()

    async function HandleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{
            const response = await api.post('ongs',data)
            history.push('/')
            alert(`Seu ID ${response.data.id}`)
        }catch (err){
            alert('Erro no cadastro!!')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e entre na plataforma</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar ao Login
                    </Link>
                </section>

                <form onSubmit={HandleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-Mail"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                        />
                   <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e=> setWhatsapp(e.target.value)}
                        />

                    <div className="input_group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e=> setCity(e.target.value)}
                            />
                        <input 
                            placeholder="UF" 
                            style={{width:80}}
                            value={uf}
                            onChange={e=> setUf(e.target.value)}
                            />
                    </div>

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}