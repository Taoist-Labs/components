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
            <Preview DataSource={[
                {
                    component_id: 16,
                    name: 'relate',
                    schema: '',
                    data: {
                        relate: "fdfagagf",
                        proposal_id: 397,
                    },
                },
                {
                    component_id: 416,
                    name: 'reject',
                    schema: '',
                    data: {
                        "applicant": "0x183F09C3cE99C02118c570e03808476b22d63191",
                        "proposal_id": "os-790",
                        "proposal_info": {
                            "applicant": "0x183f09c3ce99c02118c570e03808476b22d63191",
                            "applicant_avatar": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/user_avatars/0x183F09C3cE99C02118c570e03808476b22d63191_1703655467478.png",
                            "create_ts": 1707041296,
                            "id": 787,
                            "name": "[BetaTest] P1提案立项1807",
                            "proposal_category_name": "P1提案",
                            "proposal_state": "pending_execution"
                        }
                    },
                },

                {
                    "id": 324,
                    "component_id": 13,
                    "name": "deliverables",
                    "schema": "",
                    "data": {"applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","description":"立项信息 交付物","proposal_id":"os-397"},
                    "create_ts": 1706517310
                },
                {
                    "id": 325,
                    "component_id": 14,
                    "name": "deadline",
                    "schema": "",
                    "data": {"applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","description":"2024-02-15T16:00:00.000Z","proposal_id":"os-397"},
                    "create_ts": 1706517310
                },
                {
                    "id": 326,
                    "component_id": 21,
                    "name": "budget_p1",
                    "schema": "",
                    "data": {"amount":"90","applicant":"0xD85c413dA833CeBD8338138CcEFA04979DF70E8e","proposal_id":"os-397","typeTest":{"id":2,"name":"USDT"}},
                    "create_ts": 1706517310
                }
            ]} language="zh" initialItems={list} theme={false} key="preview_main"

            />
        </Box>

    );
}

export default PreviewPage;
