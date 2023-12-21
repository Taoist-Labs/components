import DataSource from "./json/datasource.json";
import styled from "styled-components";
import {useEffect, useState} from "react";
import initialItems from "./utils/initialItem";
import {thProps} from "./type/compontent.type";


const Box = styled.div`
    padding: 40px;

  table{
    width: 100%;
    margin-bottom: 40px;
    td,th{
      height: 40px;
      border-bottom: 1px solid rgba(0,0,0,0.3);
      padding: 5px 20px;
    }
    .labelLft{
      display: none;
    }
  }

`

const InnerBox = styled.div`
  background: #F5F5F5;
  padding: 20px;
  margin-bottom: 20px;
`

const TitleBox = styled.div`
    text-align: center;
  font-weight: bold;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
`

const ContentBox = styled.ul`
    
    dl{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      dt{
        font-weight: bold;
        margin-right: 10px;
      }
      dd{
        img{
          width:100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
        }
      }
    }
`

const ThBox = styled.th<thProps>`
    width: ${props => props.width+ "%"};
`


export default function Preview(){

    const [list,setList] = useState<any[]>([])

    useEffect(() => {
        let arr:any[]=[];
        DataSource.map((d)=>{
            initialItems.map((i)=>{
                if(i.name === d.name){
                    const {data} = d;
                   i.componentData.content?.map((inner:any)=>{
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
                                   arr.push(newRow)

                                   inner.table[j] = arr;
                               }
                           }

                       }
                        return inner;
                    })
                    arr.push(i.componentData)
                }
            })
        })

        setList([...arr])

    }, [DataSource,initialItems]);

    return <Box>
        {
            list.map((item:any,index)=>(<InnerBox key={index}>
                <TitleBox>{item?.title}</TitleBox>
                <ContentBox>
                    {
                        item.content.map((inner:any,innerKey:number)=>(
                            <div key={`component_${innerKey}`}>
                                {
                                    inner.type === "table" && <div>

                                    <table >
                                        <thead>
                                            <tr>

                                                {
                                                    [...Array(inner.style.column)].map((col,index)=>(<ThBox key={`thead_${index}`} width={inner.style.width[index]}>
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
                                                                            <dt>{rInner?.pro?.title}</dt>
                                                                            <dd>{rInner?.value?.label}</dd>
                                                                        </dl>
                                                                    }
                                                                    {
                                                                        rInner.type === "file" && <dl>
                                                                            <dt>{rInner?.pro?.title}</dt>
                                                                            {
                                                                                rInner.uploadType === "image" && <dd><img src={rInner?.value} alt=""/></dd>
                                                                            }
                                                                            {
                                                                                rInner.uploadType === "file" &&  <dd>{rInner?.value}</dd>
                                                                            }
                                                                        </dl>
                                                                    }
                                                                    {
                                                                        rInner.type === "checkbox" && <dl>
                                                                            <dt>{rInner?.pro?.title}</dt>

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
                                    inner.type === "input" && <dl>
                                        <dt>{inner?.pro?.title}</dt>
                                        <dd>{inner?.value}</dd>
                                    </dl>
                                }

                                {
                                    inner.type === "select" && <dl>
                                        <dt>{inner?.pro?.title}</dt>
                                        <dd>{inner?.value?.label}</dd>
                                    </dl>
                                }

                                {
                                    inner.type === "file" && <dl>
                                        <dt>{inner?.pro?.title}</dt>
                                        {
                                            inner.uploadType === "image" && <dd><img src={inner?.value} alt=""/></dd>
                                        }
                                        {
                                            inner.uploadType === "file" &&  <dd>{inner?.value}</dd>
                                        }
                                    </dl>
                                }

                                {
                                    inner.type === "checkbox" && <dl>
                                        <dt>{inner?.pro?.title}</dt>

                                        <dd>
                                            <ul>
                                                {
                                                    inner.value.map((ii:any,iiID:number)=>( <li key={`select_${iiID}`}>{ii.value}</li>))
                                                }
                                            </ul>
                                        </dd>

                                    </dl>
                                }

                            </div>
                        ))
                    }
                </ContentBox>
            </InnerBox>))
        }
    </Box>
}
