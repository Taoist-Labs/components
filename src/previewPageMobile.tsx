import React from 'react';
import Preview from "./packages/components/PreviewMobile";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import InitialItem from "./json/initialItem";


function PreviewPage() {

    const testFor: any = [{
        "id": 1,
        "name": "create_project",
        "schema": {
            "title": "创建公共项目申请",
            "content": [{
                "type": "input",
                "inputType": "text",
                "value": "",
                "name": "project_name",
                "properties": [{"name": "title", "value": "项目名称"}, {
                    "name": "size",
                    "value": "md"
                }, {"name": "validate", "value": {"required": true, "maxLength": 50}}]
            },{
                "type": "input",
                "inputType": "text",
                "value": "",
                "name": "project_name2",
                "properties": [{"name": "title", "value": "项目名称fdafdsagdag"}, {
                    "name": "size",
                    "value": "md"
                }, {"name": "validate", "value": {"required": true, "maxLength": 50}}]
            }]
        },
        "screenshot_uri": ""
    }, {
        "id": 3,
        "name": "create_guild",
        "schema": {
            "title": "创建公会申请",
            "content": [{
                "type": "input",
                "inputType": "text",
                "value": "",
                "name": "guild_name",
                "properties": [{"name": "title", "value": "公会名称"}, {
                    "name": "size",
                    "value": "lg"
                }, {"name": "validate", "value": {"required": true, "maxLength": 50}}]
            }]
        },
        "screenshot_uri": ""
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
                    "value": "md"
                }, {"name": "validate", "value": {"maxLength": 20}}]
            }]
        },
        "screenshot_uri": ""
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
                    "value": "md"
                }, {"name": "validate", "value": {"maxLength": 20}}]
            }]
        },
        "screenshot_uri": ""
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
                "inputType": "text",
                "value": "",
                "name": "issue",
                "properties": [{"name": "title", "value": "事项"}, {"name": "size", "value": "lg"}, {
                    "name": "validate",
                    "value": {"required": true, "maxLength": 50}
                }]
            }, {
                "type": "table",
                "name": "receiverList",
                "style": {"width": [30, 25, 25], "tHeader": ["接收人", "资产类型", "资产数量", "备注"]},
                "rows": [{
                    "type": "input",
                    "inputType": "text",
                    "value": "",
                    "name": "address",
                    "properties": [{"name": "title", "value": "接收人"}, {
                        "name": "size",
                        "value": "md"
                    }, {"name": "validate", "value": {}}]
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
        }, "screenshot_uri": ""
    }]

    return (
        <Preview DataSource={DataSource} initialItems={InitialItem}  theme={false}/>
    );
}

export default PreviewPage;
