import React, { useRef } from "react";
import "./ConditionalPopUp.css";

const ConditionalPopUp = (props) => {
  const PopupInput = useRef();

  const SignUpHandler = () => {
    if (!JSON.parse(localStorage.getItem("Profiles"))) {
      localStorage.setItem(
        "Profiles",
        JSON.stringify([PopupInput.current.value.toLowerCase()])
      );
    } else {
      const OrlProfiles = JSON.parse(localStorage.getItem("Profiles"));
      OrlProfiles.push(PopupInput.current.value.toLowerCase());
      localStorage.setItem("Profiles", JSON.stringify(OrlProfiles));
    }
    props.displayNo();
  };

  const logInHandler = () => {
    const Users = JSON.parse(localStorage.getItem("Profiles"));
    if (Users.includes(PopupInput.current.value.toLowerCase())) {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(PopupInput.current.value)
      );
      props.displayNo();
    } else {
      PopupInput.current.placeholder = "Please Sign Up first";
      PopupInput.current.value = "";
    }
  };

  /////////// Edit todo ///////////
  const EditToDoHandler = () => {
    if (PopupInput.current.value.length >= 3) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Todo: PopupInput.current.value }),
      };

      fetch(
        `https://63232986a624bced3088ddc3.mockapi.io/todos/${props.display.editId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((result) => {
          props.getTodoData();
        });
      props.displayNo();
    } else {
      PopupInput.current.value = "";
      PopupInput.current.placeholder =
        "To do should contains at least 3 letters";
    }
  };

  return (
    <div>
      {props.display.display && (
        <div className="popup_background_card">
          <form
            className="popup_for_edit_input"
            onSubmit={(e) => {
              e.preventDefault();
              if (props.display.title === "Sign Up") {
                SignUpHandler();
              } else if (props.display.title === "Log In") {
                logInHandler();
              } else if (props.display.title === "Edit") {
                EditToDoHandler();
              }
            }}
          >
            <div>{props.display.title}</div>
            <input ref={PopupInput}></input>
            <div className="edit_buttons">
              <button>Submit</button>
              <button
                onClick={() => {
                  props.displayNo();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConditionalPopUp;
