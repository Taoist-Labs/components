import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from "styled-components";

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
  padding: 10px;
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
`



type Item = {
    id: string;
    src: string;
    type: string;
    name: string;
};
const Template: React.FC = () => {

    const initialItems: Item[] = [
        { id: '52c449f6-4dc9-4bd6-913e-24fe5e32f26d', name:"添加市政厅成员", src: 'https://mms0.baidu.com/it/u=480006263,2457381717&fm=253&app=138&f=JPEG?w=500&h=500',type: 'image'  },
        { id: '1be5d95d-a96b-4a56-9064-4cde5491077c', name:"资产申请",src: 'https://img0.baidu.com/it/u=1119404505,3019956218&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', type: 'image'  },
        { id: '9e0328ee-fb30-42d1-84e6-2fbc3302d1c9', name:"创建公共项目申请",src: 'https://img1.baidu.com/it/u=38051914,745056107&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=802',type: 'image' },
    ];

    const [leftItems, setLeftItems] = useState<Item[]>(initialItems);
    const [rightItems, setRightItems] = useState<Item[]>([]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'left') {
            const draggedItem = leftItems[result.source.index];
            const updatedLeftItems = leftItems.filter((_, index) => index !== result.source.index);
            const updatedRightItems = [...rightItems];
            updatedRightItems.splice(result.destination.index, 0, { ...draggedItem, type: 'form' });

            setLeftItems(updatedLeftItems);
            setRightItems(updatedRightItems);
        } else if (result.source.droppableId === 'right') {
            const draggedItem = rightItems[result.source.index];
            const updatedRightItems = rightItems.filter((_, index) => index !== result.source.index);
            updatedRightItems.splice(result.destination.index, 0, draggedItem);

            setRightItems(updatedRightItems);
        }
    };

    const handleFormSubmit = (itemId: string, name: string) => {
        // Perform form submission logic here
        console.log(`Submitted form for item ${itemId} with name ${name}`);
    };

    const handleFormClose = (itemId: string) => {
        const closedItem = rightItems.find((item) => item.id === itemId);
        if (closedItem) {
            const updatedLeftItems = [...leftItems, { ...closedItem, type: 'image' }];
            const updatedRightItems = rightItems.filter((item) => item.id !== itemId);

            setLeftItems(updatedLeftItems);
            setRightItems(updatedRightItems);
        }
    };

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
                                            {item.type === 'image' ? (
                                                <img src={item.src} alt={item.src} />
                                            ) : (
                                                <>
                                                    <form
                                                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                                            e.preventDefault();
                                                            const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value;
                                                            if (name) {
                                                                handleFormSubmit(item.id, name);
                                                            }
                                                        }}
                                                    >
                                                        <label htmlFor={`name-${item.id}`}>Name:</label>
                                                        <input type="text" id={`name-${item.id}`} name="name" />
                                                        <br />
                                                        <p>Left Item: {item.id}</p>
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                    {/*<button {...provided.dragHandleProps}>Drag</button>*/}
                                                    <button onClick={() => handleFormClose(item.id)}>Close</button>
                                                </>
                                            )}
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
                                            {item.name}

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
        </Box>
    );
};

export default Template;
