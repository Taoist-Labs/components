import {useEffect, useState} from "react";
import styled from "styled-components";
import {Icomponent} from "../type/compontent.type";
import { useForm} from "react-hook-form";
import Input from "./input";
import SelectBox from "./select";
import Table from "./table"

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

export default function Component({listArr}:any){

    const { register, handleSubmit,control } = useForm<any>();
    const onSubmit = (data:any) => {
        console.log((data))
    }
    const [list,setList] = useState<Icomponent>();

    useEffect(() => {
        setList(listArr)
    }, [listArr]);

    return <Box key={list?.id}>
        <TitleBox>{list?.title}</TitleBox>
        <ContentBox>
            {
                list?.content?.map((item,index)=>(
                    <li key={`list_${index}`}>
                        {
                            item.type === "input" && <Input item={item} register={register} />
                        }
                        {
                            item.type === "select" && <SelectBox item={item} control={control} />
                        }
                        {
                            item.type === "table" && <Table item={item} register={register} control={control} />
                        }
                    </li>
                ))
            }
        </ContentBox>
        <button onClick={handleSubmit(onSubmit)}>submit</button>

    </Box>
}
