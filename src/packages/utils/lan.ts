
interface Language {
    [key: string]: {
        dragTips: string;
        search: string;
        rightTitle:string;
        select:string;
        remove:string;
        upload:string;
        add:string;
        inputError:string;
        selectError:string;
        fileError:string
        status:string
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
        remove:"删除",
        inputError:"请选择正确内容",
        selectError:"请输入正确内容",
        fileError:"请选择正确的文件",
        status:"已通过"
    },
    en:{
        dragTips:"Please select the components from the right",
        search:"search",
        rightTitle:"Proposal component",
        select:"Select File",
        upload:"Upload",
        add:"Add",
        remove:"Remove",
        inputError:"Please enter the correct content.",
        selectError:"Please select the correct content",
        fileError:"Please select the correct file",
        status:"Passed"
    }
}
export default Lan
