import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";

import Lan from "../utils/lan";
import { MdEditor } from 'md-editor-rt';
import { v4 as uuidv4 } from 'uuid';


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
    bottom: -20px;
    font-size: 12px!important;
    white-space: nowrap;
    z-index: 999;
`

export default function RichText({item,tableIndex,listName,type,reset,setValue,theme,language,control,getValues}:InputProps){
    const [prop,setProp] = useState<any>();
    const id = uuidv4();

    useEffect(() => {

        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
        })

        if(item.value){
            setValue(`${type}.${item?.name}`, item.value);
        }else{

            let str =`<!---${arr?.hint}--->`;
            setValue(`${type}.${item?.name}`, arr?.hint?str:"");
        }

        setProp(arr)
    }, [item.properties]);


    const handleEditorChange = (text:any) => {

        setValue(`${type}.${item?.name}`, text);
    };



    return <Box theme={theme?.toString()}>
        {/*<label className="labelLft">{prop?.title}</label>*/}
        <div className="rht">
            <Controller
                control={control}
                name={`${type}.${item?.name}`}
                rules={prop?.validate}
                render={({ field,fieldState }) => (
                    <>
                        <MdEditor
                            {...field}
                            toolbarsExclude={['github', 'save']}
                            modelValue={field.value}
                            editorId={`md_${id}`}
                            onChange={handleEditorChange}
                            theme={theme ? 'dark' : 'light'}
                            placeholder={prop?.hint}
                        />
                        {
                            !!fieldState.error && <ErrorTips>
                                {fieldState.error.message?fieldState.error.message:Lan[language??"zh"]?.inputError}
                            </ErrorTips>
                        }
                    </>

                )}
            />


        </div>
    </Box>
}
