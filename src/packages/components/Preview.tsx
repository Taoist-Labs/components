import styled from "styled-components";
import React,{useEffect, useState} from "react";
import {thProps} from "../type/compontent.type";
import sns from '@seedao/sns-js';
import Lan from "../utils/lan";
import { MdPreview } from 'md-editor-rt';
import { v4 as uuidv4 } from 'uuid';

const Box = styled.div<{theme?:string}>`
    color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
    font-size: 14px;
    
  table{
    width: 100%;
      margin-bottom: 20px;

    td,th{
 
      padding:10px 20px;
        text-align: center;
        line-height: 2em;
    }
      td{
          border-top: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
          background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
      }
      
      th{
          padding:10px 20px;
          background: ${props=>props.theme === 'true'?"#161518":"#f5f5f5"};
      }
    .labelLft{
      display: none;
    }
  }

`

const InnerBox = styled.div<{theme:string}>`
  margin-bottom: 20px;
    &.noBorder{
        margin: 0 -32px;
        width: calc( 100% + 64px);
    }
    
    &.borderBox{
        background: ${props=>props.theme === 'true'?"#161518":"#fff"};
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
        box-shadow: ${props=>props.theme === 'true'?"none":"2px 4px 4px 0px rgba(211, 206, 221, 0.10)"};
        padding:30px 20px;
        box-sizing: border-box;
        border-radius: 8px;
    }
`

const TitleBox = styled.div`
    font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 20px;
`

const ContentBox = styled.ul<{theme:string}>`

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 0 15px;
    
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
    width: calc(100% + 10px);
    margin:0 -5px;
    li{
        padding: 0 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        &.sm{
            width: 33.3333%;
            
        }
        &.md{
            width: 50%;
        }
        &.lg,&.lgImg{
            width: 100%;
        }
    }
`
const P32 = styled.div`
    margin-bottom: 20px;
    padding-inline: 32px;
    
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
const WhiteBox2 = styled(WhiteBox)`
  background: transparent;
  
`

const LineFlex = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    padding: 10px 5px 20px;
    &.sm{
        width: 33.3333%;
    }
    &.md{
        width: 50%;
    }
    &.lg,&.lgImg{
        width: 100%;
    }


    dt{
        box-sizing: border-box;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding-bottom: 10px;
    }
    dd{
        box-sizing: border-box;
        flex-grow: 1;
    }
`

const LineBox = styled.dl`
    flex-shrink: 0;
    box-sizing: border-box;
    width: 100%;
`
const TableOuter = styled.div<{theme:string}>`
    flex-shrink: 0;
    display: flex;
    flex-grow: 1;
    table{
        border-radius: 8px;overflow: hidden;
        border-collapse: separate;
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"}; 
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
        margin-bottom:3px;
    }
    .time{
        color:#bbb;
    }
    
`
const RhtBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap:10px
`

const TagBox = styled.div<{theme:string}>`
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 4px;
    box-sizing: border-box;
`

const StatusBox = styled.div`
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 4px;
    color: #fff;
    background: #ddd;
    box-sizing: border-box;
    
    &.approved{
        background: #1F9E14;
    }
    &.rejected{
        background: #FB4E4E;
    }
    &.draft{
        background: #2F8FFF;
    }
    &.pending_submit{
        background: rgba(9, 171, 207, 0.90);
    } 
    &.withdrawn{
        background: #B0B0B0;
    }  
    &.vote_passed{
        background: #1F9E14;
    }
    &.vote_failed{
        background: #FB4E4E;
    } 
    &.voting{
        background: #F9B617; 
    }
`

const TitleBox2 = styled(TitleBox)`
    padding-left: 0;
`


export default function Preview({DataSource,innerData,initialItems,theme,BeforeComponent,AfterComponent,language}:any){

    const [list,setList] = useState<any[]>([])
    const [address,setAddress] = useState('');
    const [snsStr,setSnsStr] = useState('')
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    const link = protocol + '//' + hostname + (port ? ':' + port : '');

    useEffect(() => {
        if(!DataSource  || !initialItems) return;
        let arr:any[]=[];

        DataSource.map((d:any)=>{
            initialItems.map( async(i:any)=>{

                if(i.name === d.name){
                    const {data} = d;
                   i.schema.content?.map( (inner:any)=>{
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
                    i.schema.name_type = i.name;

                    i.schema.noTitle = i.noTitle;
                   if(i.name==="associate_proposal"){
                       i.schema.proposal = d.data.proposal;
                       i.schema.applicant_avatar = d.data.applicant_avatar;
                       setAddress(d.data.applicant)
                   }
                   if(i.name==="relate"){
                        i.schema.proposal_id = d.data.proposal_id;
                   }
                   if(i.name==="relate"){
                        i.schema.proposal_id = d.data.proposal_id?.split("os-")[1];
                   }
                    arr.push(i.schema)
                }
            })
        })
        setList([...arr])


    }, [DataSource,initialItems]);
    useEffect(() => {
        if(!address)return;
        returnSNS();
    }, [address]);

    const handleLink = (obj:any,value:any) =>{

        if(obj.name_type === "close_project"){
            window.open(`${link}/project/info/${value?.id}`)
        }
        if(obj.name_type === "close_guild"){
            window.open(`${link}/guild/info/${value?.id}`)
        }
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

    const returnSNS = async () =>{
        const _wallet = address.toLocaleLowerCase();
        const rt = await sns.name(_wallet);
        setSnsStr( rt || address)
    }

    const togo =(id:string) =>{
        window.open(`${link}/proposal/thread/${id}`)
    }

    const dateFormat = (dateF:string) =>{

        const date = new Date(dateF);

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;

    }

    return <Box theme={theme?.toString()} key={`box_${uuidv4()}`} id={`box_${uuidv4()}`}>

        {
            !!BeforeComponent && <BeforeDiv  key={`before_${uuidv4()}`}>
                {
                    BeforeComponent
                }
            </BeforeDiv>
        }


        {
            !!list.length && <P32 key={`proposal_${uuidv4()}`}>

                {
                    list.map((item:any,index)=>(<div key={`preview_${index}_${uuidv4()}`}>
                            {
                                item.name_type === "associate_proposal" && <InnerBox onClick={()=>togo(item?.proposal.id)}>
                                    <TitleBox2>{item?.proposal?.name}</TitleBox2>
                                    <FlexBtm>
                                        <UserBox>
                                            <img src={item?.applicant_avatar} alt=""/>
                                            <div className="rht">
                                                <div className="name">{snsStr}</div>
                                                <div className="time">{formatTimestamp(item?.proposal?.create_ts)}</div>
                                            </div>
                                        </UserBox>
                                        <RhtBox>
                                            <TagBox theme={theme?.toString()}>{item?.proposal?.proposal_category_name}</TagBox>
                                            {
                                                item?.proposal?.state === "vote_passed" && <StatusBox className="approved">{Lan[language ?? "zh"]?.status}</StatusBox>
                                            }
                                        </RhtBox>
                                    </FlexBtm>

                                </InnerBox>
                            }
                            {
                                item.name_type === "relate" && <InnerBox className="borderBox"  theme={theme?.toString()}  onClick={()=>togo(item?.proposal_id)}>
                                <TitleBox>{item?.title}</TitleBox>
                                <ContentBox theme={theme?.toString()}>
                                <LineBox>
                                    <dd>
                                        <WhiteBox theme={theme?.toString()}>{item.content[0]?.value}</WhiteBox>
                                    </dd>
                                </LineBox>
                                </ContentBox>
                            </InnerBox>
                            }
                            {
                                item.name_type === "reject" && <InnerBox className="borderBox"  theme={theme?.toString()}  onClick={()=>togo(item?.proposal_id)}>
                                <TitleBox>{item?.title}</TitleBox>
                                <ContentBox theme={theme?.toString()}>
                                <LineBox>
                                    <dd>
                                        <WhiteBox theme={theme?.toString()}>{item.content[0]?.value?.name}</WhiteBox>
                                    </dd>
                                </LineBox>
                                </ContentBox>
                            </InnerBox>
                            }

                            {
                                item.name_type !== "associate_proposal" && item.name_type !== "relate"&& item.name_type !== "reject" && <InnerBox className={item.noTitle?"noBorder":"borderBox"} key={`proposal_${uuidv4()}`} theme={theme?.toString()}>

                                    {
                                        !item.noTitle &&<TitleBox>{item?.title}</TitleBox>
                                    }

                                    <ContentBox theme={theme?.toString()}>
                                        {
                                            item.content.map((inner:any,innerKey:number)=>(
                                                <LineFlex key={`component_${innerKey}_${uuidv4()}`}  className={(inner.type === "file" && inner.uploadType ==="image" || inner.type === "checkbox")?"lgImg": inner?.pro?.size}>
                                                    {
                                                        inner.type === "table" && <TableOuter theme={theme?.toString()}>

                                                            <table cellPadding="0" cellSpacing="0">
                                                                <thead>
                                                                <tr>

                                                                    {
                                                                        [...Array(inner.rows.length)].map((col,index)=>(<ThBox key={`thead_${index}}_${uuidv4()}`} width={inner.style.width[index]}>
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
                                                                        <tr key={`tbody_${rInd}_${uuidv4()}`}>
                                                                            {
                                                                                r.map((rInner:any,rIin:number)=>(<td key={`td_${rIin}_${uuidv4()}`}>
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
                                                                                                            rInner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}}_${uuidv4()}`}>{ii.value}</li>))
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
                                                        </TableOuter>
                                                    }
                                                    {
                                                        inner.type === "richText" && <LineBox>
                                                            <dd>
                                                                <WhiteBox2>
                                                                    <MdPreview theme={theme ? 'dark' : 'light'} modelValue={inner?.value || ''} />
                                                                </WhiteBox2>
                                                                {/*<WhiteBox theme={theme?.toString()}>{inner?.value}</WhiteBox>*/}


                                                            </dd>
                                                        </LineBox>
                                                    }

                                                    {
                                                        inner.type === "input" && <LineBox>
                                                            {!item.noTitle && <dt>{inner?.pro?.title}</dt>}
                                                            <dd>
                                                                <WhiteBox theme={theme?.toString()}>{inner?.value}</WhiteBox>

                                                            </dd>

                                                        </LineBox>
                                                    }
                                                    {
                                                        inner.type === "datepicker" && <LineBox>
                                                            {/*{!item.noTitle && <dt>{inner?.pro?.title}</dt>}*/}
                                                            <dd>
                                                                <WhiteBox theme={theme?.toString()}>{dateFormat(inner?.value)}</WhiteBox>

                                                            </dd>

                                                        </LineBox>
                                                    }

                                                    {
                                                        inner.type === "select" && <LineBox onClick={()=>handleLink(item,inner?.value)}>
                                                            {!item.noTitle && <dt>{inner?.pro?.title}</dt>}
                                                            <dd><WhiteBox theme={theme?.toString()}>{inner?.value?.name}</WhiteBox></dd>
                                                        </LineBox>
                                                    }

                                                    {
                                                        inner.type === "file" && <LineBox>
                                                            {!item.noTitle && <dt>{inner?.pro?.title}</dt>}
                                                            {
                                                                inner.uploadType === "image" && <dd><img src={inner?.value} alt="" className={inner?.pro?.size}/></dd>
                                                            }
                                                            {
                                                                inner.uploadType === "file" &&  <dd><WhiteBox theme={theme?.toString()}>{inner?.value}</WhiteBox></dd>
                                                            }
                                                        </LineBox>
                                                    }

                                                    {
                                                        inner.type === "checkbox" && <LineBox>
                                                            {!item.noTitle && <dt>{inner?.pro?.title}</dt>}
                                                            <dd>
                                                                <UlBox>
                                                                    {
                                                                        inner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}_${uuidv4()}`} className={inner?.pro?.size}><WhiteBox theme={theme?.toString()}>{ii.value}</WhiteBox></li>))
                                                                    }
                                                                </UlBox>
                                                            </dd>

                                                        </LineBox>
                                                    }

                                                </LineFlex>
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

        <AfterDiv key={`after_${uuidv4()}`}>
            {
                AfterComponent
            }
        </AfterDiv>
    </Box>
}
