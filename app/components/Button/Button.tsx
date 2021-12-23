import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import dimensions from '../../constants/dimensions';

interface ButtonProps{
    onPress: () => void;
    title:string;
    style:ViewStyle;
    disabled?:boolean
}

const Button = ({onPress,title,style,disabled}:ButtonProps):JSX.Element => {
    return (
        <Pressable onPress={onPress} disabled={disabled} style={[styles.container,style,{backgroundColor:disabled?'grey':'blue'}]}><Text style={styles.title}>{title}</Text></Pressable>
    )
}

export default Button;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'blue',
        borderRadius:4,
        paddingVertical:14,
        width:dimensions.windowWidth-30,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        color:'white',
        fontWeight:'bold'
    }
})