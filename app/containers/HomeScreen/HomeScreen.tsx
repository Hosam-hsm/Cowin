import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import CustomTextInput from '../../components/TextInput/TextInput';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { formatDate } from '../../utils/functions';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchDistricts, fetchStates } from '../../store/features/slot/slotSlice';
import dimensions from '../../constants/dimensions';
import {District,State} from '../../types/DataTypes'
import { HomeScreenNavigationProp } from '../../types/NavigationTypes';

const Tab = createMaterialTopTabNavigator();

const SearchByPincode=()=>{
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [pincode,setPincode] = useState('')

  const onPressDate = () => {
    setOpen(true)
  }

  const onPressSearch = () => {
    navigation.navigate('Slots',{pincode, date: formatDate(date)})
  }

  return(
    <View style={styles.screen}>
    <CustomTextInput
    value={pincode}
    onChangeText={setPincode}
    style={styles.inputContainer}
    title='Pincode'
    keyboardType='number-pad'
    maxLength={6}
    />
    <CustomTextInput
    value={formatDate(date)}
    style={styles.inputContainer}
    title='Date'
    editable={false}
    onPressContainer={onPressDate}
    />
    <DatePicker
    modal
    open={open}
    date={date}
    onConfirm={(date) => {
      setOpen(false)
      setDate(date)
      }}
    onCancel={() => {
      setOpen(false)
      }}
    minimumDate={new Date()}
    mode='date'
    />
    <Button 
    onPress={onPressSearch}
    title={'Search'}
    style={styles.button}
    disabled={pincode.length!==6}
    />
    </View>
  )
}

const SearchByDistrict=()=>{
  const [states,setStates]=useState<State[]>([])
  const [filteredStates,setFilteredStates]=useState<State[]>([])
  const [districts,setDistricts]=useState<District[]>([])
  const [filteredDistricts,setFilteredDistricts]=useState<District[]>([])
  const [selectedState,setSelectedState] = useState<State>({state_id:-1,state_name:''})
  const [selectedDistrict,setSelectedDistrict] = useState<District>({district_id:-1,district_name:''})
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const navigation = useNavigation<HomeScreenNavigationProp>()
  const dispatch = useAppDispatch()

  const onChangeStateText = (text:string) => {
   setSelectedState({state_id:0,state_name:text})
   let newFilteredStates = states.filter(state=>state.state_name.toLowerCase().includes(text.toLowerCase())) 
   setFilteredStates(newFilteredStates)
  }

  const onChangeDistrictText = (text:string) => {
    setSelectedDistrict({district_id:0,district_name:text})
    let newFilteredDistricts = districts.filter(district=>district.district_name.toLowerCase().includes(text.toLowerCase())) 
    setFilteredDistricts(newFilteredDistricts)
   }

  const onPressState = (state:State) => {
    setSelectedDistrict({district_id:-1,district_name:''})
    setSelectedState(state)
    setFilteredStates([])
  }

  const onPressDistrict = (district:District) => {
    setSelectedDistrict(district)
    setFilteredDistricts([])
  }

  const onPressDate = () => {
    setOpen(true)
  }

  const onPressSearch = () => {
    navigation.navigate('Slots',{district_id:selectedDistrict.district_id, date: formatDate(date)})
  }

  const fetchAllStates = async () => {
      const resultAction = await dispatch(fetchStates())
      if (fetchStates.fulfilled.match(resultAction)) {
        setStates(resultAction.payload.states)
        setFilteredStates(resultAction.payload.states)
      } else {
        ToastAndroid.show('Sorry, we were unable to fetch the states.',ToastAndroid.SHORT) 
    }
  }

  const fetchDistrictsInSelectedState = async () => {
    const resultAction = await dispatch(fetchDistricts({state_id:selectedState.state_id}))
    if (fetchDistricts.fulfilled.match(resultAction)) {
      setDistricts(resultAction.payload.districts)
      setFilteredDistricts(resultAction.payload.districts)
    } else {
      ToastAndroid.show('Sorry, we were unable to fetch the districts.',ToastAndroid.SHORT) 
  }
 }

  useEffect(()=>{
    fetchAllStates()
  },[])

  useEffect(()=>{
    if(selectedState.state_id>0){
      fetchDistrictsInSelectedState()
    }
  },[selectedState])

  return(
    <View style={styles.screen}>
    <CustomTextInput
    value={selectedState?.state_name}
    onChangeText={onChangeStateText}
    style={styles.inputContainer}
    title='State'
    />
    {selectedState.state_id!==-1 && filteredStates.length>0 && <FlatList 
    data={filteredStates} 
    keyboardShouldPersistTaps={'handled'}
    style={styles.statesSuggestionsContainer}
    keyExtractor={item=>item.state_id.toString()}  
    renderItem={({item,index})=><Pressable 
    style={styles.state}
    onPress={()=>{onPressState(item)}} 
    key={index}>
      <Text>{item.state_name}</Text>
    </Pressable>}
    />}
    
    <CustomTextInput
    value={selectedDistrict.district_name}
    onChangeText={onChangeDistrictText}
    style={styles.inputContainer}
    title='District'
    editable={selectedState.state_id>0}
    />
    {selectedDistrict.district_id!==-1 && filteredDistricts.length>0 && <FlatList 
    data={filteredDistricts} 
    keyboardShouldPersistTaps={'handled'}
    style={styles.districtsSuggestionsContainer}
    keyExtractor={item=>item.district_id.toString()}  
    renderItem={({item,index})=><Pressable 
    style={styles.district} 
    onPress={()=>{onPressDistrict(item)}} 
    key={index}>
      <Text>{item.district_name}</Text>
    </Pressable>}
    />}

    <CustomTextInput
    value={formatDate(date)}
    style={styles.inputContainer}
    title='Date'
    editable={false}
    onPressContainer={onPressDate}
    />
    <DatePicker
    modal
    open={open}
    date={date}
    onConfirm={(date) => {
      setOpen(false)
      setDate(date)
      }}
    onCancel={() => {
      setOpen(false)
      }}
    minimumDate={new Date()}
    mode='date'
    />
    <Button
    onPress={onPressSearch}
    title={'Search'}
    style={styles.button}
    disabled={selectedState.state_id<1 || selectedDistrict.district_id<1}
    />
    </View>
  )
}

const Tabs=() =>{
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle:{textTransform:'none'}
    }}>
      <Tab.Screen name="Search by Pincode" component={SearchByPincode} />
      <Tab.Screen name="Search by District" component={SearchByDistrict} />
    </Tab.Navigator>
  );
}

const HomeScreen = () => {
    return (
      <SafeAreaView style={styles.screen}>  
        <Tabs/>
      </SafeAreaView>
    );
};

export default HomeScreen;

const styles=StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'white',
  },
  inputContainer:{
    marginTop:24,
    alignSelf:'center'
  },
  dateTxt:{
    fontWeight:'bold',
    alignSelf:'center',
    marginTop:24,
    color:'darkblue',
  },
  statesSuggestionsContainer:{
    backgroundColor:'white',
    elevation:2,
    zIndex:10,
    maxHeight:200,
    width:dimensions.windowWidth-32,
    alignSelf:'center',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  districtsSuggestionsContainer:{
    backgroundColor:'white',
    elevation:2,
    zIndex:10,
    maxHeight:200,
    width:dimensions.windowWidth-32,
    alignSelf:'center',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  state:{
    marginBottom:7,
    paddingHorizontal:16,
    paddingVertical:8, 
  },
  district:{
    marginBottom:7,
    paddingHorizontal:16,
    paddingVertical:8, 
  },
  button:{
    marginTop:24,
    alignSelf:'center',
    position:'absolute',
    bottom:16
  }
})