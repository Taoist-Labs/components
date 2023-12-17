import {UpdateProps} from "../type/compontent.type";
import styled from "styled-components";
import {useEffect, useState , FormEvent} from "react";
import { v4 as uuidv4 } from 'uuid';

const Box = styled.div`
    display: flex;
  align-items: flex-start;
  label{
    margin-right: 10px;
    line-height: 30px;
    flex-shrink: 0;
  }
  .rht{
    flex-grow: 1;
  }
`

const UploadImgBox = styled.label`

`

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
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
    background: #a16eff;
    opacity: 0.8;
    align-items: center;
    justify-content: center;
    display: none;
    cursor: pointer;
    color: #fff;
  }
  &:hover {
    .del {
      display: flex;
    }
  }
  img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }
  
`
const UploadBox  = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`

const UploadFileBox = styled.label`
`


export default function File({item,register,tableIndex,listName,type,setValue}:UpdateProps){

    const [prop,setProp] = useState<any>();
    const id = uuidv4();

    const [imageUrl,setImageUrl] = useState('')

    useEffect(() => {
        if(!item.properties)return;
        let arr:any ={}
        item.properties.map((inner,index)=>{
            arr[inner.name] = inner.value;
        })

        console.log("=====",item)

        setProp(arr)

    }, [item.properties]);


    const updateLogo = (e: FormEvent) => {
        const { files } = e.target as any;
        const url = window.URL.createObjectURL(files[0]);
        getBase64(url);
    };

    const updateFile = (e: FormEvent) =>{
        const { files } = e.target as any;
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




    return <Box>
        <label className="labelLft">{prop?.title}</label>
        {
            item.uploadType === "image" && <UploadImgBox  htmlFor={id}  onChange={(e) => updateLogo(e)}>
                {
                    !!imageUrl && <ImgBox onClick={() => removeUrl()}>
                        <div className="del">
                            remove
                        </div>
                        <img src={imageUrl} alt="" />
                    </ImgBox>
                }
                {
                    !imageUrl && <UploadBox>
                        <input type="file" id={id}  hidden accept=".jpg, .jpeg, .png" className={prop?.size}  />
                        <div> + </div>
                    </UploadBox>
                }

            </UploadImgBox>
        }
        {
            item.uploadType === "file" &&<UploadFileBox htmlFor={id}  onChange={(e) => updateFile(e)}>
                <input type="file" id={id} />
            </UploadFileBox>
        }
        <input type="hidden" {...register(tableIndex!==undefined?`${type}.${listName}.${tableIndex}.${item?.name}`:`${type}.${item?.name}`,  prop?.validate)}  />
    </Box>
}
