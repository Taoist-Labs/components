import React, {useEffect, useState} from 'react';
import Preview from "./packages/components/PreviewMobile";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";
import InitialItem from "./json/initialItem";
import AllJson from "./json/all.json";


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
        <Preview DataSource={[
            {
                "id": 386,
                "component_id": 19,
                "name": "motivation",
                "schema": "",
                "data": {
                    "applicant": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                    "budgetList": [{
                        "address": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e",
                        "amount": "100",
                        "description": " 备注",
                        "typeTest": {
                            "id": 1,
                            "name": "SCR"
                        }
                    },
                        {
                            "address": "0x9d6b1a15d476bfbbdf4274ef6b405086cd7258f9",
                            "amount": "500",
                            "description": "test",
                            "typeTest": {
                                "id": 1,
                                "name": "SCR"
                            }
                        },
                        {
                            "address": "0x4d4b78d37090ed3e1eae6779ba2c3d6728052915",
                            "amount": "500",
                            "description": "test",
                            "typeTest": {
                                "id": 1,
                                "name": "SCR"
                            }
                        }],
                    "proposal_id": "os-586"
                },
                "create_ts": 1706543824
            }
        ]}
                 language="en" initialItems={list}  theme={false}/>
    );
}

export default PreviewPage;
