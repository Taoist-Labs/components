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
    const [list, setList] = useState<any[]>([]);
    useEffect(() => {

        if (!AllJson) return;

        AllJson.forEach((item) => {
            if (typeof item.schema === 'string') {
                item.schema = JSON.parse(item.schema);
            }
        })


        setList(AllJson);


    }, []);


    return (
        <Box>
            <Preview DataSource={[{
                "id": 3271,
                "component_id": 30,
                "name": "public",
                "schema": "",
                "data":{
                    "admin_wallet": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "common_project": {
                        "ApprovalLink": "https://forum.seedao.xyz/thread/sip-91-seedao-44520",
                        "Budgets": "",
                        "Category": "公共项目",
                        "ContantWay": "baiyuseedaonetwork",
                        "Deliverable": "",
                        "OfficialLink": "https://seedao.notion.site/ef1c2b55257a47f59bfc720900368c18?pvs=4",
                        "OverLink": "https://forum.seedao.xyz/thread/search-47414",
                        "PlanTime": "",
                        "SIP": "91",
                        "create_ts": 1707383906,
                        "creator": "",
                        "desc": "数字城邦白皮书",
                        "grouped_sponsors": null,
                        "id": 107,
                        "intro": "",
                        "is_special": false,
                        "label": "",
                        "logo": "",
                        "members": null,
                        "name": "数字城邦白皮书",
                        "proposals": null,
                        "special_type": "",
                        "sponsors": ["0x8C913aEc7443FE2018639133398955e0E17FB0C1"],
                        "status": "closed",
                        "update_ts": 0
                    },
                    "proposal_id": "os-1727"
                },
                "create_ts": 1722525023
            }]} language="zh" initialItems={list} theme={false} key="preview_main"

            />
        </Box>

    );
}

export default PreviewPage;
