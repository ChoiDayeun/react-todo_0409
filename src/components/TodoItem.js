/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React from "react";
import { Button } from "@/components/ui/button"


// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete }) => {
    // 날짜를 yyyy-MM-dd hh:mm A 형식으로 변환하는 함수
    const formatDateTime = (dateTime) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric", hour12: true };
      return new Date(dateTime).toLocaleString("en-US", options);
    };

  // 각 할 일 항목을 렌더링합니다.
  return (
    <li className="flex items-center justify-between border-b border-gray-300 py-3">
      {/* 체크박스를 렌더링하고, 체크박스의 상태를 할 일의 완료 상태와 동기화합니다.
          체크박스의 상태가 변경되면 onToggle 함수를 호출하여 완료 상태를 업데이트합니다. */}
      <div className="flex items-center flex-grow">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} className="mr-2" />
        {/* 할 일의 텍스트를 렌더링하고, 완료 상태에 따라 텍스트에 취소선을 적용합니다. */}
          <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
          {/* 수정: 입력된 날짜 표시 */}
          {/* Todo date */}
          <span className="text-gray-500 text-xs mr-2">{todo.date && formatDateTime(todo.date)}</span>
        </div>
      {/* 삭제 버튼을 렌더링하고, 클릭 시 onDelete 함수를 호출하여 해당 할 일을 삭제합니다. */}
      <Button className="w-14 h-7" variant="destructive" onClick={onDelete}>Delete</Button>
    </li>
  );
};

// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;
