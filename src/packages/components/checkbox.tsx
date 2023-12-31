import React from 'react';
import styled from "styled-components";
import {ChangeEvent, useEffect, useState} from "react";
import {InputProps} from "../type/compontent.type";
import { v4 as uuidv4 } from 'uuid';

const Box = styled.div`
    display: flex;
  align-items: flex-start;
  label{
    margin-right: 10px;
    line-height: 30px;
    flex-shrink: 0;
  }
`

const UlBox = styled.ul<{theme?:string}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
    input{
        accent-color: #5200ff;
        box-sizing: border-box;
        width: 18px;
        height: 18px!important;
        min-height: 18px!important;
        border-radius: 4px!important;
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    }
  li{
    display: flex;
    align-items: center;
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
      background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
      border-radius: 8px;
      padding: 0 12px;
      height: 40px;
    label{
      padding-left: 10px;
    }
  
  }
  &.sm{
    li{
      width: 33%;
    }
  }
  &.md{
    li{
      width: 50%;
    }
  }
  &.lg{
    li{
      width: 100%;
    }
  }

`

export default function Checkbox({item,register,tableIndex,type,listName,reset,setValue,getValues,theme}:InputProps){

    const [prop,setProp] = useState<any>()
    const id = uuidv4();
    const [selectOptions,setSelectOptions] = useState<any[]>([]);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
        })
        setProp(arr)

    }, [item.properties]);

    const returnChecked = (value:string)=>{

        if(selectOptions){
            const slOp = selectOptions?.filter((inner:any)=>inner.value === value);

            return !!slOp.length
        }else{
            return false;
        }
    }

    useEffect(() => {

        if(tableIndex===undefined){
            setValue(`${type}.${item?.name}`,item?.value)
        }

        let selectOp = getValues(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`);
        setSelectOptions(selectOp)
        return () =>{
            reset();
        }
    }, []);

    const handleSelect = (e:ChangeEvent) =>{
        const {value} = e.target as HTMLInputElement;

        let arr:string[] = [];

        const containOption = selectOptions?.some((option) => option?.value === value)

        if (selectOptions!=null && containOption) {
            arr = selectOptions.filter((option) => option?.value !== value);

        } else {
            const op = options.filter((option) => option?.value === value);
            arr =[...(selectOptions??[]), ...op];
        }

        setSelectOptions(arr);

        const resultArray = options.filter(obj => arr.includes(obj.value));


        setValue(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,resultArray);


    }

    return <Box>
        <label className="labelLft">{prop?.title}</label>
        <UlBox className={prop?.size} theme={theme?.toString()}>

            {
                options.map((inner,index)=>(   <li key={index}>

                    <input type="checkbox" id={`${id}_${index}`} value={inner.value} checked={returnChecked(inner.value)} onChange={(e)=>handleSelect(e)} name={`${item?.name}_${index}`}  />
                    <label htmlFor={`${item?.name}_${index}`}>{inner.label}</label>
                </li>))
            }
        </UlBox>
        <input type="hidden" {...register(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,  prop?.validate)}  />
    </Box>
}
