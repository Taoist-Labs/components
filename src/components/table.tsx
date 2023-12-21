import styled from "styled-components";
import {useEffect, useState} from "react";
import {TableProps, thProps} from "../type/compontent.type";
import Input from "./input";
import SelectBox from "./select";
import { useFieldArray } from 'react-hook-form';
import File from "./File";
import CheckBox from "./checkbox";


const Box = styled.div`
    display: flex;
  align-items: flex-start;
  flex-direction: column;
  table{
    width: 100%;
    td,th{
      height: 40px;
      border-bottom: 1px solid rgba(0,0,0,0.3);
      padding: 5px 20px;
    }
    .labelLft{
        display: none;
    }
  }

  .sm,.md,.lg{
    width: 100%!important;
    li{
      width: 100%;
    }
  }

`


const ThBox = styled.th<thProps>`
    width: ${props => props.width+ "%"};
`

const AddButton = styled.span`
    padding: 5px 20px;
  background: #fff;
  cursor: pointer;
  margin: 0 5px;
`

const BtnGroup = styled.div`
    width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Table({item,register,control,type,setValue,reset,getValues}:TableProps){

    const [column,setColumn] = useState(0);
    const [width,setWidth] = useState<number[]>([]);
    const [header,setHeader] = useState<string[]>([]);
    const [rows,setRows] = useState<any[]>([]);
    const [dataItem,setDataItem] = useState<any>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${type}.${item?.name}`,
        shouldUnregister:true
    });


    useEffect(() => {
        if(!item.style || !item.rows.length)return;
        const {column,width,tHeader} = item.style;
        setRows(item.rows)
        setColumn(column);
        setWidth(width);
        setHeader(tHeader);
        let obj:any = {};
        item.rows.map((inner:any)=>{
            obj[inner.name] = "";
        })

        if(item?.value?.length){
            item.value?.map((inner:any)=>{
                append(inner)
            })
        }else{
            append(dataItem)
        }
        setDataItem(obj);

    }, [item]);




    useEffect(() => {
        return () =>{
            reset();
        }
    }, []);

    if(!item)return null;
    return <Box>
        <table>
            <thead>
                <tr>
                    {
                        [...Array(column)].map((col,index)=>(<ThBox key={`thead_${index}`} width={width[index]}>
                            {
                                header[index]
                            }
                        </ThBox>))
                    }
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                fields.map((field,innerIndex)=>( <tr key={field.id}>
                    {
                        [...Array(column)].map((r,index)=>(<td key={`tbody_${index}`}>
                            {
                                rows[index].type === "input" && <Input item={rows[index]} type={type} listName={item?.name} tableIndex={innerIndex} register={register} reset={reset} setValue={setValue} />
                            }
                            {
                                rows[index].type === "select" && <SelectBox item={rows[index]} type={type} listName={item?.name} tableIndex={innerIndex} control={control} reset={reset} setValue={setValue} />
                            }

                            {
                                rows[index].type === "file" && <File item={rows[index]} type={type} listName={item?.name} tableIndex={innerIndex} register={register} setValue={setValue} reset={reset} getValues={getValues} />
                            }
                            {
                                rows[index].type === "checkbox" && <CheckBox item={rows[index]} listName={item?.name} tableIndex={innerIndex} register={register} type={type} reset={reset}  setValue={setValue} getValues={getValues} />
                            }
                        </td>))
                    }
                    <td>
                        <BtnGroup>
                            <AddButton onClick={() => append(dataItem)}>+</AddButton>
                            <AddButton onClick={() =>remove(innerIndex)}>-</AddButton>
                        </BtnGroup>
                    </td>
                </tr>))
            }
            </tbody>
        </table>




    </Box>
}
