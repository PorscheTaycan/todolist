import './TodoItem.css';


const TodoItem = ({ data, onRemove, index }) => {
  return (
    <div className="todo-item">
      <div className="remove" onClick={(e) => {
        e.stopPropagation(); // onToggle 이 실행되지 않도록 함
        onRemove(index)
      }
      }>&times;</div>
      {/* <div className={`todo-text ${checked && 'checked'}`}> */}
      <div>{data.title} {"(" + data.date.format("HH:mm") + ")"}</div>
      {/* </div> */}
      {/* {
        checked && (<div className="check-mark">✓</div>)
      } */}
    </div>
  );
}

export default TodoItem;