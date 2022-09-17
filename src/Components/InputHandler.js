import React, { useRef } from "react";
import "./InputHandler.css";

const InputHandler = (props) => {
  const inputHandler = useRef();

  const todoAdd = (e) => {
    e.preventDefault();
    if (inputHandler.current.value.length >= 3) {
      props.todoAddHandler(inputHandler.current.value);
      inputHandler.current.value = "";
      inputHandler.current.placeholder = "";
    } else {
      inputHandler.current.value = "";
      inputHandler.current.placeholder =
        "To do should contains at least 3 letters";
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
