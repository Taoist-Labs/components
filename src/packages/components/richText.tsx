import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";

import Lan from "../utils/lan";
import { MdEditor } from 'md-editor-rt';
import { v4 as uuidv4 } from 'uuid';
import ErrorImg from "../svg/error";


const Box = styled.div<{theme?:string}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  label{
    margin-right: 10px;
    line-height: 40px;
      padding-left: 5px;

  }
    input,textarea{
        height: 40px;
        border-radius: 8px;
        width: 100%;
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
        background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
        color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
        padding: 0 12px;
        box-sizing: border-box;
        &:hover,&:focus{
            border: 1px solid rgba(82, 0, 255, 0.50);
            outline: none;
        }
    }
    textarea{
        resize: none;
        min-height: 120px;
        padding: 12px;
    }

  .rht{
      position: relative;
      width: 100%;
  }
    .error,.error:focus{
        border: 1px solid #FB4E4E;
    }

    .cm-scroller {
        background: ${props=>props.theme === 'true'?"#1A1323":"#F9F9F9"};
    }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: 30px;
    left: 10px;
    font-size: 12px!important;
    white-space: nowrap;
    z-index: 9;
`

const LoadingFile = styled.div<{theme?:string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: ${props=>props.theme === 'true'?"rgba(26,19,35,0.2)":'rgba(255,255,255,0.2)'};
    backdrop-filter: blur(2px);
    .loader {
        width: 30px;
        aspect-ratio: 4;
        --_g: no-repeat radial-gradient(circle closest-side,#5200FF 90%,#5200FF00);
        background:
                var(--_g) 0%   50%,
                var(--_g) 50%  50%,
                var(--_g) 100% 50%;
        background-size: calc(100%/3) 100%;
        animation: l7 1s infinite linear;
    }
    @keyframes l7 {
        33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
        50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
        66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
    }
`


export default function RichText({item,tableIndex,listName,type,reset,setValue,theme,language,control,getValues,baseUrl,version}:InputProps){
    const [prop,setProp] = useState<any>();
    const id = uuidv4();
    const [loading,setLoading] = useState(false);

    useEffect(() => {

        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
            if(inner.name === "validate" && inner.value.pattern){
                inner.value.pattern = new RegExp(inner.value.pattern);
            }
        })

        if(item.value){
            setValue(`${type}.${item?.name}`, item.value);
        }else{

            let str =`<!-- ${arr?.hint} -->`;
            setValue(`${type}.${item?.name}`, arr?.hint?str:"");
        }

        setProp(arr)
    }, [item.properties]);


    const handleEditorChange = (text:any) => {

        setValue(`${type}.${item?.name}`, text);
    };

    const uploadPic = async (files: any[], callback: any) => {
        setLoading(true);
        const file = files[0];

        try{

            const blob = new Blob([file], { type: file.type });

            const params = new URLSearchParams();
            params.append('bucket', "seedao-os-superapp");

            const parts = file.name.split('.');

            const extension = parts[parts.length - 1];
            params.append('filename', `/proposal_images/${uuidv4()}.${extension}`);
            params.append('type', file.type);

            let rt = await fetch(`${baseUrl}/${version}/url_for_uploading_s3?${params.toString()}`, {
                method: 'GET',
            })
            const data = await rt.json();

            let fileRt=await fetch(data.data, {
                method: 'PUT',
                headers:{
                    'Content-Type':file.type,
                },
                body: blob
            });

            if(fileRt.status === 200){
                let str = data.data.split("?")[0];

                callback([str]);

            }else{
                throw (new Error("failed"))
            }
        }catch (e) {
            console.error(e)
        }finally {
            setLoading(false)
        }
        // const urlObjArr = await UploadPictures(files[0]);

        // callback([urlObjArr]);
    };


    return <Box theme={theme?.toString()}>
        {/*<label className="labelLft">{prop?.title}</label>*/}
        <div className="rht">
            {
                loading && <LoadingFile theme={theme?.toString()}>
                    <div className="loader"/>
                </LoadingFile>
            }

            <Controller
                control={control}
                name={`${type}.${item?.name}`}
                rules={prop?.validate}
                render={({field, fieldState}) => (
                    <>

                        <MdEditor
                            {...field}
                            toolbarsExclude={['github', 'save']}
                            modelValue={field.value}
                            editorId={`md_${id}`}
                            onChange={handleEditorChange}
                            theme={theme ? 'dark' : 'light'}
                            placeholder={prop?.hint}
                            className={`${!!fieldState.error ? 'error' : ''}`}
                            onUploadImg={(files, callBack) => uploadPic(files, callBack)}
                        />
                        {
                            !!fieldState.error && <ErrorTips>
                                <ErrorImg/>
                            </ErrorTips>
                        }
                    </>

                )}
            />


        </div>
    </Box>
}
