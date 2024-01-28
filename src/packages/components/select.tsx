import styled from "styled-components";
import React,{forwardRef, useEffect, useState} from "react";
import {UseFormRegister,Controller} from "react-hook-form";
import Select from 'react-select';
import Lan from "../utils/lan";

const Box = styled.div`
    display: flex;
  width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 5px;
  label{
    margin-right: 10px;
    line-height: 40px;
    flex-shrink: 0;
  }
  .innerSelect{
      position: relative;
    flex-grow: 1;
      .error,.error:focus{
          border: 1px solid #FB4E4E!important;
          border-radius: 8px;
      }
      [class$="-control"] {
          border-radius: 8px;
          &:focus,&:focus-visible{
              outline: none!important;
          }
      }
      [class$="-indicatorSeparator"] {
          width: 0;
      }
        [class$="-ValueContainer"] {
            padding-block: 0!important;
      }
  }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: -20px;
    font-size: 12px;
    white-space: nowrap;
`


const SelectBox =forwardRef<HTMLSelectElement, any & ReturnType<UseFormRegister<any>>>(({item,control,tableIndex,listName,type,reset,setValue,theme,baseUrl,version,token,language,errors }, ref) => {

    const [prop, setProp] = useState<any>();
    const [dataSource,setDataSource] = useState<any[]>([])
    const [inputName,setInputName] = useState('')


    useEffect(() => {
        if (!item.properties) return;
        let arr: any = {}
        item.properties.map((inner:any) => {
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

    // useEffect(() => {
    //     if(tableIndex===undefined){
    //         setValue(`${type}.${item?.name}`,item?.value)
    //     }
    //     return () =>{
    //         reset();
    //     }
    // }, []);

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
    useEffect(()=>{
        setInputName(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)
    },[tableIndex])


    if(!prop)return null;
  return(
      <Box>
          <label  className="labelLft">{prop?.title}</label>
          <div>

              <Controller
                  name={inputName}
                  control={control}
                  defaultValue=''
                  rules={prop.validate}
                  render={({ field,fieldState }) => (
                      <div className="innerSelect">
                          <Select
                              {...field}
                              className={!!fieldState.error?'error':''}
                              options={dataSource}
                              styles={customStyles}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              theme={customTheme}
                              isSearchable={false}
                          />
                          {
                              !!fieldState.error &&  <ErrorTips>
                                  {fieldState.error.message?fieldState.error.message:Lan[language??"zh"]?.selectError}
                              </ErrorTips>
                          }
                      </div>

                  )}
              />


          </div>

      </Box>
  )
});

export default SelectBox;
