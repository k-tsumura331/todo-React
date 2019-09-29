import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

const App = () => {
  // Stateの初期化
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [loading, setLoading] = useState(false);

  // イベントハンドラ
  const handleTodoValue = event => {
    setTodoValue(event.target.value);
  };

  // 追加ボタンハンドラ
  const addTodo = () => {
    setTodoList([...todoList, todoValue]);
    setTodoValue("");
  };

  // 保存ボタンハンドラ
  const postTodo = () => {
    postTodoList();
  };

  const getTodoList = () => {
    setLoading(true);
    axios
      .get(
        // "https://jsonbox.io/box_ksyunnnne8bb071cbaf7c0fa1829/5d8993272bd38a0017ce2d53"
        "https://jsonbox.io/box_5c9bb3b61875e48bf2b3/5d90407071cce900175d677c"
      )
      .then(response => {
        console.log(response.data);
        setTodoList(response.data.todos);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log("effect");
    getTodoList();
  }, []);

  // const initTodoList = () => {
  //   axios
  //   .post()
  // }

  const postTodoList = () => {
    axios
      .post("https://jsonbox.io/box_5c9bb3b61875e48bf2b3", {
        todos: [...todoList, todoValue]
      })
      .then(() => {
        console.log("成功したよ");
        getTodoList();
      });
    // setTodoList([...todolist, todoValue]);
  };

  //
  return (
    <div className="App">
      <h1>TodoL ist</h1>
      <h2>やりたいことリスト</h2>
      <p>{loading ? "loading..." : ""}</p>
      <div className="todo-wrapper">
        {todoList.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </div>
      <div className="todo-action">
        <input value={todoValue} onChange={handleTodoValue} />
        <button onClick={addTodo}>追加</button>
        <button onClick={postTodo}>保存</button>
      </div>

      <button onClick={getTodoList}>データ取得</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
