import React, {ChangeEvent, useRef, useState} from 'react';
import Template from "./packages/components/template";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import styled from "styled-components";

const AllBox = styled.div`
    padding: 24px 32px;
    background: #f5f5f5;
`

const TopBox = styled.div`
    width: 100%;
    height: 77px;
    background: #f00;
    position: fixed;
    z-index: 99;
`

const Main = styled.div`

    height: 100vh;

`

const ButtonBox = styled.div`
    background: #fff;
    position: sticky;
    margin:-24px 0 0 -32px;
    width: calc(100% + 64px);
    top:77px;
    height: 64px;
    z-index: 99;
    box-sizing: border-box;
    padding-right: 372px;
    box-shadow: 0px 4px 8px 0px rgba(138, 134, 146, 0.10);
    border-top:1px solid var(--bs-border-color);
`

const Box = styled.div`
    background: #1A1323;
    width: calc(100% - 410px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin: 40px 40px 0 20px;
    
    
`

function New() {
    const childRef = useRef(null);
    const [test,setTest] = useState('');
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(hash.split('?')[1]);
    const operate = searchParams.get('operate')

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
        <>
            <TopBox>
                ddd
            </TopBox>
            <AllBox>


            <Main>
            <ButtonBox>

                <button onClick={() => AllSubmit()}>submit</button>
            </ButtonBox>
            <Box>
                <Template theme={true} DataSource={DataSource} operate={operate} initialItems={initialItems} BeforeComponent={ <input type="text" onChange={handleInput} />} AfterComponent={<div>-----test add after-----</div>}  ref={childRef} onSubmitData={handleFormSubmit} />


            </Box>
        </Main>
            </AllBox>
        </>


    );
}

export default New;
