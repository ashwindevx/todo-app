import React, { useEffect, useState } from "react";

export const Context = React.createContext();

const Store = ({ children }) => {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    let currentTheme = "";
    if (theme === "light") {
      currentTheme = "dark";
    } else {
      currentTheme = "light";
    }
    setTheme(currentTheme);
  }

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

  const value = {
    items,
    theme,
    toggleTheme,
    addItem,
    deleteItem,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Store;
