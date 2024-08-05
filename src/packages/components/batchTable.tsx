import styled from "styled-components";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {TableProps, thProps} from "../type/compontent.type";
import AddIcon from '../svg/addPrimary';
import ImportImg from "../svg/table";
import * as XLSX from 'xlsx';

const OuterBox = styled.div`
    `


const Box = styled.div<{theme?:string}>`
        display: flex;
      align-items: flex-start;
      flex-direction: column;
        background: ${props=> props.theme === 'true'?"#2D2736":"rgba(82, 0, 255, 0.08)"};
        border-radius: 8px;
        margin: 0 5px;
      table{
        width: 100%;
        td,th{
          height: 40px;
            padding-bottom: 10px;
        }
          td:first-child{
              padding-left: 15px;
          }
          td:last-child{
              padding-right: 20px;
          }
          th{
              text-align: center;
          }
        .labelLft{
            display: none;
        }
      }
    
      .sm,.md,.lg{
        width: 100%!important;
        li{
          width: 100%;
        }
      }
    
    `


const ThBox = styled.th<thProps>`
        width: ${props => props.width+ "%"};
    `

const SumBox = styled.div`
        font-weight: bold;
        padding: 20px;
        svg{
            margin-bottom: -3px;
            margin-left: 5px;
        }
    `

const MidBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 40px 0;
    gap: 10px;
    .button{
        border:1px solid #5200ff;
        color: #5200ff;
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 5px;
        border-radius: 5px;
        gap: 10px;
    }
    
`

const BtnBox = styled.label`
  height: 36px;
  box-sizing: border-box;
  color: #5200ff;
  text-align: center;
  border: 1px solid #5200ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 0.875rem;
  margin-right: 20px;
  gap: 8px;
  cursor: pointer;
  padding-inline: 12px;
  &.top-import {
    background: transparent;
    border: 1px solid #5200ff;
    color: #5200ff;
  }
  .svg-stroke {
    stroke: #5200ff !important;
  }
`;

export default function BatchTable({item,showImport}:TableProps){

    const [column,setColumn] = useState(0);
    const [width,setWidth] = useState<number[]>([]);
    const [header,setHeader] = useState<string[]>([]);

    useEffect(() => {
        if(!item.style || !item.rows.length)return;
        const {width,tHeader} = item.style;
        setColumn(item.rows.length);
        setWidth(width);
        setHeader(tHeader);

    }, [item]);


    const updateFile = (e: FormEvent) => {
        const { files } = e.target as any;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);

        (fileReader as any).onload = (event: ChangeEvent) => {
            try {
                const { result } = event.target as any;
                const workbook = XLSX.read(result, { type: 'binary', codepage: 65001 });
                let data: any[] = [];

                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet], {
                            blankrows: false,
                        });

                        const arrs = csvData.split('\n');
                        const titleArr = item?.rows?.map((row:any) => {
                            return row?.name;
                        })

                        arrs.forEach((arrItem, index) => {
                            const vals = arrItem.split(',');
                            if (index > 0) {
                                let obj:any ={};
                                for (let i = 0; i < titleArr.length; i++) {
                                    let key = titleArr[i];
                                    const findItem = item?.rows[i].dataList;


                                    if(findItem){
                                        obj[key] = {
                                            id:"",
                                            name:vals[i]
                                        };
                                    }else{
                                        obj[key] = vals[i];
                                    }

                                }
                                // data.push({data:obj,...item,  dragType: 'form'});
                                data.push(obj);
                            }
                        });

                    }

                    break;
                }
                let resultArr:any = {...item,  dragType: 'form',value:data}
                showImport(2,resultArr)
            } catch (e) {
                console.error('Unsupported file type!');
            }
        };
    };

    if(!item)return null;
    return <OuterBox>
        <Box>

            <table>
                <thead>
                <tr>
                    {
                        [...Array(column)].map((col,index)=>(<ThBox key={`thead_${index}`} width={width[index]}>
                            {
                                header[index]
                            }
                        </ThBox>))
                    }
                    <th></th>
                </tr>
                </thead>

            </table>
            <MidBox>
                <div className="button" onClick={()=>showImport(1)}><AddIcon /> <span>添加明细</span></div>


                <BtnBox htmlFor="fileUpload" onChange={(e) => updateFile(e)}>
                    <input
                        id="fileUpload"
                        accept=".xlsx, .xls, .csv"
                        type="file"
                        hidden
                        onClick={(event) => {
                            (event.target as any).value = null;
                        }}
                    />
                    <ImportImg />
                    <span>导入表格</span>
                </BtnBox>

            </MidBox>
            <SumBox>{item?.sum?.label}:</SumBox>
        </Box>

    </OuterBox>
}
