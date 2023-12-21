import {UseFormRegister } from "react-hook-form";
import {ForwardedRef} from "react";
export interface Icomponent {
    type: string;
    id: string;
    title:string;
    automation_action:string;
    content:any[]
}

export interface ChildProps {
    forwardedRef?: ForwardedRef<ChildMethods>;
    listArr:any;
    register:any;
    control:any;
    setValue?:any
    reset?:any
    data?:any
    getValues?:any
}

interface PropertiesObj{
    name:string;
    value: any
}

export interface thProps{
    width:number;
}

export interface InputProps{
    item:{
        type: string;
        name: string;
        inputType: string;
        properties:PropertiesObj[]
        value?:any
    }
    type?:string;
    tableIndex?:number;
    listName?:string;
    reset?:any;
    getValues?:any;
    setValue?:any
    register:UseFormRegister<any>
}
export interface SelectProps{
    item:{
        type: string;
        name: string;
        dataList: string;
        properties:PropertiesObj[]
        value?:any
    }
    type?:string;
    reset?:any;
    tableIndex?:number;
    listName?:string;
    register:UseFormRegister<any>
    name?:string
    control:any
    setValue?:any
}

export interface UpdateProps{
    item:{
        type: string;
        name: string;
        uploadType: string;
        properties:PropertiesObj[]
        value?:any
    }
    type?:string;
    reset?:any;
    tableIndex?:number;
    listName?:string;
    setValue?:any;
    getValues?:any;
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
        value?:any;
    }
    type?:string;
    register:UseFormRegister<any>
    control:any
    reset?:any
    getValues?:any
    setValue?:any
}

export interface ChildMethods {
    childMethod: () => void;
}

export interface  Item  {
    id: string;
    src: string;
    title: string;
    name: string;
    auto_action?: string;
    dragType?: string;
    componentData: any;
    data?:any;
    value?:any
};
