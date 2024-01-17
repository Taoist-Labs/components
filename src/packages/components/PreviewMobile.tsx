import styled from "styled-components";
import React,{useEffect, useState} from "react";
import {thProps} from "../type/compontent.type";
import sns from "@seedao/sns-js";
import Lan from "../utils/lan";

const Box = styled.div<{theme?:string}>`
    color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
    font-size: 14px;
  .table{
    width: 100%;
      margin: 20px 0;
    td,th{

        padding:10px 20px;
        text-align: center;
        line-height: 2em;
    }
      td{
          border-top: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"}; 
      }
      
      th{
          background: ${props=>props.theme === 'true'?"#161518":"#f5f5f5"};
          white-space: nowrap;
      }
    .labelLft{
      display: none;
    }
  }

`

const InnerBox = styled.div<{theme:string}>`
  margin-bottom: 20px;
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    box-shadow: ${props=>props.theme === 'true'?"none":"2px 4px 4px 0px rgba(211, 206, 221, 0.10)"};
    padding: 15px;
    border-radius: 8px;


`

const TitleBox = styled.div`
    text-align: left;
    font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`

const ContentBox = styled.ul<{theme:string}>`
    border-radius: 8px;
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    img{
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
         &.md{
             width: 224px;
             height: 126px;
         }
        &.sm{
            width: 126px;
            height: 126px;
        }
    }
    
    .line{
        display: flex;
        flex-direction: column;
      
        dt{
            padding:5px 0;
            box-sizing: border-box;
            font-weight: bold;
            margin-right: 10px;

            display: flex;
            align-items: center;
        }
        dd{
            padding:5px 0;
            box-sizing: border-box;
            flex-grow: 1;
            //background: ${props=>props.theme === 'true'?"#161518":"#f5f5f5"};
        }
    }
    
`

const WhiteBox = styled.div<{theme:string}>`
    border-radius: 8px;
    padding: 10px 12px;
    min-height: 40px;
    line-height: 20px;
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    background: ${props=>props.theme === 'true'?"#1A1323":"#f8f8f8"};
    box-sizing: border-box;
  
`

const ThBox = styled.th<thProps>`
    width: ${props => props.width+ "%"};
`

const BeforeDiv = styled.div`
    margin-bottom: 20px;
    
`

const AfterDiv = styled.div`
    margin-bottom: 20px;
`

const UlBox = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    li{
        width: 100%;
        margin-bottom: 10px;
        //&.lg{
        //    width: 100%;
        //}
        //&.md{
        //    width: 50%;
        //}
        //&.sm{
        //    width: 33.3%;
        //}
    }
`
const P32 = styled.div`
    padding-inline: 17px;
    margin-bottom: 20px;
`

const InnerTable = styled.div`
    width: calc(100vw - 50px);
    display: flex;
    overflow-x: auto;
    margin: 0 auto;
    box-sizing: border-box;
    padding-right: 15px;
    table{
        border-radius: 8px;overflow: hidden;
        border: 1px solid rgba(217, 217, 217, 0.50);
    }
`

const FlexBtm = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`

const UserBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    img{
        width: 44px;
        height: 44px;
        object-fit: cover;
        object-position: center;
        border-radius: 44px;
    }
    .name{
        font-weight: bold;
        margin-bottom: 3px;
    }
    .time{
        color:#bbb;
    }
    
`
const RhtBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap:10px
`

const TagBox = styled.div<{theme:string}>`
    border:1px solid #7E7B88;
    font-size: 12px;
    padding: 0 6px;
    line-height: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    box-sizing: border-box;
`

const StatusBox = styled.div`
    font-size: 12px;
    padding: 0 6px;
    line-height: 20px;
    height: 20px;
    border-radius: 4px;
    color: #7E7B88;
    border:1px solid #7E7B88;
    box-sizing: border-box;
    
    &.approved{
        border-color: #1F9E14;
       color: #1F9E14;
    }
    &.rejected{
        border-color: #FB4E4E;
        color: #FB4E4E;
    }
    &.draft{
        border-color: #2F8FFF;
        color: #2F8FFF;
    }
    &.pending_submit{
        border-color: rgba(9, 171, 207, 0.90);
        color: rgba(9, 171, 207, 0.90);
    } 
    &.withdrawn{
        border-color:#B0B0B0;
        color: #B0B0B0;
    }  
    &.vote_passed{
        border-color:#1F9E14;
        color: #1F9E14;
    }
    &.vote_failed{
        border-color:#FB4E4E;
        color: #FB4E4E;
    } 
    &.voting{
        border-color:#F9B617;
        color: #F9B617;
    }
`

export default function Preview({DataSource,initialItems,theme,language}:any){

    const [list,setList] = useState<any[]>([])
    const [address,setAddress] = useState('');
    const [snsStr,setSnsStr] = useState('')

    useEffect(() => {
        if(!DataSource || !initialItems) return;
        let arr:any[]=[];

        DataSource.map((d:any)=>{
            initialItems.map((i:any)=>{

                if(i.name === d.name){
                    const {data} = d;
                   i.schema.content?.map((inner:any)=>{
                        inner.pro = {};
                        inner.properties?.map((inn:any)=>{
                            inner.pro[inn.name] = inn.value;
                        })
                        inner.value = (data as any)[inner.name] ?? null;
                       if(inner.type === "table"){
                           inner.table = [...Array(inner.value.length)];
                           for (let j = 0; j < inner.value.length; j++) {
                               let arr = [];
                               for (let k = 0; k < inner.rows.length; k++) {
                                   let value = inner.value[j][inner.rows[k].name];
                                   let newRow = {
                                       ...inner.rows[k],
                                       value
                                   }
                                   newRow.pro = {};
                                   newRow.properties?.map((nw:any)=>{
                                       newRow.pro[nw.name] = nw.value;
                                   })
                                   arr.push(newRow)
                                   inner.table[j] = arr;
                               }
                           }

                       }
                        return inner;
                    })
                    i.schema.name_type = i.name
                    if(i.name==="associate_proposal"){
                        i.schema.proposal = d.data.proposal;
                        i.schema.applicant_avatar = d.data.applicant_avatar;
                        setAddress(d.data.applicant)
                    }
                    arr.push(i.schema)
                }
            })
        })
        setList([...arr])


    }, [DataSource,initialItems]);

    const handleLink = (obj:any,value:any) =>{
        const protocol = window.location.protocol;

        const hostname = window.location.hostname;
        const port = window.location.port;
        const link = protocol + '//' + hostname + (port ? ':' + port : '');

        if(obj.name_type === "close_project"){
            window.open(`${link}/project/info/${value?.id}`)
        }
        if(obj.name_type === "close_guild"){
            window.open(`${link}/guild/info/${value?.id}`)
        }
    }

    useEffect(() => {
        if(!address)return;
        returnSNS();
    }, [address]);

    const returnSNS = async () =>{
        const _wallet = address.toLocaleLowerCase();
        const rt = await sns.name(_wallet);
        setSnsStr( rt || address)
    }

    const  formatTimestamp = (timestamp:number) =>{
        const date = new Date(timestamp * 1000);

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    }

    return <Box theme={theme?.toString()}>


        {
            !!list.length && <P32>

                {
                    list.map((item:any,index)=>(<div key={index} >

                            {
                                item.name_type === "associate_proposal" && <InnerBox>
                                    <TitleBox>{item?.proposal?.name}</TitleBox>
                                    <RhtBox>
                                        {
                                            item?.proposal?.state === "vote_passed" && <StatusBox className="approved">{Lan[language ?? "zh"]?.status}</StatusBox>
                                        }
                                        <TagBox theme={theme?.toString()}>{item?.proposal?.proposal_category_name}</TagBox>

                                    </RhtBox>
                                    <FlexBtm>
                                        <UserBox>
                                            <img src={item?.applicant_avatar} alt=""/>
                                            <div className="rht">
                                                <div className="name">{snsStr}</div>
                                                <div className="time">{formatTimestamp(item?.proposal?.create_ts)}</div>
                                            </div>
                                        </UserBox>

                                    </FlexBtm>

                                </InnerBox>
                            }

                        {
                            item.name_type !== "associate_proposal" &&  <InnerBox theme={theme?.toString()}>
                        <TitleBox>{item?.title}</TitleBox>
                        <ContentBox theme={theme?.toString()}>
                            {
                                item.content.map((inner:any,innerKey:number)=>(

                                    <div key={`component_${innerKey}`}>
                                        {
                                            inner.type === "table" && <InnerTable>

                                                <table cellPadding="0" cellSpacing="0"  className="table">
                                                    <thead>
                                                    <tr>

                                                        {
                                                            [...Array(inner.rows.length)].map((col,index)=>(<ThBox key={`thead_${index}`} width={inner.style.width[index]}>
                                                                {
                                                                    inner.style.tHeader[index]
                                                                }
                                                            </ThBox>))
                                                        }
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        inner.table?.map((r:any,rInd:number)=>(
                                                            <tr key={`tbody_${rInd}`}>
                                                                {
                                                                    r.map((rInner:any,rIin:number)=>(<td key={`td_${rIin}`}>
                                                                            {
                                                                                rInner.type === "input" &&
                                                                                <span>{rInner?.value}</span>

                                                                            }

                                                                            {
                                                                                rInner.type === "select" && <dl>
                                                                                    <dd>{rInner?.value?.name}</dd>
                                                                                </dl>
                                                                            }
                                                                            {
                                                                                rInner.type === "file" && <dl>
                                                                                    {
                                                                                        rInner.uploadType === "image" && <dd><img src={rInner?.value} alt="" className={rInner?.pro?.size} /></dd>
                                                                                    }
                                                                                    {
                                                                                        rInner.uploadType === "file" &&  <dd>{rInner?.value}</dd>
                                                                                    }
                                                                                </dl>
                                                                            }
                                                                            {
                                                                                rInner.type === "checkbox" && <dl>

                                                                                    <dd>
                                                                                        <ul>
                                                                                            {
                                                                                                rInner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}`}>{ii.value}</li>))
                                                                                            }
                                                                                        </ul>
                                                                                    </dd>

                                                                                </dl>
                                                                            }
                                                                        </td>

                                                                    ))
                                                                }

                                                            </tr>

                                                        ))
                                                    }

                                                    </tbody>
                                                </table>
                                            </InnerTable>
                                        }


                                        {
                                            inner.type === "input" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd><WhiteBox>{inner?.value}</WhiteBox></dd>
                                            </dl>
                                        }

                                        {
                                            inner.type === "select" && <dl className="line"  onClick={()=>handleLink(item,inner?.value)}>
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd><WhiteBox>{inner?.value?.name}</WhiteBox></dd>
                                            </dl>
                                        }

                                        {
                                            inner.type === "file" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                {
                                                    inner.uploadType === "image" && <dd><img src={inner?.value} alt="" className={inner?.pro?.size}/></dd>
                                                }
                                                {
                                                    inner.uploadType === "file" &&  <dd><WhiteBox>{inner?.value}</WhiteBox></dd>
                                                }
                                            </dl>
                                        }

                                        {
                                            inner.type === "checkbox" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>
                                                    <UlBox>
                                                        {
                                                            inner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}`} className={inner?.pro?.size}>
                                                                <WhiteBox>{ii.value}</WhiteBox>
                                                                </li>))
                                                        }
                                                    </UlBox>
                                                </dd>

                                            </dl>
                                        }

                                    </div>
                                ))
                            }
                        </ContentBox>
                    </InnerBox>
                        }
                        </div>
                        ))
                }
            </P32>
        }


    </Box>
}
