import React from 'react';
import Preview from "./packages/components/PreviewMobile";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import InitialItem from "./json/initialItem";


function PreviewPage() {

    const testFor: any =[
        {
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
        },
        {
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
                    "name": "project_info",
                    "properties": [{
                        "name": "title",
                        "value": "项目名称"
                    }, {
                        "name": "size",
                        "value": "lg"
                    }, {
                        "name": "validate",
                        "value": {
                            "maxLength": 20
                        }
                    }]
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
        },
        {
            "id": 5,
            "name": "new_reward",
            "schema": {
                "title": "资产申请",
                "content": [
                    {
                        "type": "select",
                        "dataList": "datasrv/entity_list",
                        "name": "budget",
                        "properties": [
                            {"name": "title", "value": "预算来源"},
                            {
                                "name": "size",
                                "value": "md"
                            },
                            {
                                "name": "validate",
                                "value": {
                                    "required": true
                                }
                            }
                        ]
                    },

                    {
                        "type": "table",
                        "name": "receiverList",
                        "style": {
                            "width": [20, 15, 15,20,30],
                            "tHeader": ["接收人", "资产类型","资产数量", "事项", "备注"]
                        },
                        "rows": [
                            {
                                "type": "input",
                                "inputType": "address",
                                "value": "",
                                "name": "address",
                                "properties": [
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
                                            "required": true

                                        }
                                    }
                                ]
                            },
                            {
                                "type": "select",
                                "dataList": "datasrv/asset_type",
                                "value": "",
                                "name": "type",
                                "properties": [{"name": "title", "value": "资产类型"}, {
                                    "name": "size",
                                    "value": "md"
                                },
                                    {"name": "validate", "value": {"maxLength": 20}}]
                            },

                            {
                                "type": "input",
                                "inputType": "number",
                                "value": "",
                                "name": "amount",
                                "properties": [{"name": "title", "value": "资产数量"}, {
                                    "name": "size",
                                    "value": "md"
                                }, {"name": "validate", "value": {"required": true}}]
                            },
                            {
                                "type": "input",
                                "inputType": "number",
                                "value": "",
                                "name": "amount",
                                "properties": [
                                    {"name": "title", "value": "事项"},
                                    {
                                        "name": "size",
                                        "value": "md"
                                    },
                                    {"name": "validate", "value": {"required": true}}]
                            },
                            {
                                "type": "input",
                                "inputType": "text",
                                "value": "",
                                "name": "memo",
                                "properties": [{"name": "title", "value": "备注"}, {
                                    "name": "size",
                                    "value": "md"
                                }, {"name": "validate", "value": {"required": true}}]
                            }]
                    }, {
                        "type": "input",
                        "inputType": "textarea",
                        "value": "",
                        "name": "description",
                        "properties": [{"name": "title", "value": "说明"}, {"name": "size", "value": "lg"}, {
                            "name": "validate",
                            "value": {"required": true}
                        }]
                    }]
            }, "screenshot_uri": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/proposal_images/09a775e0-5309-4840-aafe-679b2d7bf1b6.png"
        },
        {
            "id": 11,
            "name": "associate_proposal",
            "schema": {
                "title": "关联提案",
                "content": [{
                    "type": "select",
                    "dataList": "datasrv/passed_proposals",
                    "name": "proposal",
                    "properties": [{
                        "name": "title",
                        "value": "提案"
                    }, {
                        "name": "size",
                        "value": "lg"
                    }, {
                        "name": "validate",
                        "value": {
                            "required": true
                        }
                    }]
                }, {
                    "type": "select",
                    "dataList": "datasrv/entity_list",
                    "name": "project_guild",
                    "properties": [{
                        "name": "title",
                        "value": "项目或公会"
                    }, {
                        "name": "size",
                        "value": "lg"
                    }, {
                        "name": "validate",
                        "value": {
                            "required": true
                        }
                    }]
                }]
            },
            "screenshot_uri": ""
        }
    ]

    return (
        <Preview DataSource={   [{"id":21,"component_id":1,"name":"associate_proposal","schema":"","data":{
                "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                "project_guild": {
                    "id": 45,
                    "name": "提案执行组件",
                    "type": "project"
                },
                "proposal": null,
                "proposal_id": "os-267"
            },"create_ts":1704435062}]} initialItems={testFor}  theme={false}/>
    );
}

export default PreviewPage;
