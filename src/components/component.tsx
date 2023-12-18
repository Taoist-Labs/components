import {useEffect, useState,ForwardedRef} from "react";
import styled from "styled-components";
import {ChildMethods, ChildProps, Icomponent, Item} from "../type/compontent.type";

import Input from "./input";
import SelectBox from "./select";
import Table from "./table";
import File from "./File";
import CheckBox from "./checkbox"

const Box = styled.div`
    background: #F5F5F5;
  padding: 10px;
`

const TitleBox = styled.div`
    font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
  text-align: center;
`

const ContentBox = styled.ul`
    padding-top: 10px;
  li{
    margin-bottom: 20px;
  }
`

const Component = ({listArr,register,control,setValue,reset,data,getValues}:ChildProps) =>{
    const [list,setList] = useState<Icomponent>();

    const searchParams = new URLSearchParams(window.location.search);
    const operate = searchParams.get('operate');

    useEffect(() => {
        listArr?.content.map((item:Item)=>{
            if(!!data){
                item.value = data[item.name];
            }else{
                item.value = null;
            }


        })
        setList(listArr)
    }, [listArr,operate]);


    return <Box key={list?.id}>
        <TitleBox>{list?.title}</TitleBox>
        <ContentBox>
            {
                list?.content?.map((item,index)=>(
                    <li key={`list_${index}`}>
                        {
                            item.type === "input" && <Input item={item} register={register} type={list?.type} reset={reset} setValue={setValue} />
                        }
                        {
                            item.type === "select" && <SelectBox item={item} control={control} type={list?.type} reset={reset} setValue={setValue} />
                        }
                        {
                            item.type === "table" && <Table item={item} register={register} control={control} type={list?.type} setValue={setValue} reset={reset} getValues={getValues} />
                        }
                        {
                            item.type === "file" && <File item={item} register={register}  type={list?.type} setValue={setValue} reset={reset} getValues={getValues} />
                        }
                        {
                            item.type === "checkbox" && <CheckBox item={item} register={register} type={list?.type} reset={reset} setValue={setValue} getValues={getValues} />
                        }
                    </li>
                ))
            }
        </ContentBox>

    </Box>
}

export default Component;
