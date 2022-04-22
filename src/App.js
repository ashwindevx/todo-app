import React, { useState, useContext } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillMoonFill } from "react-icons/bs";

import FormModal from "./components/formModal.js";
import TodoItems from "./components/todoItems";
import ListItems from "./components/listItems";

import { Context } from "./context/store";

function App() {
  const { theme, toggleTheme } = useContext(Context);
  const [show, setShow] = useState(false);

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
          <TodoItems status="todo" draggableId={0} />
          <TodoItems status="pending" draggableId={1} />
          <TodoItems status="done" draggableId={2} />
        </div>
        <ListItems />
      </div>
    </div>
  );
}

export default App;
