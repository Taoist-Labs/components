const axios = require('axios');
// P1提案立项
// const schema = [
//     {
//         "title": "背景",
//         "content": "",
//         "hint": "Background of the proposal"
//     },
//     {
//         "title": "内容",
//         "content": "",
//         "hint": "Background of the proposal"
//     },
//     {
//         "title":"立项信息",
//         "type":"components",
//         "name":["budget","deliverables","deadline"]
//     },
//     {
//         "title": "备注",
//         "content": "",
//         "hint": "Content of the proposal"
//     }
//     ]


// P1提案结项
// const schema = [
//     {
//         "title":"立项信息",
//         "type":"preview"
//     },
//     {
//         "title": "结项内容",
//         "content": "",
//         "hint": "Content of the proposal"
//     },
//     {
//         "title": "交付物完成明细",
//         "content": "",
//         "hint": "Content of the proposal"
//     },
//
//     {
//         "title":"激励申请表",
//         "type":"components",
//         "name":["motivation"]
//     },
//         {
//         "title": "备注",
//         "content": "",
//         "hint": "Content of the proposal"
//     }
// ]


const schema = [
        {
        "title": "背景",
        "content": "",
        "hint": "Background of the proposal"
    },
    {
        "title": "内容",
        "content": "",
        "hint": "Background of the proposal"
    },
    {
        "title": "备注",
        "content": "",
        "hint": "Content of the proposal"
    }
]



function test() {
    const postData = {
            "name": "市政厅联席会议常规提案",
            "screenshot_uri": "",
            "schema": JSON.stringify(schema),
            "category_id": 47,
            // "components": ["budget","deliverables","deadline"]
            // "components": ["motivation"]
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


