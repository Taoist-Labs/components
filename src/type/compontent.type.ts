import {UseFormRegister } from "react-hook-form";
export interface Icomponent {
    type: string;
    id: string;
    title:string;
    automation_action:string;
    content:any[]
}

interface PropertiesObj{
    name:string;
    value: any
}

export interface InputProps{
    item:{
        type: string;
        name: string;
        inputType: string;
        properties:PropertiesObj[]
    }
    type?:string;
    tableIndex?:number;
    listName?:string;
    register:UseFormRegister<any>
}
export interface SelectProps{
    item:{
        type: string;
        name: string;
        dataList: string;
        properties:PropertiesObj[]
    }
    type?:string;
    tableIndex?:number;
    listName?:string;
    register:UseFormRegister<any>
    name?:string
    control:any

}

export interface UpdateProps{
    item:{
        type: string;
        name: string;
        uploadType: string;
        properties:PropertiesObj[]
    }
    type?:string;
    tableIndex?:number;
    listName?:string;
    setValue?:any;
    register:UseFormRegister<any>
}

export interface TableProps{
    item:{
        type: string;
        style: {
            column: number,
            width: number[],
            tHeader: string[]

        }
        rows:any;
        name:string;
    }
    type?:string;
    register:UseFormRegister<any>
    control:any
    setValue?:any
}

export interface ChildMethods {
    childMethod: () => void;
}
