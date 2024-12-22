import {InputProps} from "../type/compontent.type";
import styled from "styled-components";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import Lan from "../utils/lan";
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

    .react-datepicker-popper{
        z-index: 9999;
    }
    .react-datepicker {
        display: flex;
        border: 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .react-datepicker__time-container {
        width: 120px;
        border-left: 1px solid #eee;
    }
    .react-datepicker__header {
        background: #fff;
        border-bottom: 1px solid #eee;
    }
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
        width: 30px;
        height:30px;
        text-align: center;
        line-height: 30px;
    }
    .react-datepicker__day-names{
        margin-top: 20px;
    }

    .react-datepicker-wrapper {
        width: 100%;
    }
    .react-datepicker__triangle{
        display: none;
    }
    .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range{
        background-color: #5200ff;
    }
`

const ErrorTips = styled.div`
    position: absolute;
    color: #FB4E4E;
    bottom: 9px;
    right: 10px;
    font-size: 12px!important;
    white-space: nowrap;
    z-index: 9;
`

export default function DateTime({item,tableIndex,listName,type,reset,setValue,theme,language,control,getValues}:InputProps){
    const [prop,setProp] = useState<any>();
    const [startDate, setStartDate] = useState<string>();

    // useEffect(() => {
    //     const currentDate = formatDate(new Date());
    //     setStartDate(currentDate)
    //
    // }, []);

    function formatDate(date:any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

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
            const date = new Date(item.value);
            setValue(`${type}.${item?.name}`, date);
        }
        setProp(arr)
    }, [item.properties]);


    const handleDateChange = (date:any) => {
        setValue(`${type}.${item?.name}`, date);
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
                        <DatePicker
                            selected={field.value}
                            {...field}
                            dateFormat="yyyy-MM-dd"
                            ref={(ref) => {
                                field.ref({
                                    focus: (ref as any)?.setFocus
                                });
                            }}
                            minDate={new Date()}
                            className={`${!!fieldState.error?'error':''}`}
                            onChange={(date: any) => handleDateChange(date)}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                        {
                            !!fieldState.error && <ErrorTips>
                                <ErrorImg />
                            </ErrorTips>
                        }
                    </>

                )}
            />


        </div>
    </Box>
}
