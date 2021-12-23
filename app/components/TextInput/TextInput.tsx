import React from 'react';
import { KeyboardTypeOptions, Pressable, StyleSheet, Text,TextInput, TextStyle, View } from 'react-native';
import dimensions from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextInputProps{
    title:string;
    value?:string;
    onChangeText?: ((text: string) => void) | undefined;
    style?:TextStyle;
    keyboardType?:KeyboardTypeOptions;
    secureTextEntry?:boolean;
    showEyeIcon?:boolean;
    onPressEyeIcon?: () => void;
    editable?: boolean;
    maxLength?: number;
    onPressContainer?:() => void
}

const CustomTextInput = ({
    title,
    value,
    onChangeText,
    style,
    keyboardType,
    secureTextEntry,
    showEyeIcon,
    onPressEyeIcon,
    editable,
    maxLength,
    onPressContainer
    }:TextInputProps):JSX.Element => {
    return (
        <Pressable onPress={onPressContainer} style={style}>
        <View style={styles.titleContainer}><Text style={styles.title}>{title}</Text></View>
        <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.inputContainer}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
        maxLength={maxLength}
        />

       {showEyeIcon? secureTextEntry?
        <Icon 
        name='eye-off' 
        size={22} 
        color={'grey'} 
        style={styles.eyeIcon}
        onPress={onPressEyeIcon}
        /> :
        <Icon 
        name='eye' 
        size={22} 
        color={'grey'} 
        style={styles.eyeIcon}
        onPress={onPressEyeIcon}/> :null}
        </Pressable>
    )
}

export default CustomTextInput;

const styles=StyleSheet.create({
    inputContainer:{
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:16,
        width:dimensions.windowWidth-30,
        borderWidth:1,
        borderColor:'lightgrey',
        color:'black'
    },
    titleContainer:{
        position:'absolute',
        left:10,
        top:-8,
        backgroundColor:'white',
        paddingHorizontal:5,
        zIndex:10
    },
    title:{
        fontSize:14
    },
    eyeIcon:{
        position:'absolute',
        right:10,
        top:11,
        zIndex:10
    }
})