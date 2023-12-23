import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React,{useEffect, useState} from "react";


const Box = styled.div`
    display: flex;
  align-items: flex-start;
  label{
    margin-right: 10px;
    line-height: 30px;
    flex-shrink: 0;
  }
  .sm{
    width: 200px;
  }
  .md{
    width: 400px;
  }
  .lg{
    width: 600px;
  }
  .rht{
    flex-grow: 1;
  }
`


export default function Input({item,register,tableIndex,listName,type,reset,setValue}:InputProps){

    const [prop,setProp] = useState<any>()

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
            if(inner.name === "validate" && !inner.value.pattern ){
                switch(item.inputType){
                    case "email":
                        inner.value.pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        break;
                    case "address":
                        inner.value.pattern = /^(0x[a-fA-F0-9]{40}|.*\.seedao)$/
                        break;
                    case "text":
                    default:
                        break;
                }
            }
        })
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

  if(!prop)return null;
    return <Box>
        <label className="labelLft">{prop?.title}</label>
        <div className="rht">
            {
                item.inputType === "textarea" && <textarea className={prop?.size} {...register(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`, prop?.validate)}  />
            }
            {
                item.inputType !== "textarea" && <input className={prop?.size} {...register(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,  prop?.validate)}  />
            }
        </div>
    </Box>
}
