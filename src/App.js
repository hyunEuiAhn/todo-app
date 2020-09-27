import React, { useReducer, useCallback, useRef} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i<= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
// const App = () => {
//   const [todos, setTodos] = useState(createBulkTodos);

//   //고윳값으로 사용 될 id
//   // ref를 사용하여 변수 담기
//   const nextId = useRef(2501);

//   const onInsert = useCallback(
//     text => {
//       const todo ={
//         id : nextId.current,
//         text,
//         checked: false,
//       };
//       setTodos(todos => todos.concat(todo));
//       nextId.current += 1;  //nextId +1
//     },
//     [],
//   );
//   const onRemove = useCallback (
//     id => {
//       setTodos(todos => todos.filter(todo => todo.id !== id));
//     },
//     [],
//   );
//   const onToggle = useCallback (
//     id => {
//       setTodos(todos =>
//         todos.map(todo => 
//           todo.id === id ? { ...todo, checked : !todo.checked } : todo,
//           ),
//       );
//     },
//     [],
//   )
//   return (
//   <TodoTemplate>
//     <TodoInsert onInsert={onInsert}/>
//     <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
//   </TodoTemplate>
//   );
// };

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로추가
    // {type: 'INSERT', todo: { id:1, text: 'todo', checked: false} 
  return todos.concat(action.todo)
  case 'REMOVE': //제거
  // {type: 'REMOVE', todo: { id:1} 
  return todos.filter(todo => todo.id !== action.id);
  case 'TOGGLE': //토글
  // {type: 'TOGGLE', todo: { id:1} 
  return todos.map(todo => 
    todo.id === action.id ? { ...todo, checked: !todo.checked} : todo,
    );
    default : 
    return todos;
  }
}
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고윳값으로 사용 될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo ={
        id : nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo});
      nextId.current += 1;
    }, []);

    const onRemove = useCallback(id => {
      dispatch({type: 'REMOVE', id});
    }, []);

    const onToggle = useCallback(id => {
      dispatch({type: 'TOGGLE', id});
    }, []);
      return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
  </TodoTemplate>
  );
}; 
export default App;
