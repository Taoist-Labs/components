import styled from "styled-components";
import {forwardRef, useEffect, useState} from "react";
import {UseFormRegister,Controller} from "react-hook-form";
import Select from 'react-select';

const Box = styled.div`
    display: flex;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
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
  .innerSelect{
    flex-grow: 1;
  }
`


const SelectBox =forwardRef<HTMLSelectElement, any & ReturnType<UseFormRegister<any>>>(({item,control,tableIndex,listName,type }, ref) => {

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


    if(!prop)return null;
  return(
      <Box>
          <label  className="labelLft">{prop?.title}</label>

          <Controller
              name={tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                  <Select
                      className="innerSelect"
                      {...field}
                      options={options}
                  />
              )}
          />
      </Box>
  )
});

export default SelectBox;
