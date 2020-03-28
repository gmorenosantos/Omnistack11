import React from 'react'
import {View, Image,TouchableOpacity, Text,Linking} from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import {Feather} from '@expo/vector-icons'
import { useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

export default function Details(){
    const route=useRoute()
    const incident=route.params.incident
    const navigation = useNavigation();
    const message = 'Olá APAD, gostaria de ajudar no caso "tatata" com o valor de R$120,00'

    function navigateToIncident(){
        navigation.navigate('Incidents')
         
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:'Herói do caso:',
            recipients: ['gabrielm_marques@hotmail.com'],
            body: message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=5511944016853&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateToIncident}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!!</Text>
                <Text style={styles.heroTitle}>Seja o herói dessa causa</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}