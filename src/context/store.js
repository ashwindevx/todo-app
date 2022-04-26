import React, { useEffect, useState } from "react";

// Created the context
export const Context = React.createContext();

// Store function that will handle all our states and create, update and delete functions
const Store = ({ children }) => {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");
  console.log(items);

  // fn handling dark theme
  function toggleTheme() {
    let currentTheme = "";
    if (theme === "light") {
      currentTheme = "dark";
    } else {
      currentTheme = "light";
    }
    setTheme(currentTheme);
  }

  // Getting the todos from localstorage
  useEffect(() => {
    let items = localStorage.getItem("todos");
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    setItems(items);
  }, []);

  function addItem(data) {
    const newItems = [...items, data];
    setItems(newItems);
    localStorage.setItem("todos", JSON.stringify(newItems));
  }

  function deleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    localStorage.setItem("todos", JSON.stringify(newItems));
  }

  function replaceItem({ destination, itemId }) {
    const newItems = [...items];
    const itemIdx = newItems.findIndex((item) => item.id === itemId);

    if (itemIdx >= 0) {
      newItems[itemIdx].status = destination.droppableId;
    }

    console.log(itemId);

    setItems(newItems);
    localStorage.setItem("todos", JSON.stringify(newItems));
  }

  const value = {
    items,
    theme,
    toggleTheme,
    addItem,
    deleteItem,
    replaceItem,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Store;
