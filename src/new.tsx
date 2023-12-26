import React, {ChangeEvent, useRef, useState} from 'react';
import Template from "./packages/components/template";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import styled from "styled-components";


const ButtonBox = styled.div`

  padding: 20px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
    margin-bottom: 40px;
`

function New() {
    const childRef = useRef(null);
    const [test,setTest] = useState('');
    const handleInput = (e:ChangeEvent) =>{
        const {value} = e.target as HTMLInputElement;
        setTest(value)
    }


    const handleFormSubmit = (data:any) => {
        console.log({
            ...data,
            test
        })
    };

    const AllSubmit = () =>{
        (childRef.current as any).submitForm()
    }

    return (
        <div>
        <Template DataSource={DataSource} operate="edit" initialItems={initialItems} BeforeComponent={ <input type="text" onChange={handleInput} />} AfterComponent={<div>-----test add after-----</div>}  ref={childRef} onSubmitData={handleFormSubmit} />
            <ButtonBox>

                <button onClick={() => AllSubmit()}>submit</button>
            </ButtonBox>

        </div>
    );
}

export default New;
