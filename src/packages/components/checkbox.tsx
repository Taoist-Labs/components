import React from 'react';
import styled from "styled-components";
import {ChangeEvent, useEffect, useState} from "react";
import {InputProps} from "../type/compontent.type";
import { v4 as uuidv4 } from 'uuid';
import Lan from "../utils/lan";
import {Controller} from "react-hook-form";

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
    width: 100%;
    gap:10px;
    &.error,&.error:focus{
        border: 1px solid #FB4E4E!important;
        border-radius: 8px;
    }
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
      margin-bottom: 0!important;
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

const RhtBox = styled.div`
    position: relative;
    flex-grow: 1;
    
`
const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: -15px;
    font-size: 12px;
    white-space: nowrap;
`

export default function Checkbox({item,tableIndex,type,listName,reset,setValue,getValues,theme,language,control,baseUrl,version,token}:InputProps){

    const [prop,setProp] = useState<any>()
    const id = uuidv4();
    const [dataSource,setDataSource] = useState<any[]>([])
    const [inputName,setInputName] = useState('')
    const [errorTips,setErrorTips] = useState<any>()


    const [selectOptions,setSelectOptions] = useState<any[]>([]);

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
        })
        getSource(item.dataList)
        setProp(arr)

    }, [item.properties]);


    const getSource = (type:string) =>{
        const typeStr = type.split('datasrv/')[1]

        fetch(`${baseUrl}/${version}/data_srv/widget_data?type=${typeStr}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setDataSource(data.data)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const returnChecked = (value:string)=>{

        if(selectOptions){
            const slOp = selectOptions?.filter((inner:any)=>inner.id === value);

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
        setSelectOptions(selectOp?selectOp:[])
        return () =>{
            reset();
        }
    }, []);

    const handleSelect = (e:ChangeEvent) =>{
        const {value} = e.target as HTMLInputElement;

        let arr:any[] = [];

        const containOption = selectOptions?.some((option) => option?.id == value)


        if (selectOptions!= null && containOption) {
            arr = selectOptions.filter((option) => option?.id != value);

        } else {
            const op = dataSource.filter((d) => d?.id == value);
            arr =[...(selectOptions??[]), ...op];
        }
        setSelectOptions(arr);

        // const resultArray = dataSource.filter(obj => arr.includes(obj));
        const resultArray = dataSource.filter(item1 => {
            return arr.some(item2 => item2.id === item1.id);
        });

        setValue(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,resultArray);
    }

    useEffect(()=>{
        setInputName(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)
    },[tableIndex,listName,item])

    const returnError = (str:any) =>{
        setErrorTips(str)
    }

    return <Box>
        <label className="labelLft">{prop?.title}</label>
        <RhtBox>

            <Controller
                name={inputName}
                control={control}
                rules={prop?.validate}
                render={({ field,fieldState }) => (
                    <>
                        <UlBox className={`${prop?.size} ${!!fieldState.error ?"error":""}`} theme={theme?.toString()}>
                            {
                                dataSource.map((inner,index)=>(   <li key={index}>
                                    <input type="checkbox" id={`${id}_${index}`} value={inner.id} checked={returnChecked(inner.id)} onChange={(e)=>handleSelect(e)} name={`${item?.name}_${index}`}  />
                                    <label htmlFor={`${id}_${index}`}>{inner.name}</label>
                                </li>))
                            }
                        </UlBox>

                        <input type="hidden"  {...field} value={getValues(inputName) || ''}  />
                        {
                            !!fieldState.error &&  <ErrorTips>
                                {fieldState.error.message?fieldState.error.message:Lan[language??"zh"]?.inputError}
                            </ErrorTips>
                        }
                    </>

                )}
            />


        </RhtBox>

    </Box>
}
