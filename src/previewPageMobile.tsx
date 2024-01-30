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
                "name": "reject",
                "schema": "",
                "data": {
                    "applicant": "0x4d4b78D37090eD3e1EAe6779bA2C3D6728052915",
                    "proposal_id": "os-449",
                    "proposal_info": {
                        "applicant": "0x183f09c3ce99c02118c570e03808476b22d63191",
                        "applicant_avatar": "https://seedao-os-superapp.s3.ap-northeast-2.amazonaws.com/user_avatars/0x183F09C3cE99C02118c570e03808476b22d63191_1703655467478.png",
                        "create_ts": 1704675541,
                        "id": 201,
                        "name": "创建一个提案试试投票啥时候开始",
                        "proposal_category_name": "General Discussions",
                        "proposal_state": "vote_passed"
                    }
                },
                "create_ts": 1706543824
            }
        ]}
                 language="en" initialItems={list}  theme={false}/>
    );
}

export default PreviewPage;
