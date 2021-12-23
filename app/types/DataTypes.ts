export interface District{
    district_id: number, 
    district_name: string
}

export interface DistrictsReturnData{
    districts:District[]
}

export interface State{
    state_id: number, 
    state_name: string
}

export interface StatesReturnData{
    states:State[]
}

export interface Center{
    center_id:number,
    name:string,
    address:string,
    state_name:string,
    district_name:string,
    block_name:string,
    pincode:number,
    lat:number,
    long:number,
    from:string,
    to:string,
    fee_type:"Paid"|"Free",
    sessions:{
            session_id:string,
            date:string,
            available_capacity:number,
            min_age_limit:number,
            allow_all_age:boolean,
            vaccine:"COVISHIELD"|"COVAXIN",
            slots:string[],
            available_capacity_dose1:number,
            available_capacity_dose2:number
        }[],
    vaccine_fees:
        {
            vaccine:"COVISHIELD"|"COVAXIN",
            fee:string
        }[]
}

export interface SlotByDistrictReturnData{
    centers:Center[]
}

export interface Session{
    address: string,
    allow_all_age?: boolean, 
    available_capacity: number, 
    available_capacity_dose1?: number, 
    available_capacity_dose2?: number, 
    block_name?: string, 
    center_id: number, 
    date?: string, 
    district_name?: string, 
    fee?: string, 
    fee_type: 'Paid'|'Free', 
    from?: string, 
    lat?: number, 
    long?: number, 
    min_age_limit: number, 
    name: string, 
    pincode?: number, 
    session_id?:string, 
    slots?: string[], 
    state_name?: string, 
    to?: string, 
    vaccine: string
}

export interface SlotByPincodeReturnData {
    sessions:Session[]
}