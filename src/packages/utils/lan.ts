
interface Language {
    [key: string]: {
        dragTips: string;
        search: string;
        rightTitle:string;
        select:string;
        remove:string;
        upload:string;
        add:string;
    };
}

const Lan:Language = {
    zh:{
        dragTips:"请从右边选择需要执行的组件",
        search:"搜索",
        rightTitle:"提案执行组件",
        select:"选择文件",
        upload:"上传",
        add:"添加",
        remove:"删除"
    },
    en:{
        dragTips:"Please select the components from the right",
        search:"search",
        rightTitle:"Proposal component",
        select:"Select File",
        upload:"Upload",
        add:"Add",
        remove:"Remove"
    }
}
export default Lan
