import React, { useRef } from "react";
import "./InputHandler.css";

const InputHandler = (props) => {
  const inputHandler = useRef();

  const todoAdd = (e) => {
    e.preventDefault();
    if (
      inputHandler.current.value.length >= 3 &&
      JSON.parse(localStorage.getItem("isLoggedIn"))
    ) {
      props.todoAddHandler(inputHandler.current.value);
      inputHandler.current.value = "";
      inputHandler.current.placeholder = "";
    } else if (inputHandler.current.value.length < 3) {
      inputHandler.current.value = "";
      inputHandler.current.placeholder =
        "To do should contains at least 3 letters";
    } else if (JSON.parse(localStorage.getItem("isLoggedIn")) === false) {
      inputHandler.current.value = "";
      inputHandler.current.placeholder = "Please Log In first";
    }
  };

  return (
    <form onSubmit={todoAdd} className="input_form">
      <p>Add To Do</p>
      <input ref={inputHandler}></input>
      <button>Add To List</button>
    </form>
  );
};

export default InputHandler;
