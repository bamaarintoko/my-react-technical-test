'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = {
    ITEM: "item",
};

const DraggableItem = ({ id, text, onDrop }) => {
    console.log('ondrop : ', onDrop)
    const [, dragRef] = useDrag({
        type: ItemType.ITEM,
        item: { id },
    });

    const [, dropRef] = useDrop({
        accept: ItemType.ITEM,
        drop: (item) => console.log('item : ', item),
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            style={{
                padding: "8px 16px",
                margin: "8px",
                backgroundColor: "#f0f0f0",
                cursor: "move",
                border: "1px solid #ccc",
            }}
        >
            {text}
        </div>
    );
};

export const PetCard = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'pet',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div className='pet-card' ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}
const Drop = () => {
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'pet',
        drop: (item) => setBasket((basket) =>
            !basket.includes(item) ? [...basket, item] : basket),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <div className='basket' ref={dropRef}>
            Here
            {basket.map(pet => <PetCard key={pet.id} id={pet.id} name={pet.name} />)}
            {isOver && <div>Drop Here!</div>}
        </div>
    )
}
const PETS = [
    { id: 1, name: 'dog' },
    { id: 2, name: 'cat' },
    { id: 3, name: 'fish' },
    { id: 4, name: 'hamster' },
]
const DragDrop = () => {
    const [items, setItems] = React.useState([
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
    ]);

    const handleDrop = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex", gap: "16px" }}>
                {PETS.map(pet => <PetCard key={pet.y} draggable id={pet.id} name={pet.name} />)}
                <Drop />
            </div>
        </DndProvider>
    );
};

export default DragDrop;
