import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  function reduceText(text, length) {
    return text.slice(0, length);
  }

  function getDate(miliseconds) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(miliseconds);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();

    return `${months[month]} ${day} ${year}`;
  }

  getDate();

  return (
    <GlobalContext.Provider
      value={{ user, blogs, setUser, setBlogs, reduceText, getDate }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
