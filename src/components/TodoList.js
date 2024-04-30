/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/
"use client";

import React, { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import 'tailwindcss/tailwind.css';
import { Button } from "@/components/ui/button"

// firebase 코드 추가 0430
// firebase 관련 모듈을 불러옵니다.
import { db } from "@/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";

// DB의 todos 컬렉션 참조를 만듭니다. 컬렉션 사용시 잘못된 컬렉션 이름 사용을 방지합니다.
const todoCollection = collection(db, "todos");

// TodoList 컴포넌트를 정의합니다.
const TodoList = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [sortByDate, setSortByDate] = useState(false); // 추가: 정렬 상태 추가
  

  // Firestore에서 할 일 목록을 가져오는 함수
  const getTodos = async () => {
    try {
      const querySnapshot = await getDocs(todoCollection);
      const newTodos = [];
      querySnapshot.forEach((doc) => {
        newTodos.push({ id: doc.id, ...doc.data() });
      });

      // 텍스트를 기준으로 오름차순으로 정렬합니다.
    newTodos.sort((a, b) => a.text.localeCompare(b.text));

    setTodos(newTodos);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Firestore에서 정렬된 쿼리를 사용하여 할 일 목록을 가져오는 함수
  const getSortedTodos = async () => {
    try {
      // Firestore 쿼리를 만듭니다. 날짜 및 시간 필드를 기준으로 오름차순 정렬
      const q = query(todoCollection, orderBy("date", "asc"));
      
      // Firestore 에서 정렬된 할 일 목록을 조회합니다.
      const querySnapshot = await getDocs(q);
      
      // 정렬된 목록을 가져와서 새로운 배열로 만듭니다.
      const newTodos = [];
      querySnapshot.forEach((doc) => {
        newTodos.push({ id: doc.id, ...doc.data() });
      });


    // 상태를 업데이트합니다.
    setTodos(newTodos); // 정렬된 데이터로 상태를 업데이트합니다.
  } catch (error) {
    console.error("Error getting sorted documents: ", error);
  }
};
  
  // useEffect를 사용하여 정렬 상태가 변경될 때마다 정렬된 할 일 목록을 가져옵니다.`
  useEffect(() => {
    if (sortByDate) {
      getSortedTodos();
    } else {
      getTodos();
    }
  }, [sortByDate]); // 추가: sortByDate가 변경될 때마다 실행되도록 변경

  // addTodo 함수는 입력값을 이용하여 새로운 할 일을 목록에 추가하는 함수입니다.
  const addTodo = async() => {
    // 입력값이 비어있는 경우 함수를 종료합니다.
    if (input.trim() === "") return;
    // 기존 할 일 목록에 새로운 할 일을 추가하고, 입력값을 초기화합니다.
    // {
    //   id: 할일의 고유 id,
    //   text: 할일의 내용,
    //   completed: 완료 여부,
    // }
    // ...todos => {id: 1, text: "할일1", completed: false}, {id: 2, text: "할일2", completed: false}}, ..
    // setTodos([...todos, { id: Date.now(), text: input, completed: false }]); Firefox 추가하며 아래 코드로 대체
   
    // Firestore 에 추가한 할 일을 저장합니다.
    const docRef = await addDoc(todoCollection, {
      text: input,
      date: inputDate, // 추가: 날짜 및 시간 추가
      completed: false,
    });

    // id 값을 Firestore 에 저장한 값으로 지정합니다.
    setTodos([...todos, { id: docRef.id, text: input, date: inputDate, completed: false }]);
    setInput("");
    setInputDate(""); // 추가: 입력 후 초기화
  };

  // toggleTodo 함수는 체크박스를 눌러 할 일의 완료 상태를 변경하는 함수입니다.
  const toggleTodo = (id) => {
    // 할 일 목록에서 해당 id를 가진 할 일의 완료 상태를 반전시킵니다.
    setTodos(
      // todos.map((todo) =>
      //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
      // )
      // ...todo => id: 1, text: "할일1", completed: false
      todos.map((todo) => {
        if (todo.id === id) {
          // Firestore 에서 해당 id를 가진 할 일을 찾아 완료 상태를 업데이트합니다.
          const todoDoc = doc(todoCollection, id);
          updateDoc(todoDoc, { completed: !todo.completed });
          // ...todo => id: 1, text: "할일1", completed: false
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  // deleteTodo 함수는 할 일을 목록에서 삭제하는 함수입니다.
  const deleteTodo = (id) => {
      // Firestore 에서 해당 id를 가진 할 일을 삭제합니다.
      const todoDoc = doc(todoCollection, id);
      deleteDoc(todoDoc);    

    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  // 정렬 버튼 클릭 시 정렬 상태 변경
  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  // 컴포넌트를 렌더링합니다.
  return (
    <div className="mx-auto text-center bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-extrabold mt-3">Todo List ✅</h1>
      {/* 할 일을 입력받는 텍스트 필드입니다. */}
      <div className="flex justify-between mb-4"></div>
        <input
          type="text"
          className="w-8/12 h-11 py-2 px-3 border rounded-lg border-gray-300 mx-1 my-2 mr-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      
      {/* 추가: 날짜 및 시간 입력 필드 */}
      <input
        type="datetime-local"
        className="w-1/12 h-11 py-2 px-3 border rounded-lg border-gray-300 mx-1 my-2 mr-auto"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />  
  
      {/* 할 일을 추가하는 버튼입니다. */}
      <Button className="w-2/12 h-11 mx-1 my-2 mr-auto" variant="default" onClick={addTodo}>Add Todo</Button>
      
      

      {/* 정렬 버튼 */}
    <Button className="ml-auto h-6 mb-4 my-1" variant="ghost" onClick={handleSortByDate}>
      {sortByDate ? "Sort by Text" : "Sort by Date"}
    </Button>

    {/* 할 일 목록을 렌더링합니다. */}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
