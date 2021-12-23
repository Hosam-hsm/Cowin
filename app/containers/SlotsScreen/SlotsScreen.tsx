import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import Button from '../../components/Button/Button';
import Session from '../../components/Session/Session';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchSlotsByDistrict, fetchSlotsByPincode } from '../../store/features/slot/slotSlice';
import {Session as SessionType} from '../../types/DataTypes'
import { SlotsScreenRouteProp } from '../../types/NavigationTypes';

const SlotsScreen = ({}) => {
  const [sessions,setSessions] = useState<SessionType[]>([])
  const [filteredSessions,setFilteredSessions] = useState<SessionType[]>([])
  const [loading,setLoading]=useState(false)

  const route = useRoute<SlotsScreenRouteProp>()
  const pincode = route.params.pincode
  const district_id = route.params.district_id
  const date = route.params.date
  const dispatch = useAppDispatch()

  const searchByDistrict = async () => {
    if(district_id){
      const resultAction = await dispatch(fetchSlotsByDistrict({district_id,date}))
      if (fetchSlotsByDistrict.fulfilled.match(resultAction)) {
        let centers = resultAction.payload.centers
        let formattedCenters = centers.map(center=>{
          let available_capacity=0,vaccine='COVISHIELD',min_age_limit=18;
          let {center_id,name,address,sessions,fee_type}=center
          sessions.forEach(session=>{
          available_capacity=session.available_capacity;
          vaccine=session.vaccine;
          min_age_limit=session.min_age_limit
          })   
          return({
            center_id,
            name,
            address,
            available_capacity,
            vaccine,
            min_age_limit,
            fee_type
          })
        })
        setSessions(formattedCenters)
        setFilteredSessions(formattedCenters)
        setLoading(false)
      } else {
        ToastAndroid.show('Sorry, we could not find any slots.',ToastAndroid.SHORT)
        setLoading(false)
      }
    }
  }

  const fetchSlots = async () => {
    setLoading(true)
    if (pincode) {
      const resultAction = await dispatch(fetchSlotsByPincode({pincode,date}))
      if (fetchSlotsByPincode.fulfilled.match(resultAction)) {
        setSessions(resultAction.payload.sessions)
        setFilteredSessions(resultAction.payload.sessions)
        setLoading(false)
      } else {
        ToastAndroid.show('Sorry, we could not find any slots.',ToastAndroid.SHORT)
        setLoading(false)
      }
    }
    else{
      searchByDistrict()
    }
  }

  const onPress18 = () => {
    let filteredSessions = sessions.filter(session=>session.min_age_limit===18)
    setFilteredSessions(filteredSessions)
  }

  const onPress45 = () => {
    let filteredSessions = sessions.filter(session=>session.min_age_limit===45)
    setFilteredSessions(filteredSessions)
  }

  const onPressFree = () => {
    let filteredSessions = sessions.filter(session=>session.fee_type==='Free')
    setFilteredSessions(filteredSessions)
  }
    
  const onPressPaid = () => {
    let filteredSessions = sessions.filter(session=>session.fee_type==='Paid')
    setFilteredSessions(filteredSessions)
  }

  const ListHeader = () => {
    return (
      <View style={styles.filterOptionsContainer}>
        <Pressable style={styles.filterOption} onPress={onPress18}>
          <Text style={styles.filterOptionTxt}>18+</Text>
        </Pressable>
        <Pressable style={styles.filterOption} onPress={onPress45}>
          <Text style={styles.filterOptionTxt}>45+</Text>
        </Pressable>
        <Pressable style={styles.filterOption} onPress={onPressFree}>
          <Text style={styles.filterOptionTxt}>Free</Text>
        </Pressable>
        <Pressable style={styles.filterOption} onPress={onPressPaid}>
          <Text style={styles.filterOptionTxt}>Paid</Text>
        </Pressable>
      </View>
    )
  }

  useEffect(()=>{fetchSlots()},[])

  if(loading){
    return <ActivityIndicator style={styles.loader} size={'large'} />
  }
    return (
      <SafeAreaView style={styles.screen}>  
      <ListHeader/>
       <FlatList
       data={filteredSessions}
       ListEmptyComponent={<Text style={styles.noSlotsTxt}>No slots are available</Text>}
       keyExtractor={(item)=>item.center_id.toString()}
       contentContainerStyle={styles.contentContainer}
       renderItem={({item,index})=><Session key={index} item={item}/>}
       />
      <Button
      onPress={()=>{}}
      title={'Notify Me'}
      style={styles.button}
      />
      </SafeAreaView>
    );
};

export default SlotsScreen;

const styles=StyleSheet.create({
    screen:{
      flex:1,
    },
    loader:{
      alignSelf:'center',
      marginTop:20
    },
    noSlotsTxt:{
    },
    contentContainer:{
      paddingHorizontal:16,
      paddingBottom:80
    },
    filterOptionsContainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:16,
      paddingVertical:16
    },
    filterOption:{
      backgroundColor:'white',
      paddingVertical:6,
      paddingHorizontal:10,
      borderRadius:12,
      marginRight:16,
    },
    filterOptionTxt:{
      fontSize:12,
      color:'grey',
      fontWeight:'600'
    },
    button:{
      marginTop:24,
      alignSelf:'center',
      position:'absolute',
      bottom:16
    }
  })