import React, {useEffect, useState} from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from "styled-components";
import Component from "./component";
import {Item} from "../type/compontent.type";
import {useForm} from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import SearcImg from "../svg/searcImg";
import Decorate from "../svg/decorate";
import Plus from "../svg/plus";
import Close from "../svg/close";

const Box = styled.div<{theme:string}>`
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    color: ${props=>props.theme === 'true'?"#fff":"#1A1323"};
    *{
        font-size: 14px;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
        }
    }

`
const TitleBox = styled.div`
    padding: 0 20px;
`

const InnerBox = styled.div`
    position: relative;
    height: 100%;
`

const LftBox = styled.div`


`

const RhtBox = styled.div<{theme:string}>`
  width: 350px;
    position: fixed;
    right: 0;
    top: 77px;
    height: calc(100vh - 77px);
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    z-index: 9999;
    padding: 24px 32px;
    box-sizing: border-box;
    border-left:1px solid rgba(217, 217, 217, 0.50);
    display: flex;
    flex-direction: column;
`

const RhtInner = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`

const SearchBox = styled.div<{theme:string}>`
    width: 100%;
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    position: sticky;
    top: 0;
`

const ImageBox = styled.div`

  user-select: none;
  display: flex;
  align-items: center;
    flex-direction: column;
    margin-bottom: 24px;
    .line{
        padding-top: 10px;
    }
  img{
    width: 100%;
      border: 1px solid rgba(217, 217, 217, 0.50);
      border-radius: 8px;
      box-shadow: 2px 4px 4px 0px rgba(211, 206, 221, 0.10);
  }
`

const FormBox = styled.div<{theme:string}>`

  user-select: none;
  position: relative;


    border-radius: 8px;
    border: 1px solid rgba(217, 217, 217, 0.50);
    background: ${props=>props.theme === 'true'?"#1A1323":"#fff"};
    box-shadow: 2px 4px 4px 0px rgba(211, 206, 221, 0.10);
    margin-bottom: 20px;
  .close{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
  }
`


const LftFlex = styled.div`
    display: flex;
  flex-direction: column;
`

const BeforeDiv = styled.div`
    margin-bottom: 20px;
`

const AfterDiv = styled.div`
    margin: 20px 0;
`

const RhtFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SearchInner = styled.div`
    border:1px solid rgba(217, 217, 217, 0.50);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 40px;
`

const TitRht = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    span{
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
    }

`

const DragTips = styled.div<{theme:string}>`
    border: 1px dashed #ccc;
    background:${props=>props.theme === 'true'?"#1A1323":"#F9F9F9"};
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #BBB;
    margin-top: 8px;
    span{
        margin-left: 8px;
    }
`

 const Template = React.forwardRef(({onSubmitData,DataSource,operate,initialItems,BeforeComponent,AfterComponent,theme}:any,ref) => {
     React.useImperativeHandle(ref, () => ({
         submitForm:handleSubmit(onSubmit),
     }));

    const { register, handleSubmit,control,setValue,reset,getValues } = useForm<any>();

    const [leftItems, setLeftItems] = useState<Item[]>(initialItems);
    const [rightItems, setRightItems] = useState<Item[]>([]);


    useEffect(() => {
        if(operate === 'edit'){
            init()
        }
    }, [operate]);

    const init = () =>{
        let updateRht:Item[] = [];
        let updateLft = [...leftItems];
        DataSource.map((dItem:any)=>{
            const cptIndex = initialItems.findIndex((item:any)=> item.name === dItem.name);
            initialItems[cptIndex].data = dItem.data;

            updateRht.push({...initialItems[cptIndex],  dragType: 'form'});
            const cptLft = initialItems.filter((element:any)=> !updateRht.some(e => e.name === element.name));
            updateLft = [...cptLft];
        })
        setLeftItems(updateLft);
        setRightItems(updateRht);
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'left') {
            const draggedItem = leftItems[result.source.index];
            const updatedLeftItems = leftItems.filter((_, index) => index !== result.source.index);
            const updatedRightItems = [...rightItems];
            updatedRightItems.splice(result.destination.index, 0, { ...draggedItem, dragType: 'form' });

            setLeftItems([...updatedLeftItems]);
            setRightItems([...updatedRightItems]);
        } else if (result.source.droppableId === 'right') {
            const draggedItem = rightItems[result.source.index];
            const updatedRightItems = rightItems.filter((_, index) => index !== result.source.index);
            updatedRightItems.splice(result.destination.index, 0, draggedItem);

            setRightItems([...updatedRightItems]);
        }

    };

    const handleFormClose = (itemId: string) => {
        const closedItem = rightItems.find((item) => item.id === itemId);
        const closeIndex = rightItems.findIndex((item) => item.id === itemId)

        if (closedItem) {

            let arr = [...rightItems];
            arr[closeIndex].data = null;
            const updatedLeftItems = [...leftItems, { ...closedItem, dragType: 'image' }];
            const updatedRightItems = arr.filter((item) => item.id !== itemId);


            console.log((arr))
            //
            // const dataIndex = DataSource.findIndex((d)=>d.name === closedItem.name)
            // DataSource.splice(dataIndex,1);

            setLeftItems([...updatedLeftItems]);
            setRightItems([...updatedRightItems]);

        }
    };

    const onSubmit = (data:any) =>{
        let arr = [];
        for(let key in data){
            const cpt = initialItems.filter((item:any)=> item.name === key);
            const id = uuidv4();
            const {type,automation_action} = cpt[0]?.componentData;
            let obj ={
                id,
                auto_action:automation_action,
                data:data[key],
                name:type
            }
            arr.push(obj)

        }
        onSubmitData && onSubmitData(data);

    }

    const handleSearch = () =>{

    }

    return (<Box theme={theme.toString()}>

        <DragDropContext onDragEnd={handleDragEnd}>
            <InnerBox>
                <LftFlex>
                    <BeforeDiv>
                        {
                            BeforeComponent
                        }
                    </BeforeDiv>
                    <Droppable droppableId="right">
                        {(provided) => (
                            <LftBox
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    rightItems.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>

                                            {(provided) => (
                                                <FormBox
                                                    theme={theme.toString()}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <div className="close" onClick={() => handleFormClose(item.id)}>
                                                        <Close/>
                                                    </div>
                                                    <Component
                                                        listArr={item.componentData}
                                                        getValues={getValues}
                                                        theme={theme}
                                                               register={register} control={control} setValue={setValue}
                                                               reset={reset} data={item?.data}/>


                                                </FormBox>
                                            )}

                                        </Draggable>
                                    ))}
                                <DragTips theme={theme.toString()}>
                                <Plus /><span>请从右边选择需要执行的组件</span>
                                </DragTips>
                                {provided.placeholder}
                            </LftBox>
                        )}
                    </Droppable>

                    <AfterDiv>
                        {
                            AfterComponent
                        }
                    </AfterDiv>
                </LftFlex>

                <RhtFlex>

                        <Droppable droppableId="left">
                            {(provided) => (
                                <RhtBox
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    theme={theme.toString()}
                                >
                                    <RhtInner>
                                        <SearchBox theme={theme.toString()}>
                                            <SearchInner >
                                                <div>搜索</div>
                                                <div onClick={()=>handleSearch()} >
                                                    <SearcImg/>
                                                </div>
                                            </SearchInner>
                                            <TitRht>
                                                <Decorate />
                                                <span>提案执行组件</span>
                                            </TitRht>


                                        </SearchBox>
                                        {leftItems.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                    <ImageBox
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                        }}
                                                >
                                                    <img src={item.src} alt=""/>
                                                        <div className="line">
                                                            {item.title}
                                                        </div>


                                                </ImageBox>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </RhtInner>
                                </RhtBox>
                            )}
                        </Droppable>


                </RhtFlex>

            </InnerBox>
        </DragDropContext>
        </Box>
    );
});

export default Template
