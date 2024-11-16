import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React, {ChangeEvent, useEffect, useState} from "react";
import Lan from "../utils/lan";
import {Controller} from "react-hook-form";
import sns from "@seedao/sns-js";
import ErrorImg from "../svg/error";
import DisableNumberInputWheel from "./DisableInput";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;


const Box = styled.div<{theme?:string}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  label{
    margin-right: 10px;
    line-height: 40px;
      padding-left: 5px;

  }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    input,textarea{
        height: 40px;
        border-radius: 8px;
        width: 100%;
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
        background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
        color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
        padding: 0 12px;
        box-sizing: border-box;
        &:hover,&:focus{
            border: 1px solid rgba(82, 0, 255, 0.50);
            outline: none;
        }
    }
    textarea{
        resize: none;
        min-height: 120px;
        padding: 12px;
    }

  .rht{
      position: relative;
  }
    .error,.error:focus{
        border: 1px solid #FB4E4E;
    }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: 9px;
    right: 5px;
    font-size: 12px!important;
    white-space: nowrap;
    z-index: 9;
    background: #fff;

    
`

export default function Input({item,tableIndex,listName,type,reset,setValue,theme,language,control,getValues,watch,setError,clearErrors}:InputProps){

    const [prop,setProp] = useState<any>();
    const [inputName,setInputName] = useState('')
    const [inputValue,setInputValue]= useState('')


    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
            if(inner.name === "validate"){

                switch(item.inputType){
                    case "email":
                        inner.value.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        break;
                    case "address":
                        inner.value.pattern = /^(0x[a-fA-F0-9]{40}|.*\.seedao)$/
                        break;
                    case "text":
                    default:
                        if(inner.value.pattern){
                            inner.value.pattern = new RegExp(inner.value.pattern);
                        }
                        break;
                }
            }
        })
        setProp(arr)
    }, [item.properties]);




    useEffect(() => {
        if(tableIndex===undefined){
            setValue(`${type}.${item?.name}`,item?.value)
            setInputValue(item?.value)
        }
        // return () =>{
        //     reset();
        // }
    }, []);

    let timeoutId:any;
    let value = watch(inputName);




    useEffect(() => {
        if(prop?.needParseSNS){
          getSNS(value);
        }
    }, [prop?.needParseSNS,value]);

    useEffect(()=>{
        setInputName(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)
    },[tableIndex,listName,item])




    useEffect(() => {
        if(!value)return;

        if((value === inputValue || value === getValues(inputName)) && value.indexOf("seedao")>-1){
            getAddr()
        }

    }, [item.inputType,inputValue,value]);

    const getSNS = async (wallet:string) =>{
        try{
            const rt = await sns.name(wallet);
            rt && setInputValue(rt);

        }catch (e) {
            console.error(e)
        }
    }

    const getAddr = async () =>{
        // clearErrors(inputName)
        try{
            let rt = await sns.resolve(value);
            const decimalValue = parseInt(rt, 16);
            if(decimalValue){
                setValue(inputName,rt)

            }else{
                // setError(inputName,{type: 'manual', message: Lan[language??"zh"]?.inputError })
                setValue(inputName,"")
            }


        }catch (e) {
            setValue(inputName,"")
            console.error(e)
        }

    }


    const handleInput = (e:ChangeEvent) =>{
        const {value} = e.target as HTMLInputElement;
        setInputValue(value);
        clearErrors(inputName)
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setValue(inputName,value)
        }, 300);


    }


  if(!prop)return null;
    return <Box theme={theme?.toString()}>
        <label className="labelLft">{prop?.title}</label>
        <DisableNumberInputWheel />
        <div className="rht">
                <Controller
                    name={inputName}
                    control={control}
                    defaultValue={item?.defaultValue?.toString()}
                    rules={prop?.validate}
                    render={({ field,fieldState }) => (
                        <>
                            {
                                item.inputType === "textarea" && <textarea
                                    {...field}
                                    value={getValues(inputName) || ''}
                                    className={`${!!fieldState.error?'error':''}`}
                                />
                            }
                            {
                                item.inputType !== "textarea" && prop?.needParseSNS && <>
                                    <input
                                        type={item.inputType==="number"?"number":"text"}
                                        onChange={(e)=>handleInput(e)}
                                        value={inputValue}
                                        className={`${!!fieldState.error?'error':''}`}/>
                                    <input type="hidden" {...field} readOnly={true} value={getValues(inputName) || ''} />

                                </>
                            }
                            {
                                item.inputType !== "textarea" && !prop?.needParseSNS && <>
                                    <input
                                        {...field}
                                        type={item.inputType==="number"?"number":"text"}
                                        value={getValues(inputName)  || ''}
                                        className={`${!!fieldState.error?'error':''}`} />
                                </>
                            }

                            {
                                !!fieldState.error &&  <ErrorTips>
                                    <ErrorImg />
                                </ErrorTips>
                            }
                        </>

                    )}
                />
        </div>
    </Box>
}
