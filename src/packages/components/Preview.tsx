import styled from "styled-components";
import React,{useEffect, useState} from "react";
import {thProps} from "../type/compontent.type";

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
      }
      
      th{
          padding: 20px;
          background: ${props=>props.theme === 'true'?"#161518":"#f5f5f5"};
      }
    .labelLft{
      display: none;
    }
  }

`

const InnerBox = styled.div`
 
  padding-top: 20px;
  margin-bottom: 20px;


`

const TitleBox = styled.div`
    text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`

const ContentBox = styled.ul<{theme:string}>`
    border-radius: 8px;
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    box-shadow: ${props=>props.theme === 'true'?"none":"2px 4px 4px 0px rgba(211, 206, 221, 0.10)"};
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
        align-items: stretch;
        line-height: 2em;
        border-bottom: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
        dt{
            padding:10px 24px;
            box-sizing: border-box;
            font-weight: bold;
            margin-right: 10px;
            width: 200px;
            background: ${props=>props.theme === 'true'?"#161518":"#f5f5f5"};
            display: flex;
            align-items: center;
        }
        dd{
            padding:10px 24px;
            box-sizing: border-box;
            flex-grow: 1;
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
    width: 100%;
    li{
        width: 100%;
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
    padding-inline: 32px;
    margin-bottom: 20px;
`

export default function Preview({DataSource,initialItems,theme,BeforeComponent,AfterComponent}:any){

    const [list,setList] = useState<any[]>([])

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
                    arr.push(i.schema)
                }
            })
        })
        setList([...arr])


    }, [DataSource,initialItems]);

    return <Box theme={theme?.toString()}>

        {
            !!BeforeComponent && <BeforeDiv>
                {
                    BeforeComponent
                }
            </BeforeDiv>
        }

        {
            !!list.length && <P32>

                {
                    list.map((item:any,index)=>(<InnerBox key={index}>
                        <TitleBox>{item?.title}</TitleBox>
                        <ContentBox theme={theme?.toString()}>
                            {
                                item.content.map((inner:any,innerKey:number)=>(
                                    <div key={`component_${innerKey}`}>
                                        {
                                            inner.type === "table" && <div>

                                                <table cellPadding="0" cellSpacing="0">
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
                                            </div>
                                        }


                                        {
                                            inner.type === "input" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>{inner?.value}</dd>
                                            </dl>
                                        }

                                        {
                                            inner.type === "select" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>{inner?.value?.name}</dd>
                                            </dl>
                                        }

                                        {
                                            inner.type === "file" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                {
                                                    inner.uploadType === "image" && <dd><img src={inner?.value} alt="" className={inner?.pro?.size}/></dd>
                                                }
                                                {
                                                    inner.uploadType === "file" &&  <dd>{inner?.value}</dd>
                                                }
                                            </dl>
                                        }

                                        {
                                            inner.type === "checkbox" && <dl className="line">
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>
                                                    <UlBox>
                                                        {
                                                            inner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}`} className={inner?.pro?.size}>{ii.value}</li>))
                                                        }
                                                    </UlBox>
                                                </dd>

                                            </dl>
                                        }

                                    </div>
                                ))
                            }
                        </ContentBox>
                    </InnerBox>))
                }
            </P32>
        }

        <AfterDiv>
            {
                AfterComponent
            }
        </AfterDiv>
    </Box>
}
