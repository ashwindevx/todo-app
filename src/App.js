import React, { useState, useContext } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillMoonFill } from "react-icons/bs";

import FormModal from "./components/formModal.js";
import TodoItemsList from "./components/todoItems";
import ListItems from "./components/listItems";

import { Context } from "./context/store";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const { replaceItem, theme, toggleTheme } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleDragEnd = (x) => {
    console.log({ x });

    const { destination, draggableId, source } = x;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    replaceItem({ destination, source, itemId: Number(draggableId) });
  };

  return (
    <div className={`${theme}`}>
      <div className="py-10 h-screen px-10 bg-white dark:bg-black dark:text-white max-w-screen-lg mx-auto">
        <button onClick={toggleTheme}>
          <BsFillMoonFill />
        </button>
        <div className="text-center mb-20">
          <p className="text-md font-medium mb-2">Add Todo</p>
          <button onClick={() => setShow(true)}>
            <AiOutlinePlusCircle />
          </button>
        </div>
        <FormModal show={show} onClose={() => setShow(false)} />
        <div className="flex bg-gray-100 dark:bg-gray-800">
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoItemsList status="todo" droppableId="todo" />
            <TodoItemsList status="pending" droppableId="pending" />
            <TodoItemsList status="done" droppableId="done" />
          </DragDropContext>
        </div>
        <ListItems />
      </div>
    </div>
  );
}

export default App;
