import React,{useEffect,useState} from 'react'
import styles from './styles'
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native'
import {Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import { useNavigation} from '@react-navigation/native'
import api from '../../services/api'
import { setLightEstimationEnabled } from 'expo/build/AR'

export default function Incidents(){

const[incidents, setIncidents] = useState([ ])
const[total,setTotal] = useState(0)
const navigation = useNavigation();

function navigateToDetail(incident){
    navigation.navigate('Details',{incident})
     
}

async function loadIncidents(){
    const responce = await api.get('incidents')

    setIncidents(responce.data)
    setTotal(response.headers['X-TOTAL-COUNT'])
}

useEffect(()=>{
    loadIncidents()
},[])

    return(
        <View style ={styles.container}>
            <View style = {styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>
                </Text>       
            </View>

            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos e salve o dia ;) </Text>
        
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident=>String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item:incident})=>(
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={()=>navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />


           
        </View>
    )
}