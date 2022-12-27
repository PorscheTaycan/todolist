import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import React, { useState } from 'react';
import TitleListModal from './modal/TitleListModal'
import Calendar from './components/Calendar'
import dayjs from 'dayjs';
import AnalogClock from './common/components/Clock'
import { Row, Col } from "reactstrap";

const App = () => {
  const [userName, setUserName] = useState("jmyu")
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState([])
  const [titleModalVisible, setTitleModalVisible] = useState(false)
  //자주 보는 일정 일단 하드코딩
  const [freSchedule, setFreSchedule] = useState([{ title: "회사출근" }, { title: "회사퇴근" }, { title: "취침" }])
  const [pickerDate, setPickerDate] = useState(dayjs(new Date()));

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      onCreate();
    }
  }

  const onCreate = () => {
    if (pickerDate === null) {
      alert("시간 형식이 맞지않습니다")
      return false;
    }

    let formatTime = pickerDate.format("HH:mm")
    console.log(formatTime)
    let tempList = [...todos];
    let f = false;

    if (value === "") {
      alert("일정을 입력해주세요");
    } else if (formatTime === "Invalid Date") {
      alert("시간 형식이 맞지않습니다");
    } else if (tempList.length >= 10) {
      alert("할 일이 너무 많습니다")
    } else {
      for (let i = 0; i < tempList.length; i++) {
        if (value === tempList[i].title) {
          alert("리스트에 같은 타이틀이 존재합니다.");
          f = true;
          break;
        } else {
          f = false;
        }
      }
      if (!f) {
        tempList.push({ id: userName, date: pickerDate, title: value, checked: true })
        setTodos(tempList);
        setValue("");

        tempList.sort(function (a, b) {
          return a.date.format("HH") - b.date.format("HH")
        })
      }
    }
  }

  const onRemove = (index) => {
    let tempList = [...todos];

    tempList.splice(index, 1)
    setTodos(tempList)
  }

  const getTitleList = () => {
    setTitleModalVisible((prev) => !prev);
  }

  const mergeTodoList = (data) => {
    let resultList = [...todos, ...data];
    setTodos(resultList)
  }

  const handleOnDragEnd = (result) => {
    //다른 레이어 영역으로 빠져 나가지 않게
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items)
  }

  return (
    <div style={{ backgroundColor: "#d8dbe0" }}>
      <Row>
        <Col md="9">
          <TodoListTemplate
            form={<Form
              value={
                value
              }
              onChange={
                onChange
              }
              onCreate={
                onCreate
              }
              onKeyPress={
                onKeyPress
              }
              getTitleList={
                getTitleList
              }
              pickerDate={pickerDate}
              setPickerDate={setPickerDate}
            />}>
            <TodoItemList todos={todos} onRemove={onRemove} handleOnDragEnd={handleOnDragEnd} />
          </TodoListTemplate>
        </Col>
        <Col md="3">
          <AnalogClock />
        </Col>
      </Row>
      <Calendar />
      <TitleListModal
        setTitleModalVisible={setTitleModalVisible}
        titleModalVisible={titleModalVisible}
        getTitleList={getTitleList}
        freSchedule={freSchedule}
        mergeTodoList={mergeTodoList}
      />
    </div>
  );
}

export default App;
