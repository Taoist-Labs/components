import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Template from "./packages/components/template";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import styled from "styled-components";
import Preview from "./packages/components/Preview";
import InitialItem from "./json/initialItem";
import CreateProject from "./json/createProject.json";
import Motivation from "./json/motivation.json";
import AllJson from "./json/all.json";
import 'md-editor-rt/lib/style.css';
import ErrorImg from "./packages/svg/error";
import 'react-datepicker/dist/react-datepicker.css';

const AllBox = styled.div`
    padding: 24px 32px;
    background: #f5f5f5;
`

const TopBox = styled.div`
    width: 100%;
    height: 77px;
    position: fixed;
    z-index: 95;
`

const Main = styled.div`

    height: 100vh;

`

const ButtonBox = styled.div`
    background: #fff;
    position: sticky;
    margin: -24px 0 0 -32px;
    width: calc(100% + 64px);
    top: 77px;
    height: 64px;
    z-index: 95;
    box-sizing: border-box;
    padding-right: 372px;
    box-shadow: 0px 4px 8px 0px rgba(138, 134, 146, 0.10);
    border-top: 1px solid var(--bs-border-color);
`

const Box = styled.div`
    background: #fff;
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
    const [test, setTest] = useState('');
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(hash.split('?')[1]);
    const operate = searchParams.get('operate')
    const [list,setList] = useState<any[]>([]);

    const handleInput = (e: ChangeEvent) => {
        const {value} = e.target as HTMLInputElement;
        setTest(value)
    }

    const handleFormSubmit = (success:boolean,data:any) => {

        console.log(success,data)
        // console.error(data)
        // console.log({
        //     ...data,
        //     test
        // })
    };
    const handleSave = (data: any) => {
        console.log(data)
        // console.log(JSON.stringify({
        //     ...data,
        //     test
        // }))
    };

    const saveAll = () =>{
        (childRef.current as any).saveForm()
    }



    const AllSubmit = () => {
        (childRef.current as any).submitForm()
    }

    useEffect(() => {

        if(!AllJson)return;

        AllJson.forEach((item)=>{
            if (typeof item.schema === 'string') {
                item.schema = JSON.parse(item.schema);
            }
        })


        setList(AllJson);


    }, []);


    return (
        <>
            <TopBox>
                ddd
            </TopBox>
            <AllBox>


                <Main>
                    <ButtonBox>
                        <ErrorImg />
                        <button onClick={() => AllSubmit()}>submit</button>
                        <button onClick={() => saveAll()}>save</button>
                    </ButtonBox>
                    <Box>
                        <Template
                            language="en"
                              baseUrl="https://test-api.seedao.tech"
                              version="v1"
                              token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcwNTY1MTksIkRhdGEiOnsiV2FsbGV0IjoiMHhEODVjNDEzZEE4MzNDZUJEODMzODEzOENjRUZBMDQ5NzlERjcwRThlIn19.PzcGmmLbulqKiGSh1un-w124ScXWRNJ1DgihXfWNjjY"
                              showRight={true}
                              theme={false}
                            DataSource={[
                                {
                                    "id": 318,
                                    "component_id": 13,
                                    "name": "deliverables",
                                    "schema": "",
                                    "data": {
                                        "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                                        "budgetList": [{
                                            "address": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                                            "amount": "500",
                                            "description": "test",
                                            "typeTest": ""
                                        },
                                            {
                                                "address": "0x9d6b1a15d476BfBBDf4274Ef6B405086cD7258f9",
                                                "amount": "100",
                                                "description": "lala",
                                                "typeTest": {
                                                    "id": 1,
                                                    "name": "SCR"
                                                }
                                            }, {
                                                "address": "0x41D2Ce62cd81D9ccd5C6890DCb44267B26165F85",
                                                "amount": "200",
                                                "description": "lala",
                                                "typeTest": {
                                                    "id": 1,
                                                    "name": "SCR"
                                                }
                                            }

                                        ],
                                        "proposal_id": "os-521"
                                    },
                                    "create_ts": 1706514968
                                }
                            ]}
                                operate={operate}
                              initialItems={list}
                              BeforeComponent={
            <>
                                  {/*<Preview DataSource={*/}
                                  {/*    [{"id":21,"component_id":1,*/}
                                  {/*        "name": "date",*/}
                                  {/*        "schema":"",*/}
                                  {/*        "noTitle":true,*/}
                                  {/*        "data":{*/}
                                  {/*            "testDate": "2024-01-04T16:00:00.000Z"*/}
                                  {/*        },"create_ts":1704435062}]*/}
                                  {/*} language="zh" initialItems={InitialItem}  theme={false}  />*/}
            </>

                              }
                              AfterComponent={<div>-----test add after-----</div>}
                              ref={childRef}
                              onSubmitData={handleFormSubmit}
                            onSaveData={handleSave}
                        />

                    </Box>
                </Main>
            </AllBox>
        </>


    );
}

export default New;
