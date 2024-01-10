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
    border-radius: 8px;
  padding-top: 20px;
  margin-bottom: 20px;

    background: ${props=>props.theme === 'true'?"#161518":"#f8f8f8"};
`

const TitleBox = styled.div`
    font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
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
    padding-inline: 32px;
    margin-bottom: 20px;
`

const WhiteBox = styled.div<{theme:string}>`
    border-radius: 8px;
    padding: 10px 12px;
    min-height: 40px;
    line-height: 20px;
    border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"};
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    box-sizing: border-box;
  
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
`
const TableOuter = styled.div<{theme:string}>`
    flex-shrink: 0;
    display: flex;
    flex-grow: 1;
    table{
        border-radius: 8px;overflow: hidden;
        border: ${props=>props.theme === 'true'?"1px solid #29282F":"1px solid rgba(217, 217, 217, 0.50)"}; 
    }
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
                    list.map((item:any,index)=>(<InnerBox key={index} theme={theme?.toString()}>
                        <TitleBox>{item?.title}</TitleBox>
                        <ContentBox theme={theme?.toString()}>
                            {
                                item.content.map((inner:any,innerKey:number)=>(
                                    <LineFlex key={`component_${innerKey}`}  className={(inner.type === "file" && inner.uploadType ==="image" || inner.type === "checkbox")?"lgImg": inner?.pro?.size}>
                                        {
                                            inner.type === "table" && <TableOuter theme={theme?.toString()}>

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
                                            </TableOuter>
                                        }


                                        {
                                            inner.type === "input" && <LineBox>
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>
                                                    <WhiteBox theme={theme?.toString()}>{inner?.value}</WhiteBox>

                                                </dd>

                                            </LineBox>
                                        }

                                        {
                                            inner.type === "select" && <LineBox>
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd><WhiteBox theme={theme?.toString()}>{inner?.value?.name}</WhiteBox></dd>
                                            </LineBox>
                                        }

                                        {
                                            inner.type === "file" && <LineBox>
                                                <dt>{inner?.pro?.title}</dt>
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
                                                <dt>{inner?.pro?.title}</dt>
                                                <dd>
                                                    <UlBox>
                                                        {
                                                            inner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}`} className={inner?.pro?.size}><WhiteBox theme={theme?.toString()}>{ii.value}</WhiteBox></li>))
                                                        }
                                                    </UlBox>
                                                </dd>

                                            </LineBox>
                                        }

                                    </LineFlex>
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
