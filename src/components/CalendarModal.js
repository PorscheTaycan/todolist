import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import Picker from "../common/module/Picker";
import Style from "../common/module/Style";
import ModalReducer from "../common/reducers/ModalReducer";
import CalcDate from '../common/module/CalcDate';

const CalendarModal = ({ index, visible, onConfirm, onCancel }) => {
    const initialState = {
        color: '',
        todo: '',
        todos: '',
        checked: false,
        date: ''
    };

    const [state, dispatch] = useReducer(ModalReducer, initialState)

    const color = state.color;
    const todo = state.todo;
    const todos = state.todos;
    const check = state.checked;
    const end = state.date

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onConfirm({ index, todo })
            dispatch({ type: 'CHANGE', value: '' })
        }
    }

    // 초기화
    const Initialization = () => {
        dispatch({ type: 'INITIALIZATION' })
    }

    // 색상 변경
    const changeColor = (color) => {
        dispatch({ type: 'COLOR', value: color })
    }

    // 일정
    const onChange = useCallback(e => {
        dispatch({ type: 'TODO', value: e.target.value })
    }, [])

    // 일정 종료일
    const onTodos = useCallback(e => {
        dispatch({ type: 'TODOS', value: e.target.value })
    }, [])

    // 체크 박스
    const onCheck = () => {
        dispatch({ type: 'CHECK', value: check })
    }

    // 입력 취소
    const cancel = () => {
        onCancel()
        Initialization()
    }

    // 입력
    const confirm = () => {
        const todos = CalcDate(index, end)
        onConfirm({ index, todo, color, todos })
        Initialization()
        changeColor('')
    }

    if (!visible) return null;
    return (
        <div className="fullscreen">
            <div className="calendar-modal">
                <p>{index}</p>
                <div className="input">
                    <input placeholder="일정" value={todo} onChange={onChange} onKeyPress={onKeyPress}></input>
                    {color !== '' && <div className="custom-check-box"
                        style={Style(color)} />}
                </div>
                <div className="end">
                    <p>종료일 설정</p>
                    <input type='checkbox' onClick={onCheck} />
                </div>
                <div className="choice-day">
                    {check === true &&
                        <div className="day">
                            <div className="end-day">
                                <input type="text" onChange={onTodos} placeholder="2021.10.13" />
                            </div>
                        </div>
                    }
                </div>
                <Picker changeColor={changeColor} />
                <div className="footer">
                    <button className="choice" onClick={confirm} >Confirm</button>
                    <button className="choice" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div>
    //         <Draggable
    //             axis="both"
    //             handle=".handle"
    //             defaultPosition={{ x: 0, y: 0 }}
    //             position={null}
    //             grid={[25, 25]}
    //             scale={1}
    //         >
    //             <Modal isOpen={visible} toggle={onCancel} className="handle">
    //                 <ModalBody>
    //                     <p className="calendar-modal">{index}</p>
    //                     <div className="calendar-input">
    //                         <input placeholder="일정" value={todo} onChange={onChange} onKeyPress={onKeyPress}></input>
    //                         {color !== '' && <div className="custom-check-box"
    //                             style={Style(color)} />}
    //                     </div>
    //                     <div className="end">
    //                         <p>종료일 설정</p>
    //                         <input type='checkbox' onClick={onCheck} />
    //                     </div>
    //                     <div className="choice-day">
    //                         {check === true &&
    //                             <div className="day">
    //                                 <div className="end-day">
    //                                     <input type="text" onChange={onTodos} placeholder="2021.10.13" />
    //                                 </div>
    //                             </div>
    //                         }
    //                     </div>
    //                     <Picker changeColor={changeColor} />
    //                     <div className="footer">
    //                         <button className="choice" onClick={confirm} >Confirm</button>
    //                         <button className="choice" onClick={cancel}>Cancel</button>
    //                     </div>
    //                 </ModalBody>
    //             </Modal>
    //         </Draggable>
    //     </div>
    // );
};

export default CalendarModal
