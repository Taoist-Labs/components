import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ChildProps, Icomponent, Item} from "../type/compontent.type";

import Input from "./input";
import SelectBox from "./select";
import Table from "./table";
import File from "./File";
import CheckBox from "./checkbox"
import DateTime from "./dateTime";
import RichText from "./richText";


const Box = styled.div`
  padding: 12px 24px;
`

const TitleBox = styled.div`
    font-weight: bold;
  padding-bottom: 20px;
    font-size: 16px;
    margin-top: 10px;

    text-align: left;
`

const ContentBox = styled.ul`
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    &>li{
    margin-bottom: 20px;
      &.sm{
          width: 33.3333%;
      }
      &.md{
          width:50%;
      }
      &.lg{
          width: 100%;
      }
  }
`

const Tips = styled.div`
    font-size: 12px;
    opacity: 0.6;
`

const Component = ({listArr,control,setValue,reset,data,getValues,theme,language,name,baseUrl,version,token,errors,watch,setError,clearErrors}:ChildProps) =>{
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
        listArr.name = name ?? '';
        setList(listArr)
    }, [listArr,operate]);

    const returnClass = (item:any) =>{
        if(item.type === "table")
        return "lg";
        const arr = item?.properties.filter((i:any)=>i?.name === "size");
        return (item.type === "checkbox" || (item.type === "file" && item.uploadType === "image"))?"lg":arr[0]?.value;
    }

    return <Box key={list?.id}>
        <TitleBox>{list?.title}</TitleBox>
        {/*{*/}
        {/*    !!list?.desc &&  <Tips>{list?.desc}</Tips>*/}
        {/*}*/}
        <ContentBox>
            {
                list?.content?.map((item,index)=>(
                    <li key={`list_${index}`} className={returnClass(item)}>

                        {
                            item.type === "input" && <Input
                                item={item}
                                control={control}
                                type={list?.name}
                                reset={reset}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                language={language}
                                setError={setError}
                                getValues={getValues}
                                theme={theme} />
                        }
                        {
                            item.type === "datepicker" && <DateTime
                                item={item}
                                control={control}
                                type={list?.name}
                                reset={reset}
                                setValue={setValue}
                                language={language}
                                getValues={getValues}
                                theme={theme}
                            />
                        }
                        {
                            item.type === "richText" && <RichText
                                item={item}
                                control={control}
                                type={list?.name}
                                reset={reset}
                                setValue={setValue}
                                language={language}
                                getValues={getValues}
                                theme={theme}
                            />
                        }
                        {
                            item.type === "select" && <SelectBox
                                item={item}
                                control={control}
                                type={list?.name}
                                reset={reset}
                                setValue={setValue}
                                theme={theme}
                                baseUrl={baseUrl}
                                version={version}
                                token={token}
                                getValues={getValues}
                                errors={errors}
                                language={language}
                            />
                        }
                        {
                            item.type === "table" && <Table
                                item={item}
                                control={control}
                                type={list?.name}
                                setValue={setValue}
                                reset={reset}
                                clearErrors={clearErrors}
                                getValues={getValues}
                                theme={theme}
                                setError={setError}
                                watch={watch}
                                language={language}
                                baseUrl={baseUrl}
                                version={version}
                                token={token}
                            />
                        }
                        {
                            item.type === "file" && <File
                                item={item}
                                control={control}
                                type={list?.name}
                                setValue={setValue}
                                reset={reset}
                                baseUrl={baseUrl}
                                version={version}
                                getValues={getValues}
                                theme={theme}
                                language={language} />
                        }
                        {
                            item.type === "checkbox" && <CheckBox
                                item={item}
                                control={control}
                                type={list?.name}
                                reset={reset}
                                setValue={setValue}
                                getValues={getValues}
                                baseUrl={baseUrl}
                                version={version}
                                language={language}
                                token={token}
                                theme={theme}  />
                        }
                    </li>
                ))
            }
        </ContentBox>

    </Box>
}

export default Component;
