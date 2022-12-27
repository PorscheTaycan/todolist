import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoItemList = ({ todos, onRemove, handleOnDragEnd }) => {
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