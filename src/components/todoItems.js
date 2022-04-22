import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Context } from "../context/store";

const TodoItems = ({ status, draggableId }) => {
  const { items, deleteItem } = useContext(Context);

  const deleteHandler = (id) => {
    deleteItem(id);
  };

  const deadline = (date) => {
    let dead = status !== "done" && new Date() > new Date(date);
    if (dead) {
      return "bg-red-500";
    } else {
      return "bg-white dark:bg-gray-500";
    }
  };

  return (
    <div className="mx-auto p-4">
      <p className="text-center mb-4 text-xl font-semibold">
        {status.toUpperCase()}
      </p>
      {items
        .filter((item) => {
          return item.status === status;
        })
        .map((item, id) => (
          <div className={`p-2 my-2 ${deadline(item.date)}`}>
            <p className="font-semibold">{item.title}</p>
            <p>{item.description}</p>
            <p>{item.date}</p>
            <button onClick={() => deleteHandler(item.id)}>
              <AiFillDelete className="mt-4" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default TodoItems;
