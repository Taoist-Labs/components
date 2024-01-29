import React, {useEffect, useState} from 'react';
import Preview from "./packages/components/Preview";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import InitialItem from "./json/initialItem";
import styled from "styled-components";
import AllJson from "./json/all.json";

const Box = styled.div`
    padding: 10px;
`

function PreviewPage() {
    const [list,setList] = useState<any[]>([]);
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
        <Box>
            <Preview DataSource={[{
                "component_id": 16,
                "name": "relate",
                "schema": "",
                "data": {"relate": "公共项目申请","proposal_id":397}
            }, {
                "id": 181,
                "component_id": 12,
                "name": "budget",
                "schema": "",
                "data": {
                    "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "budgetList": [{
                        "amount": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                        "description": "测试预付",
                        "proportion": "80",
                        "typeTest": {"id": 1, "name": "SCR"}
                    }],
                    "proposal_id": "os-333"
                },
                "create_ts": 1706340166
            }, {
                "id": 182,
                "component_id": 13,
                "name": "deliverables",
                "schema": "",
                "data": {
                    "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "description": "公共项目申请 交付物",
                    "proposal_id": "os-333"
                },
                "create_ts": 1706340166
            }, {
                "id": 183,
                "component_id": 14,
                "name": "deadline",
                "schema": "",
                "data": {
                    "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "description": "2024-02-02T16:00:00.000Z",
                    "proposal_id": "os-333"
                },
                "create_ts": 1706340166
            }]} language="zh" initialItems={list} theme={false} key="preview_main"

                     BeforeComponent={
                        <div>
                            <Preview  key="preview_inner" DataSource={[{"id":219,"component_id":13,"name":"deliverables","schema":"","data":{"applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","description":"交付物","proposal_id":"os-345"},"create_ts":1706424321},{"id":220,"component_id":12,"name":"budget","schema":"","data":{"applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","budgetList":[{"typeTest":""}],"proposal_id":"os-345"},"create_ts":1706424321},{"id":221,"component_id":14,"name":"deadline","schema":"","data":{"applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","proposal_id":"os-345"},"create_ts":1706424321}]} language="zh" initialItems={list} theme={false} />
                            <hr/>
                        </div>

                     }
            />
        </Box>

    );
}

export default PreviewPage;
