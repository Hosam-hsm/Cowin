import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button/Button';
import CustomTextInput from '../../components/TextInput/TextInput';
import { useAppDispatch } from '../../hooks/storeHooks';
import { loginUser } from '../../store/features/user/userSlice';

const LoginScreen = () => {
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('')
  const [hiddenPswd,setHiddenPswd]=useState(true)
  const dispatch = useAppDispatch()

  const onPressEyeIcon=()=>{
   setHiddenPswd(hidden=>!hidden)
  }

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.titleContainer}>
        <Text style={styles.titleLg}>Welcome</Text>
        <Text style={styles.titleMd}>vaccinatior & verifier</Text>
        </View>
        <CustomTextInput
        value={mobile}
        onChangeText={setMobile}
        style={styles.inputContainer}
        title='Mobile Number'
        keyboardType='number-pad'
        />
       <CustomTextInput
        value={password}
        onChangeText={setPassword}
        style={styles.inputContainer}
        title='Password'
        showEyeIcon
        secureTextEntry={hiddenPswd}
        onPressEyeIcon={onPressEyeIcon}
        />
        <Button 
        onPress={()=>{dispatch(loginUser({mobile,password}))}}
        title={'Log in'}
        style={styles.button}
        />
      </SafeAreaView>
    );
};

export default LoginScreen;

const styles=StyleSheet.create({
  screen:{
    flex:1,
    paddingHorizontal:16,
    backgroundColor:'white',
    paddingTop:80
  },
  titleContainer:{marginBottom:24},
  titleLg:{
    color:'grey',
    fontWeight:'700',
    fontSize:20
  },
  titleMd:{
    fontSize:13
  },
  inputContainer:{
    marginTop:16,
  },
  title:{
    color:'white',
    fontWeight:'bold'
  },
  button:{
    marginTop:24
  }
})