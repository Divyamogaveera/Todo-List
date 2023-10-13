import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "bootstrap";
// import Button from "react-bootstrap";

// get the local storage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [Items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  // add the item function
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data first");
    } else if (inputdata && toggleButton) {
      setItems(
        Items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...Items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the Items
  const editItem = (index) => {
    const item_todo_edited = Items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to deleete an item by Id
  // it willl return the items which are not matching
  const deleteItem = (index) => {
    const updatedItem = Items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  // code for removing all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(Items));
  }, [Items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todolist.jpg" alt="todo logo" />
            <figcaption>Add your list here ✨🎊</figcaption>
          </figure>
          <div className="addItems" id="combobox">
            <input
              type="text"
              placeholder="Add item 🙂✍"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            <p id="toggle">
              {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
              ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
              )}
            </p>
            <br />
          </div>
          {/* show all items */}
          <div class="showItems">
            {Items.map((curElem, index) => {
              return (
                <div className="eachItems" key={curElem.id}>
                  <h3>{curElem.name}</h3>

                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      aria-hidden="true"
                      onClick={() => {
                        editItem(curElem.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all item */}
          <div className="show items">
            <button
              id="ck"
              type="button"
              className="btn btn-dark"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
        <marquee behavior="" direction="">
          keep it up Buddy!!!
        </marquee>
      </div>
    </>
  );
};

export default Todo;
