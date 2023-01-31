import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoItemList = ({ todos, onRemove, handleOnDragEnd, upDateTodos }) => {
  return (
    // {
    //   todos.map((data, index) => {
    //     return (
    //       <TodoItem
    //         key={index}
    //         text={data.title}
    //         onRemove={onRemove}
    //         index={index}
    //       />
    //     )
    //   })
    // }
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((data, index) => {
              return (
                <Draggable key={data.title} draggableId={data.title} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <TodoItem
                        data={data}
                        onRemove={onRemove}
                        index={index}
                        upDateTodos={upDateTodos}  //정의가 안 되었다고 하는데 TodoItem에서 정의 한거 같은데 왜 정의 안 했다고 뜨는지 모르겠음
                      />
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoItemList;