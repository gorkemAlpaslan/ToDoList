import { useEffect, useRef, useState } from "react";
import "./App.css";
import InputHandler from "./Components/InputHandler";
import { FaBeer } from "react-icons/fa";
import ConditionalPopUp from "./Components/ConditionalPopUp";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function App() {
  const [todoList, SettodoList] = useState([]);

  const [popup, SetPopup] = useState({ display: false, title: "" });
  const LogDisplayHandler = () => {
    SetPopup({ display: false, title: "" });
  };

  const getTodoData = () => {
    fetch("https://63232986a624bced3088ddc3.mockapi.io/todos")
      .then((res) => res.json())
      .then((result) => {
        SettodoList(result);
      });
  };

  useEffect(() => {
    getTodoData();
  }, []);

  /////////// To do ekleme ///////////
  const addTodo = (event, todoInput) => {
    const requestOptions = {
      method: event,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Todo: todoInput }),
    };

    fetch("https://63232986a624bced3088ddc3.mockapi.io/todos", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        getTodoData();
      });
  };

  const todoAddHandler = (todoInput) => {
    addTodo("POST", todoInput);
  };

  /////////// Liste filtreleme ///////////
  const ListFilterAllHandler = () => {
    getTodoData();
  };

  const listFilterDoneHandler = () => {
    fetch("https://63232986a624bced3088ddc3.mockapi.io/todos")
      .then((res) => res.json())
      .then((result) => {
        let tempList = [];
        for (let item of result) {
          if (item.isCompleted == true) {
            tempList.push(item);
          }
        }
        SettodoList(tempList);
      });
  };

  const listFilterToDoHandler = () => {
    fetch("https://63232986a624bced3088ddc3.mockapi.io/todos")
      .then((res) => res.json())
      .then((result) => {
        let tempList = [];
        for (let item of result) {
          if (item.isCompleted == false) {
            tempList.push(item);
          }
        }
        SettodoList(tempList);
      });
  };

  /////////// Delete todo ///////////
  const deleteToDoHandler = (id) => {
    fetch(`https://63232986a624bced3088ddc3.mockapi.io/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => getTodoData());
  };

  /////////// Check todo ///////////
  const todoIsComplated = (complateId, isComplate) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !isComplate }),
    };

    fetch(
      `https://63232986a624bced3088ddc3.mockapi.io/todos/${complateId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {});
  };

  const LogOutHandler = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false);
  };

  return (
    <>
      <ConditionalPopUp
        display={popup}
        displayNo={LogDisplayHandler}
        getTodoData={getTodoData}
      ></ConditionalPopUp>
      <div className="Card">
        <div className="to_do_wrapper">
          <div className="header_wraper">
            <h3 className="head">
              {JSON.parse(localStorage.getItem("isLoggedIn")) ? (
                <div>
                  <div>
                    User: {JSON.parse(localStorage.getItem("isLoggedIn"))}
                  </div>
                </div>
              ) : (
                <p>User: Guest</p>
              )}
            </h3>
            <div className="LogButtons">
              {JSON.parse(localStorage.getItem("isLoggedIn")) ? (
                <div>
                  <button className="LogBut" onClick={LogOutHandler}>
                    LogOut
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="LogBut"
                    onClick={() => {
                      SetPopup({ display: true, title: "Sign Up" });
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    className="LogBut"
                    onClick={() => {
                      SetPopup({ display: true, title: "Log In" });
                    }}
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="add_to_do_comp">
            <InputHandler todoAddHandler={todoAddHandler}></InputHandler>
          </div>
          <div className="sort_options">
            <button onClick={ListFilterAllHandler}>List All</button>
            <button onClick={listFilterDoneHandler}>List Completed </button>
            <button onClick={listFilterToDoHandler}>List non-Completed</button>
          </div>
          <div>
            <div>
              <div className="todo_list">
                {todoList.length > 0 &&
                  todoList.map((eachtodo) => {
                    return (
                      <li className="todo_list_item" key={eachtodo.id}>
                        <div className="todo_title">
                          <input
                            type="checkbox"
                            defaultChecked={eachtodo.isCompleted}
                            onChange={() => {
                              todoIsComplated(
                                eachtodo.id,
                                eachtodo.isCompleted
                              );
                            }}
                            className="is_complate_checkbox"
                          />
                          <div>{eachtodo.Todo}</div>
                        </div>
                        <div className="todo_buttons">
                          <div
                            onClick={() => {
                              SetPopup({
                                display: true,
                                title: "Edit",
                                editId: eachtodo.id,
                              });
                            }}
                          >
                            <AiFillEdit></AiFillEdit>
                          </div>
                          <div
                            onClick={() => {
                              deleteToDoHandler(eachtodo.id);
                            }}
                          >
                            <AiFillDelete></AiFillDelete>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
