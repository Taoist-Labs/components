import styled from "styled-components";
import {ChangeEvent, useEffect, useState} from "react";
import {InputProps} from "../type/compontent.type";

const Box = styled.div`
    display: flex;
  align-items: flex-start;
  label{
    margin-right: 10px;
    line-height: 30px;
    flex-shrink: 0;
  }
`

const UlBox = styled.ul`
  flex-grow: 1;
  line-height: 30px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  li{
    display: flex;
    align-items: center;
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

export default function Checkbox({item,register,tableIndex,type,listName,reset,setValue,getValues}:InputProps){

    const [prop,setProp] = useState<any>()
    const [selectOptions,setSelectOptions] = useState<string[]>([]);
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
            const slOp = selectOptions?.filter((inner:string)=>inner === value);
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

        if (selectOptions?.includes(value)) {
            arr = selectOptions.filter((option) => option !== value);

        } else {
            arr =[...(selectOptions??[]), value];
        }

        setSelectOptions(arr);

        setValue(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,arr);


    }

    return <Box>
        <label className="labelLft">{prop?.title}</label>
        <UlBox className={prop?.size}>

            {
                options.map((inner,index)=>(   <li key={index}>
                    <input type="checkbox" id={`${item?.name}_${index}`} value={inner.value} checked={returnChecked(inner.value)} onChange={(e)=>handleSelect(e)} name={`${item?.name}_${index}`}  />
                    <label htmlFor={`${item?.name}_${index}`}>{inner.label}</label>
                </li>))
            }
        </UlBox>
        <input type="hidden" {...register(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,  prop?.validate)}  />
    </Box>
}
