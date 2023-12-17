import {useEffect, useState,ForwardedRef} from "react";
import styled from "styled-components";
import {ChildMethods, Icomponent} from "../type/compontent.type";

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

interface ChildProps {
    forwardedRef?: ForwardedRef<ChildMethods>;
    listArr:any;
    register:any;
    control:any;
    setValue?:any
}


const Component = ({listArr,register,control,setValue}:ChildProps) =>{
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
                            item.type === "input" && <Input item={item} register={register} type={list?.type} />
                        }
                        {
                            item.type === "select" && <SelectBox item={item} control={control} type={list?.type} />
                        }
                        {
                            item.type === "table" && <Table item={item} register={register} control={control} type={list?.type} setValue={setValue} />
                        }
                        {
                            item.type === "file" && <File item={item} register={register}  type={list?.type} setValue={setValue} />
                        }
                        {
                            item.type === "checkbox" && <CheckBox item={item} register={register} type={list?.type} />
                        }
                    </li>
                ))
            }
        </ContentBox>
        {/*<button onClick={handleSubmit(onSubmit)}>submit</button>*/}

    </Box>
}

export default Component;
