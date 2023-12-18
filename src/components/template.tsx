import React, {useEffect, useState} from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from "styled-components";
import Component from "../components/component";
import {Item} from "../type/compontent.type";
import {useForm} from "react-hook-form";
import initialItems from "../utils/initialItem";
import { v4 as uuidv4 } from 'uuid';

import DataSource from "../json/datasource.json";

const Box = styled.div`
    padding: 40px;
    
`
const TitleBox = styled.div`
    padding: 0 20px;
`

const InnerBox = styled.div`
    display: flex;
`

const LftBox = styled.div`
  padding: 20px 0;
  width: 900px;
  border: 1px dashed #ccc;

`

const RhtBox = styled.div`
  padding: 10px;
  width: 350px;
`

const ImageBox = styled.div`
  background: #fff;
  box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  padding: 20px;
  margin:20px;
  display: flex;
  align-items: center;
  img{
    width: 100px;
    margin-right: 20px;
  }
`

const FormBox = styled.div`
  box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  padding: 20px;
  margin: 20px;
  background: #f5f5f5;
  position: relative;
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid #000;
    width: 20px;
    height: 20px;
  }
`

const ButtonBox = styled.div`

  padding: 20px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`


const Template: React.FC = () => {

    const { register, handleSubmit,control,setValue,reset,getValues } = useForm<any>();

    const [leftItems, setLeftItems] = useState<Item[]>(initialItems);
    const [rightItems, setRightItems] = useState<Item[]>([]);

    const searchParams = new URLSearchParams(window.location.search);
    const operate = searchParams.get('operate');

    useEffect(() => {
        if(operate === 'edit'){
            init()
        }
    }, [operate]);

    const init = () =>{
        let updateRht:Item[] = [];
        let updateLft = [...leftItems];
        DataSource.map((dItem)=>{
            const cptIndex = initialItems.findIndex((item)=> item.name === dItem.name);
            initialItems[cptIndex].data = dItem.data;

            updateRht.push({...initialItems[cptIndex],  dragType: 'form'});
            const cptLft = initialItems.filter((element)=> !updateRht.some(e => e.name === element.name));
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
            const cpt = initialItems.filter((item)=> item.name === key);
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
        console.log(arr)
    }

    return (<Box>



        <DragDropContext onDragEnd={handleDragEnd}>
            <InnerBox>
                <Droppable droppableId="right">
                    {(provided) => (
                        <LftBox
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <TitleBox>模版组件区域</TitleBox>
                            {rightItems.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>

                                    {(provided) => (
                                        <FormBox
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <Component listArr={item.componentData} getValues={getValues} register={register} control={control} setValue={setValue} reset={reset} data={item?.data}/>
                                            <div className="close" onClick={() => handleFormClose(item.id)}>X</div>

                                        </FormBox>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </LftBox>
                    )}
                </Droppable>
                <Droppable droppableId="left">
                    {(provided) => (
                        <RhtBox
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <TitleBox>组件</TitleBox>
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
                                            {item.title}

                                        </ImageBox>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </RhtBox>
                    )}
                </Droppable>
            </InnerBox>
        </DragDropContext>
            <ButtonBox>
                <button onClick={handleSubmit(onSubmit)}>Submit</button>
            </ButtonBox>
        </Box>
    );
};

export default Template;
