import {UseFormRegister } from "react-hook-form";
import {ForwardedRef} from "react";
export interface Icomponent {
    name: string;
    id: string;
    title:string;
    desc:string;
    automation_action:string;
    content:any[]
}

export interface ChildProps {
    forwardedRef?: ForwardedRef<ChildMethods>;
    listArr:any;
    control:any;
    setValue?:any
    setError?:any
    reset?:any
    clearErrors?:any
    operate?:string
    data?:any
    watch:any
    name?:string
    theme?:boolean;
    language?:string;
    getValues?:any
    baseUrl?:string
    token?:string
    errors?:any
    trigger?:any
    version?:string
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
        dataList?:any
    }
    theme?:boolean;
    type?:string;
    tableIndex?:number;
    listName?:string;
    reset?:any;
    setError?:any;
    clearErrors?:any;
    watch?:any;
    getValues?:any;
    setValue?:any
    trigger?:any
    control?:any
    baseUrl?:string
    language?:string;
    token?:string
    version?:string
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
    baseUrl?:string
    version?:string
    type?:string;
    reset?:any;
    tableIndex?:number;
    listName?:string;
    language?:string;
    setValue?:any;
    theme?:boolean;
    getValues?:any;
    control?:any;
    errors?:any;
}

export interface TableProps{
    item:{
        type: string;
        style: {
            column: number,
            width: number[],
            tHeader: string[]
        }
        desc?:string;
        rows:any;
        name:string;
        value?:any;
        sum?:any;
    }
    theme?:boolean;
    type?:string;
    language?:string;
    control:any
    watch:any
    reset?:any
    clearErrors?:any
    setError?:any
    getValues?:any
    setValue?:any
    baseUrl?:string
    errors?:string
    token?:string
    version?:string
}

export interface ChildMethods {
    childMethod: () => void;
}

export interface  Item  {
    id: string;
    screenshot_uri: string;
    is_hidden: boolean;
    title: string;
    name: string;
    auto_action?: string;
    dragType?: string;
    schema: any;
    data?:any;
    value?:any
};
