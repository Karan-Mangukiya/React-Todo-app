import React from "react";
import { useState, useEffect } from "react";
import "../todoreact/style.css";
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editedItem, setEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("please add data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((element) => {
          if (element.id === editedItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setInputData("");
      setEditedItem();
      setToggleButton(false);
    } else {
      const myNewInputData = { id: new Date().getTime().toString(), name: inputData };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const updateItem = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(updateItem.name);
    setEditedItem(index);
    setToggleButton(true);
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((element) => {
      return element.id !== id;
    });
    setItems(updatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              style={{ height: "100px" }}
              src="https://assets.devfolio.co/projects/b48a0c02056e452d9f50faffa54dab98/piciy9uzrc4b.jpg"
              alt="todo logo "
            />

            <figcaption>Add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            {!toggleButton ? (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                onClick={() => {
                  addItem();
                  // editItem(element.id);
                }}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(element.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(element.id);
                        console.log(element.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                removeAll();
              }}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
