const axios = require('axios');
// P1提案立项
// const schema = [
//     {
//         "title": "背景",
//         "content": "",
//         "hint": "请写明项目发起的缘由和目标。需要体现与活跃社区的相关性，以便后期获得足够社区成员的支持。可以思考的问题如下，你希望解决什么问题？这个问题的影响有多大？你希望通过这个提案达到什么样的目标？"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         // "hint": "请写明项目推进节奏、重要执行环节、项目成员及预算分配明细。可以思考的问题如下，你打算如何实施这个提案？需要哪些资源及如何分配？谁会负责执行？提案的执行时间表是怎样的？有哪些重要的里程碑？最重要的是：该提案内容与SeeDAO产生怎么样的关联与影响？"
//         "hint": "请写明项目各投票项具体的缘由与预期可能造成的相关影响。如果是岗位竞选提案，则需要提供每个选项候选人的相关信息。"
//     },
//     //     {
//     //     "title":"立项信息",
//     //     "type":"components",
//     //     "content":"P3 提案可申请不超过当前季度剩余三层提案预算的激励",
//     //     "name":["budget_p1","deliverables","deadline"]
//     // },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
//     ]

const schema = [
    {
        "title": "背景",
        "content": "",
        "hint": "请写明项目发起的缘由和目标。需要体现与活跃社区的相关性，以便后期获得足够社区成员的支持。可以思考的问题如下，你希望解决什么问题？这个问题的影响有多大？你希望通过这个提案达到什么样的目标？"
    },
    {
        "title": "内容",
        "content": "",
        "hint": "请写明项目推进节奏、重要执行环节、项目成员及预算分配明细。可以思考的问题如下，你打算如何实施这个提案？需要哪些资源及如何分配？谁会负责执行？提案的执行时间表是怎样的？有哪些重要的里程碑？最重要的是：该提案内容与SeeDAO产生怎么样的关联与影响？"
    },
        {
        "title":"立项信息",
        "type":"components",
        "content":"公共项目可申请不超过运行当季公共项目预算上限的激励",
        "name":["budget","deliverables","deadline"]
    },
    {
        "title": "备注",
        "content": "",
        "hint": "模版中未提及但重要的内容可以在此处提及。"
    }
    ]

// const schema = [
//     {
//         "title": "背景",
//         "content": "",
//         "hint": "请写明该岗位在当季的工作职责（参见当季节点共识大会筹备notion页面中的岗位说明）"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         "hint": "请写明该岗位人员述职报告、自评与互评。"
//     },
//     {
//         "title":"激励申请",
//         "content": "参见当季节点共识大会筹备notion页面中的岗位说明，以月度薪酬标准*工作月数计算档季总报酬",
//         "type":"components",
//         "name":["motivation"]
//     },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
//     ]
//
// const schema = [
//     {
//         "title": "背景",
//         "content": "",
//         "hint": "请写明项目发起的缘由和目标。需要体现与活跃社区的相关性，以便后期获得足够社区成员的支持。可以思考的问题如下，你希望解决什么问题？这个问题的影响有多大？你希望通过这个提案达到什么样的目标？"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         "hint": "请写明项目各投票项具体的缘由与预期可能造成的相关影响。如果是岗位竞选提案，则需要提供每个选项候选人的相关信息。"
//     },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
// ]


// P1提案结项
// const schema = [
//     {
//         "title":"预算申请",
//         "type":"preview"
//     },
//     {
//         "title": "结项内容",
//         "content": "",
//         "hint": "请说明活动最终执行日期和执行效果。"
//     },
//     {
//         "title": "交付物完成明细",
//         "content": "",
//         "hint": "请详细罗列活动所有交付物的交付日期、链接和说明。"
//     },
//
//     {
//         "title":"激励申请表",
//         "type":"components",
//         "content":"如果此项目有预付部分，请在以下表格中分配中剔除已预付的部分。",
//         "name":["motivation"]
//     },
//         {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
// ]


// const schema = [
//         {
//         "title": "背景",
//         "content": "",
//         "hint": "规则变动的背景、待变动的具体规则名称、当前版本的链接"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         "hint": "请写明涉及变动的规则具体条目所在位置、变动的原文文本、以及修改后的文本，并简述变动的理由。"
//     },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
// ]
// const schema = [
//         {
//         "title": "被否决提案",
//         "type":"components",
//         "name":["reject"]
//     },
//     {
//         "title": "否决理由",
//         "content": "",
//         "hint": "市政厅联席会议待投票内容。"
//     },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
// ]

//空白模版
// const schema = [
//         {
//         "title":"自动执行组件",
//         "type":"components",
//         "content":"",
//         "name":""
//     },
//     {
//         "title": "背景",
//         "content": "",
//         // "hint": "请写明项目推进节奏、重要执行环节、项目成员及预算分配明细。可以思考的问题如下，你打算如何实施这个提案？需要哪些资源及如何分配？谁会负责执行？提案的执行时间表是怎样的？有哪些重要的里程碑？最重要的是：该提案内容与SeeDAO产生怎么样的关联与影响？"
//         "hint": "请输入"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         // "hint": "请写明项目推进节奏、重要执行环节、项目成员及预算分配明细。可以思考的问题如下，你打算如何实施这个提案？需要哪些资源及如何分配？谁会负责执行？提案的执行时间表是怎样的？有哪些重要的里程碑？最重要的是：该提案内容与SeeDAO产生怎么样的关联与影响？"
//         "hint": "请输入"
//     },
//
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "模版中未提及但重要的内容可以在此处提及。"
//     }
//     ]




function test() {
    const postData = {
            "name": "公共项目申请",
            "screenshot_uri": "",
            "schema": JSON.stringify(schema),
            "category_id":51,
            "components": ["budget","deliverables","deadline"]
            // "components": ["budget_p1","deliverables","deadline"]
            // "components": ["motivation"]
            // "components": ["reject"]
        }
    ;

    const postUrl = 'https://test-api.seedao.tech/admin/proposal_tmpl/update';


    const headers = {
        'AdminAuth': '6XKna59yOO3tZC7IM5qCrcqtqKsGVVbkbt9Sa23'
    };

    axios.post(postUrl, postData, { headers })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

test()


