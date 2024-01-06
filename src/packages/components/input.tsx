import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React, {ChangeEvent, useEffect, useState} from "react";
import Lan from "../utils/lan";
import {Controller} from "react-hook-form";


const Box = styled.div<{theme?:string}>`
    display: flex;
  align-items: flex-start;

    
  label{
    margin-right: 10px;
    line-height: 40px;
    flex-shrink: 0;

  }
    input,textarea{
        height: 40px;
        border-radius: 8px;
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
  .sm{
    width: 160px;
  }
  .md{
    width: 240px;
  }
  .lg{
    width: 480px;
  }
  .rht{
    flex-grow: 1;
      position: relative;
  }
    .error,.error:focus{
        border: 1px solid #FB4E4E;
    }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: -20px;
    font-size: 12px;
    white-space: nowrap;
`

export default function Input({item,tableIndex,listName,type,reset,setValue,theme,language,control,getValues}:InputProps){

    const [prop,setProp] = useState<any>();
    const [inputName,setInputName] = useState('')

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;


            // if(inner.name === "validate" && !inner.value.pattern ){
            //
            //     switch(item.inputType){
            //         case "email":
            //             inner.value.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            //             break;
            //         case "address":
            //             inner.value.pattern = /^(0x[a-fA-F0-9]{40}|.*\.seedao)$/
            //             break;
            //         case "text":
            //         default:
            //             break;
            //     }
            // }
        })
        console.log(arr)
        setProp(arr)
    }, [item.properties]);

    useEffect(() => {

        if(tableIndex===undefined){
            setValue(`${type}.${item?.name}`,item?.value)
        }
        return () =>{
            reset();
        }
    }, []);

    useEffect(()=>{
        setInputName(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)
    },[tableIndex,listName,item])


  if(!prop)return null;
    return <Box theme={theme?.toString()}>
        <label className="labelLft">{prop?.title}</label>
        <div className="rht">

                <Controller
                    name={inputName}
                    control={control}
                    rules={prop.validate}
                    render={({ field,fieldState }) => (
                        <>
                            {
                                item.inputType === "textarea" && <textarea
                                    {...field}
                                    value={getValues(inputName) || ''}
                                    className={`${prop?.size} ${!!fieldState.error?'error':''}`}

                                />
                            }
                            {
                                item.inputType !== "textarea" && <input
                                    {...field}
                                    value={getValues(inputName) || ''}
                                    className={`${prop?.size} ${!!fieldState.error?'error':''}`}/>
                            }

                            {
                                !!fieldState.error &&  <ErrorTips>
                                    {fieldState.error.message?fieldState.error.message:Lan[language??"zh"]?.inputError}
                                </ErrorTips>
                            }
                        </>

                    )}
                />
        </div>
    </Box>
}
