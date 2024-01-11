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

    const handleInput = (e: ChangeEvent) => {
        const {value} = e.target as HTMLInputElement;
        setTest(value)
    }

    const handleFormSubmit = (data: any) => {
        console.log({
            ...data,
            test
        })
    };
    const handleSave = (data: any) => {
        console.log({
            ...data,
            test
        })
    };

    const saveAll = () =>{
        (childRef.current as any).saveForm()
    }



    const AllSubmit = () => {
        (childRef.current as any).submitForm()
    }

    const testFor: any = [{
        "id": 1,
        "name": "create_project",
        "schema": {
            "title": "创建公共项目申请",
            "content": [
                {
                    "type": "select",
                    "dataList": "datasrv/project_list",
                    "value":"",
                    "name": "type",
                    "properties":[
                        {
                            "name": "title",
                            "value": "资产类型"
                        },
                        {
                            "name": "size",
                            "value": "lg"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": true,
                            }
                        }
                    ]
                },
                {
                    "type": "checkbox",
                    "dataList": "datasrv/project_list",
                    "name": "delMemeberList",
                    "value":{
                    },
                    "properties":[
                        {
                            "name": "title",
                            "value": "删除成员"
                        },
                        {
                            "name": "size",
                            "value": "md"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": true,
                                "maxLength": 50
                            }
                        }
                    ]
                },
                {
                    "type": "input",
                    "inputType": "address",
                    "value": "",
                    "name": "address",
                    "properties":[
                        {
                            "name": "title",
                            "value": "项目成员"
                        },
                        {
                            "name": "size",
                            "value": "md"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": true,
                            }
                        }
                    ]
                },
                {
                    "type": "input",
                    "inputType": "address",
                    "value": "",
                    "name": "address",
                    "properties":[
                        {
                            "name": "title",
                            "value": "项目成员"
                        },
                        {
                            "name": "size",
                            "value": "md"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": true,
                            }
                        }
                    ]
                },
                {
                    "type": "input",
                    "inputType": "address",
                    "value": "",
                    "name": "address",
                    "properties":[
                        {
                            "name": "title",
                            "value": "项目成员"
                        },
                        {
                            "name": "size",
                            "value": "sm"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": true,
                            }
                        }
                    ]
                },
                {
                    "type": "file",
                    "uploadType": "image",
                    "value": "",
                    "name": "logo",
                    "properties":[
                        {
                            "name": "title",
                            "value": "项目Logo"
                        },
                        {
                            "name": "size",
                            "value": "sm"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": "配置错误提示333"
                            }
                        }
                    ]
                },
                {
                    "type": "file",
                    "uploadType": "file",
                    "value": "",
                    "name": "fileStr",
                    "properties":[
                        {
                            "name": "title",
                            "value": "项目Logo"
                        },
                        {
                            "name": "size",
                            "value": "md"
                        },
                        {
                            "name": "validate",
                            "value": {
                                "required": "配置错误提示333"
                            }
                        }
                    ]
                },
                {
                    "type": "table",
                    "name": "receiverList",
                    "style": {
                        "width": [30,25,25],
                        "tHeader": ["接收人","资产类型","资产数量","备注"]
                    },
                    "rows": [
                        {
                            "type": "input",
                            "inputType": "text",
                            "value": "",
                            "name": "address",
                            "properties":[
                                {
                                    "name": "title",
                                    "value": "接收人"
                                },
                                {
                                    "name": "size",
                                    "value": "md"
                                },
                                {
                                    "name": "validate",
                                    "value": {
                                    }
                                }
                            ]
                        },
                        {
                            "type": "select",
                            "dataList": "datasrv/project_list",
                            "value":"",
                            "name": "type",
                            "properties":[
                                {
                                    "name": "title",
                                    "value": "资产类型"
                                },
                                {
                                    "name": "size",
                                    "value": "md"
                                },
                                {
                                    "name": "validate",
                                    "value": {
                                        "maxLength": 20
                                    }
                                }
                            ]
                        },
                        {
                            "type": "input",
                            "inputType": "number",
                            "value": "",
                            "name": "amount",
                            "properties":[
                                {
                                    "name": "title",
                                    "value": "资产数量"
                                },
                                {
                                    "name": "size",
                                    "value": "md"
                                },
                                {
                                    "name": "validate",
                                    "value": {
                                        "maxLength": 20,
                                        "pattern": "/^[A-Za-z]+$/i"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "input",
                            "inputType": "text",
                            "value": "",
                            "name": "memo",
                            "properties":[
                                {
                                    "name": "title",
                                    "value": "备注"
                                },
                                {
                                    "name": "size",
                                    "value": "md"
                                },
                                {
                                    "name": "validate",
                                    "value": {
                                        "maxLength": 20,
                                        "pattern": "/^[A-Za-z]+$/i"
                                    }
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/f905573f-2c2b-4f87-b802-d77f9c402ad2.png"
    }, {
        "id": 3,
        "name": "create_guild",
        "schema": {
            "title": "创建公会申请",
            "content": [{
                "type": "input",
                "inputType": "address",
                "value": "",
                "name": "guild_name",
                "properties": [{"name": "title", "value": "公会名称"}, {
                    "name": "size",
                    "value": "lg"
                }, {"name": "validate", "value": {}}]
            }]
        },
        "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/9648bf86-6ab5-4f4b-afaf-38c8deefc73d.png"
    }, {
        "id": 2,
        "name": "close_project",
        "schema": {
            "title": "关闭项目申请",
            "content": [{
                "type": "select",
                "dataList": "datasrv/project_list",
                "name": "project_id",
                "properties": [{"name": "title", "value": "项目名称"}, {
                    "name": "size",
                    "value": "lg"
                }, {"name": "validate", "value": {"required": true}}]
            }]
        },
        "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/7a938ea1-b65e-42b4-9c36-6f005cd0b614.png"
    }, {
        "id": 4,
        "name": "close_guild",
        "schema": {
            "title": "关闭公会申请",
            "content": [{
                "type": "select",
                "dataList": "datasrv/guild_list",
                "name": "guild_id",
                "properties": [{"name": "title", "value": "公会名称"}, {
                    "name": "size",
                    "value": "lg"
                }, {"name": "validate", "value": {"required": true}}]
            }]
        },
        "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/75c024c4-75c9-4ca6-9c6d-c470c3c5b6ef.png"
    }, {
        "id": 5, "name": "new_reward", "schema": {
            "title": "资产申请",
            "content": [{
                "type": "select",
                "dataList": "datasrv/entity_list",
                "name": "budget",
                "properties": [{"name": "title", "value": "预算来源"}, {
                    "name": "size",
                    "value": "md"
                }, {"name": "validate", "value": {"maxLength": 20}}]
            }, {
                "type": "input",
                "inputType": "address",
                "value": "",
                "name": "issue",
                "properties": [{"name": "title", "value": "事项"}, {"name": "size", "value": "lg"}, {
                    "name": "validate",
                    "value": {}
                }]
            }, {
                "type": "table",
                "name": "receiverList",
                "style": {
                    "width": [30, 20, 20,30],
                    "tHeader": ["接收人", "资产类型", "资产数量", "备注"]
                },
                "rows": [{
                    "type": "input",
                    "inputType": "address",
                    "value": "",
                    "name": "address",
                    "properties": [{"name": "title", "value": "接收人"}, {
                        "name": "size",
                        "value": "md"
                    },
                        {"name": "validate", "value": { }}]
                }, {
                    "type": "select",
                    "dataList": "datasrv/asset_type",
                    "value": "",
                    "name": "type",
                    "properties": [{"name": "title", "value": "资产类型"}, {
                        "name": "size",
                        "value": "md"
                    }, {"name": "validate", "value": {"maxLength": 20}}]
                }, {
                    "type": "input",
                    "inputType": "number",
                    "value": "",
                    "name": "amount",
                    "properties": [{"name": "title", "value": "资产数量"}, {
                        "name": "size",
                        "value": "md"
                    }, {"name": "validate", "value": {"maxLength": 20, "pattern": "/^[A-Za-z]+$/i"}}]
                }, {
                    "type": "input",
                    "inputType": "text",
                    "value": "",
                    "name": "memo",
                    "properties": [{"name": "title", "value": "备注"}, {
                        "name": "size",
                        "value": "md"
                    }, {"name": "validate", "value": {"maxLength": 20, "pattern": "/^[A-Za-z]+$/i"}}]
                }]
            }, {
                "type": "input",
                "inputType": "textarea",
                "value": "",
                "name": "description",
                "properties": [{"name": "title", "value": "说明"}, {"name": "size", "value": "lg"}, {
                    "name": "validate",
                    "value": {"maxLength": 20, "pattern": "/^[A-Za-z]+$/i"}
                }]
            }]
        }, "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/09a775e0-5309-4840-aafe-679b2d7bf1b6.png"
    }]

    return (
        <>
            <TopBox>
                ddd
            </TopBox>
            <AllBox>


                <Main>
                    <ButtonBox>

                        <button onClick={() => AllSubmit()}>submit</button>
                        <button onClick={() => saveAll()}>save</button>
                    </ButtonBox>
                    <Box>
                        <Template
                            language="en"
                              baseUrl="https://test-api.seedao.tech"
                              version="v1"
                              token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDUwMzcwNDYsIkRhdGEiOnsiV2FsbGV0IjoiMHhEODVjNDEzZEE4MzNDZUJEODMzODEzOENjRUZBMDQ5NzlERjcwRThlIn19.Bl1CKAYDAlr0IikOIsZWm4gGR9V8MGpdhha7-qlJmOI"
                              showRight={true}
                              theme={false}
                              DataSource={[{"id":21,"component_id":1,"name":"create_project","schema":"","data":{"project_name":""},"create_ts":1704435062}]}
                              operate={operate}
                              initialItems={testFor}
                              BeforeComponent={<input type="text" onChange={handleInput}/>}
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
