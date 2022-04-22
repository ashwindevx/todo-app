import React, { useState, useContext } from "react";
import { Context } from "../context/store";

import { ImCross } from "react-icons/im";

const FormModal = ({ show, onClose }) => {
  const { addItem } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("todo");

  if (!show) {
    return null;
  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addItem({ id: Date.now(), title, description, date, status });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/25 flex items-center justify-center">
      <div className="mt-10 w-96 bg-white dark:bg-gray-500 px-10 pb-10 pt-5 rounded-3xl">
        <div className="text-right mb-4">
          <button onClick={onClose}>
            <ImCross />
          </button>
        </div>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <input
            className="my-1 text-sm w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black"
            type="text"
            placeholder="Title"
            required
            onChange={titleChangeHandler}
          />
          <textarea
            className="my-1 text-sm w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black"
            type="text"
            placeholder="Description"
            required
            onChange={descriptionChangeHandler}
          />
          <input
            className="my-1 text-sm w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black"
            type="date"
            required
            onChange={dateChangeHandler}
          />
          <select
            className="my-1 text-sm w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black"
            name="status"
            required
            defaultValue="todo"
            onChange={statusChangeHandler}
          >
            <option value="todo">Todo</option>
            <option value="pending">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="mt-4 rounded-xl bg-black px-6 py-3 text-bodyTwo font-medium text-white">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
