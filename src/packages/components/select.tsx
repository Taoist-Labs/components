import styled from "styled-components";
import React,{forwardRef, useEffect, useState} from "react";
import {UseFormRegister,Controller} from "react-hook-form";
import Select from 'react-select';

const Box = styled.div`
    display: flex;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
  label{
    margin-right: 10px;
    line-height: 40px;
    flex-shrink: 0;
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
  .innerSelect{
    flex-grow: 1;
      [class$="-control"] {
          border-radius: 8px;
          &:focus,&:focus-visible{
              outline: none!important;
          }
      }
      [class$="-indicatorSeparator"] {
          width: 0;
      }
  }
`


const SelectBox =forwardRef<HTMLSelectElement, any & ReturnType<UseFormRegister<any>>>(({item,control,tableIndex,listName,type,reset,setValue,theme }, ref) => {

    const [prop, setProp] = useState<any>()


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    useEffect(() => {
        if (!item.properties) return;
        let arr: any = {}
        item.properties.map((inner:any) => {
            arr[inner.name] = inner.value;
        })
        console.log(item.dataList)
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

    const customTheme = (theme:any) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: 'rgba(82, 0, 255, 0.50)',
            primary25: 'rgba(82, 0, 255, 0.50)',
        },
    });

    const customStyles = {
        control: (provided:any) => ({
            ...provided,
            color: theme?'#fff':'#1A1323',
            background: theme?'#1A1323':'#fff',
            border:theme?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)",
            '&:hover': {
                background:theme?'#1A1323':'#fff',
            },
        }),
        singleValue: (provided:any) => ({
            ...provided,
            color: theme?'#fff':'#1A1323',
        }),
        menu: (provided:any) => ({
            ...provided,
            backgroundColor: theme?'#1A1323':'#fff',
        }),
        option: (provided:any,state:any) => ({
            ...provided,
            color: theme?'#fff':'#1A1323',
            paddingBlock:"15px",
            background: state.isSelected ? (theme?'#1d1230':'rgba(82, 0, 255, 0.08)') :(theme?'#1A1323':'#fff'),
            '&:hover': {
                color: theme?'#fff':'#1A1323',
                background:theme?'#1A1323':'#fff'
            },
        }),
    };


    if(!prop)return null;
  return(
      <Box>
          <label  className="labelLft">{prop?.title}</label>


          <div className={prop?.size}>
              <Controller
                  name={tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`}
                  control={control}
                  render={({ field }) => (
                      <Select
                          className="innerSelect"
                          {...field}
                          options={options}
                          styles={customStyles}
                          theme={customTheme}
                          isSearchable={false}
                      />
                  )}
              />
          </div>

      </Box>
  )
});

export default SelectBox;
