import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Session as SessionType } from '../../store/features/slot/slotSlice';

interface SessionProps{
    item : SessionType
}

interface CountContainerProps{
    available_capacity : number;
    vaccine : string
}

const CountContainer = ({available_capacity,vaccine}:CountContainerProps) => {
    return (
    <View style={styles.countAndNameContainer}>
    <View style={[styles.countContainer,{backgroundColor:available_capacity<10?'red':'green'}]}>
    <Text style={styles.count}>{available_capacity}</Text>
    </View>
    <Text style={styles.vaccineName}>{vaccine}</Text>
    </View>
    )
}

const Session = ({item}:SessionProps) => {
    return (<View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.countsContainer}>
        {item.vaccine==='COVAXIN' && <CountContainer available_capacity={ item.available_capacity} vaccine='Covaxin' />} 
        {item.vaccine==='COVISHIELD' && <CountContainer available_capacity={item.available_capacity} vaccine='Covishield'/>}  
        </View>
        </View>
    )
}

export default Session

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingVertical:24,
        paddingHorizontal:16,
        marginVertical:16
    },
    name:{
        fontWeight:'bold',
    },
    address:{
        lineHeight:24,
        marginTop:8,
        color:'grey',
        fontSize:13
    },
    countsContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:8
    },
    countAndNameContainer:{
        marginRight:16,
        alignItems:'center'
    },
    countContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        height:40,
        width:40
    },
    count:{
        fontSize:12,
        color:'white'
    },
    vaccineName:{
        fontSize:11,
        marginTop:8
    }
})