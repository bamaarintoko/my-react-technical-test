'use client'
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export const PetCard = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'pet',
        item: { id, name },
        end: (item) => console.log('item : ', item),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div className='border rounded-sm py-2 px-2' ref={dragRef}>
            {name}
            {/* {isDragging && '😱'} */}
        </div>
    )
}
const Drop = ({ items, setItems, oppositeItems, setOppositeItems }) => {

    const [{ isOver }, dropRef] = useDrop({
        accept: "pet",
        drop: (item) => {
            // Remove the item from the opposite list and add it to the current list
            setOppositeItems(oppositeItems.filter((i) => i.id !== item.id));
            if (!items.some((i) => i.id === item.id)) {
                setItems([...items, item]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    return (
        <div className='grow' ref={dropRef}>
            {items.length === 0 && <div>Drop Here</div>}
            {items.map((item) => (
                <PetCard key={item.id} id={item.id} name={item.name} />
            ))}
        </div>
    )
}

const DragDrop = () => {
    const [leftItems, setLeftItems] = useState([
        { id: 1, name: "Dog" },
        { id: 2, name: "Cat" },
        { id: 3, name: "Fish" },
        { id: 4, name: "Hamster" },
    ]);
    const [rightItems, setRightItems] = useState([]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex", gap: "16px" }}>
                {/* Left Side */}
                <Drop
                    items={leftItems}
                    setItems={setLeftItems}
                    oppositeItems={rightItems}
                    setOppositeItems={setRightItems}
                />
                {/* Right Side */}
                <Drop
                    items={rightItems}
                    setItems={setRightItems}
                    oppositeItems={leftItems}
                    setOppositeItems={setLeftItems}
                />
            </div>
        </DndProvider>
    );
};

export default DragDrop;
