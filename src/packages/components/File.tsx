import {UpdateProps} from "../type/compontent.type";
import styled from "styled-components";
import React ,{useEffect, useState , FormEvent} from "react";
import { v4 as uuidv4 } from 'uuid';
import Add from "../svg/add";
import Del from "../svg/delete";
import FileImg from "../svg/file";
import Lan from "../utils/lan";
import {Controller} from "react-hook-form";

const Box = styled.div`
    display: flex;
  align-items: flex-start;
    position: relative;
  label{
    margin-right: 10px;
    flex-shrink: 0;
      
  }
    .innerAll{
        display: flex;
        flex-direction: column;
        margin-right: 0;
        width: 100%;
    }
    input{
        min-height: 1px;
    }
  .rht{
    flex-grow: 1;

  }
    .inner{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        span{
            padding-top: 5px;
        }
    }
`

const UploadImgBox = styled.label`
    display: flex;
    justify-content: flex-start;

`

const ImgBox = styled.div<{ size: string}>`
    width: ${props => props.size ==="sm" ? "126px":"224px"};
    height:126px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .del {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
      background: rgba(255,255,255,0.5);
    opacity: 0.8;
    align-items: center;
    justify-content: center;
    display: none;
    cursor: pointer;
    color: #000;
      border-radius: 8px;
  }
  &:hover {
    .del {
      display: flex;
    }
  }
  img{
      width: ${props => props.size ==="sm" ? "126px":"224px"};
    height:126px;
    object-fit: cover;
    object-position: center;
      border-radius: 8px;
  }
  
`
const UploadBox  = styled.div<{ size: string,theme?:string }>`
    width: ${props => props.size ==="sm" ? "126px":"224px"};
    height:126px;
  border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
    &:hover{
        background: rgba(82, 0, 255, 0.05);
    }
    &.error,&.error:focus{
        border: 1px solid #FB4E4E!important;
    }
    
`

const UploadFileBox = styled.label <{ bgtheme?: string }>`
    //background: #F9F9F9;
    background: ${props=> props.bgtheme === 'true'?"#2D2736":"#F9F9F9"};
    flex-grow: 1;
    
    display: flex;
    align-items: center;
    padding: 8px;
    .fileBtn{
        background: ${props=> props.bgtheme === 'true'?"#1A1323":"#F9F9F9"};
        border-radius: 8px;
        border:${props=>props.bgtheme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
        width: 120px;
        font-weight: 600;
        font-size: 14px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        margin-right: 10px;
    }
    .block{
        padding-left: 5px; 
    }
    &.error,&.error:focus{
        border: 1px solid #FB4E4E!important;
    }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: -15px;
    font-size: 12px;
    white-space: nowrap;
`
export default function File({item,tableIndex,listName,type,setValue,reset,getValues,theme,language,errors,control}:UpdateProps){

    const [prop,setProp] = useState<any>();
    const id = uuidv4();
    const [imageUrl,setImageUrl] = useState('')
    const [fileUrl,setFileUrl] = useState('')
    const [inputName,setInputName] = useState('')

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner)=>{
            arr[inner.name] = inner.value;
        })

        setProp(arr)

    }, [item.properties]);


    const updateLogo = (e: FormEvent) => {
        const { files } = e.target as any;
        const url = window.URL.createObjectURL(files[0]);
        getBase64(url);
    };

    const updateFile = (e: FormEvent) =>{
        const { files } = e.target as any;
        setFileUrl(files[0].name)
        setValue(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,files[0].name)
    }

    const getBase64 = (imgUrl: string) => {
        window.URL = window.URL || window.webkitURL;
        const xhr = new XMLHttpRequest();
        xhr.open('get', imgUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (this.status === 200) {
                const blob = this.response;
                const oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    const { result } = e.target as any;
                    setImageUrl(result);
                    setValue(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,imgUrl)
                };
                oFileReader.readAsDataURL(blob);
            }
        };
        xhr.send();

    };

    const removeUrl = () => {
        setImageUrl('');
    };


    useEffect(() => {
        if(tableIndex===undefined){
            setValue(`${type}.${item?.name}`,item?.value)
        }

        let url = getValues(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)

        if(item.uploadType === "image"){
            setImageUrl(url)
        }else{
            console.log(url)
        }

        return () =>{
            reset();
        }
    }, []);

    useEffect(()=>{
        setInputName(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`)
    },[tableIndex,listName,item])

    return <Box>
        <label className="labelLft">{prop?.title}</label>
        <div className="innerAll">

            <Controller
                name={inputName}
                control={control}
                defaultValue=''
                rules={prop?.validate}
                render={({ field,fieldState }) => (
                    <>
                        {
                            item.uploadType === "image" && <UploadImgBox  htmlFor={id}  onChange={(e) => updateLogo(e)}>
                                {
                                    !!imageUrl && <ImgBox onClick={() => removeUrl()} size={prop?.size}>
                                        <div className="del">
                                            <div className="inner">
                                                <Del />
                                                <span>{Lan[language??"zh"]?.remove}</span>
                                            </div>

                                        </div>
                                        <img src={imageUrl} alt="" />
                                    </ImgBox>
                                }
                                {
                                    !imageUrl && <UploadBox size={prop?.size} theme={theme?.toString()}  className={ !!fieldState.error ?"error":""}>
                                        <input type="file" id={id}  hidden accept=".jpg, .jpeg, .png" className={prop?.size}  />
                                        <div className="inner">
                                            <Add theme={theme} />
                                            <span>{Lan[language??"zh"]?.upload}</span>
                                        </div>

                                    </UploadBox>
                                }

                            </UploadImgBox>
                        }
                        {
                            item.uploadType === "file" && <UploadFileBox className={ !!fieldState.error ?"error":""} htmlFor={id} bgtheme={theme?.toString()} onChange={(e) => updateFile(e)} >
                                <input type="file" id={id} hidden/>
                                <span className="fileBtn">{Lan[language??"zh"]?.select}</span>
                                {
                                    !!fileUrl&&  <FileImg />
                                }

                                <span className="block">{fileUrl}</span>
                            </UploadFileBox>
                        }
                        <input type="hidden"  {...field} value={getValues(inputName) || ''} />
                        {
                            !!fieldState.error &&  <ErrorTips>
                                {fieldState.error.message?fieldState.error.message:Lan[language??"zh"]?.fileError}
                            </ErrorTips>
                        }
                    </>

                )}



        />
        </div>

    </Box>
}
