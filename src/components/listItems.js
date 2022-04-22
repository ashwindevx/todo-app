import React, { useContext } from "react";

import { AiFillDelete } from "react-icons/ai";

import { Context } from "../context/store";

const ListItems = () => {
  const { items, deleteItem } = useContext(Context);

  const deleteHandler = (id) => {
    deleteItem(id);
  };

  const deadline = (date, status) => {
    let dead = status !== "done" && new Date() > new Date(date);
    if (dead) {
      return "bg-red-500";
    } else {
      return "bg-white dark:bg-gray-500";
    }
  };

  return (
    <div className="flex flex-wrap my-5">
      {items.map((item) => (
        <div
          className={`p-2 m-2 ${deadline(item.date, item.status)}`}
          key={item.id}
        >
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

export default ListItems;
