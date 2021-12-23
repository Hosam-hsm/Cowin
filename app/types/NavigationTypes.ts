import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
    Login: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    Slots:{
        pincode?:string;
        district_id?:number;
        date:string
    }
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;
export type SlotsScreenRouteProp = RouteProp<HomeStackParamList, 'Slots'>;