import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import { Context } from "../context/store";

const TodoItem = ({ item, draggableId, index }) => {
  const { deleteItem } = useContext(Context);
  const deleteHandler = (id) => {
    deleteItem(id);
  };

  const deadline = (date) => {
    let dead = item.status !== "done" && new Date() > new Date(date);
    if (dead) {
      return "bg-red-500";
    } else {
      return "bg-white dark:bg-gray-500";
    }
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          className={`p-2 my-2 ${deadline(item.date)}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="font-semibold">{item.title}</p>
          <p>{item.description}</p>
          <p>{item.date}</p>
          <button onClick={() => deleteHandler(item.id)}>
            <AiFillDelete className="mt-4" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

const TodoItemsList = ({ status, droppableId }) => {
  const { items } = useContext(Context);

  return (
    <Droppable droppableId={`${droppableId}`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className="mx-auto p-4">
          <p className="text-center mb-4 text-xl font-semibold">
            {status.toUpperCase()}
          </p>
          {items
            .filter((item) => {
              return item.status === status;
            })
            .map((item, id) => (
              <TodoItem
                key={item.id}
                item={item}
                draggableId={`${item.id}`}
                index={id}
              />
            ))}
        </div>
      )}
    </Droppable>
  );
};

export default TodoItemsList;
