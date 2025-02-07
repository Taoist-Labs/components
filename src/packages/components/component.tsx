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
import BatchTable from "./batchTable";
import * as XLSX from 'xlsx';
import Lan from "../utils/lan";


const Box = styled.div`
  padding: 12px 24px;
    .table{
        width: 100%;
    }
`

const TitleBox = styled.div`
    font-weight: bold;
  padding-bottom: 20px;
    font-size: 16px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const TipsBox = styled.div`
`

const BackNav = styled.div<{theme?:string}>`
  
    position: relative;
    z-index: 9;
    display: inline-block;
    padding:10px;
    border-radius: 5px;
    background: ${props=> props.theme === 'true'?"#2D2736":"rgba(82, 0, 255, 0.08)"};
    margin-bottom: 10px;
    margin-left: 5px;
`

const Component = ({listArr,control,setValue,reset,data,getValues,theme,language,name,baseUrl,version,token,errors,watch,setError,clearErrors,operate,movitationSum,rpc}:ChildProps) =>{
    const [list,setList] = useState<Icomponent>();
    const [batchShow,setBatchShow] = useState<boolean>(false);
    const [showType,setShowType] = useState<number>(1);
    const[ itemList,setItemList] = useState<any[]>([]);

    // const searchParams = new URLSearchParams(window.location.search);
    // const operate = searchParams.get('operate');

    useEffect(() => {

        setBatchShow(!!list?.batchImport)
    }, [list?.batchImport]);

    useEffect(() => {
        listArr?.content.map((item:Item)=>{
            if(!!data){
                item.value = data[item.name];
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

    const showImport = (type:number,ilist?:any[]) =>{
        setBatchShow(false)

        setItemList(ilist??[])
        setShowType(type)
    }

    const getTemplateFileUrl = (language?: string) => {
        return `https://superapp-backend-prod.s3.ap-northeast-1.amazonaws.com/templates/proposal_upload_template_${
            language || 'en'
        }.xlsx`;
    };

    const downloadFile = async () => {
        window.open(getTemplateFileUrl(language), '_blank');
    };

    const handleBack = (index:number) =>{
        setBatchShow(true)
        let arrObj = JSON.parse(JSON.stringify(list));

        delete  arrObj?.content[index].value;
        setList(arrObj)

    }


    return <Box key={list?.id}>
        <TitleBox>
            <span>{list?.title}</span>
            {
                list?.batchImport && <span onClick={downloadFile}>下载模版</span>
            }

        </TitleBox>
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
                                rpc={rpc}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                language={language}
                                setError={setError}
                                getValues={getValues}
                                theme={theme}/>
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
                                baseUrl={baseUrl}
                                version={version}
                            />
                        }
                        {
                            item.type === "select" && <SelectBox
                                item={item}
                                control={control}
                                type={list?.name}
                                operate={operate}
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
                            item.type === "table" && typeof list?.batchImport === "boolean" && (!batchShow || !!item?.value) && <BackNav onClick={()=>handleBack(index)}>
                                &lt; {Lan[language ?? "zh"]?.back}
                            </BackNav>
                        }

                        {
                        item.type === "table" && batchShow && !item?.value && <TipsBox>
                                <BatchTable
                                    item={item}
                                    showImport={showImport}
                                    language={language}
                                />
                            </TipsBox>
                        }

                        {
                            item.type === "table" && (!batchShow || !!item?.value) && <Table
                                item={showType === 1 ? item : itemList}
                                control={control}
                                type={list?.name}
                                setValue={setValue}
                                reset={reset}
                                clearErrors={clearErrors}
                                getValues={getValues}
                                theme={theme}
                                setError={setError}
                                watch={watch}
                                rpc={rpc}
                                language={language}
                                baseUrl={baseUrl}
                                version={version}
                                token={token}
                                movitationSum={movitationSum}
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
                                language={language}/>
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
                                theme={theme}/>
                        }
                    </li>
                ))
            }
        </ContentBox>

    </Box>
}

export default Component;
