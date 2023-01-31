import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import React, { useState } from 'react';
import TitleListModal from './modal/TitleListModal'
import Calendar from './components/Calendar'
import dayjs from 'dayjs';
import AnalogClock from './common/components/Clock'
import { Row, Col } from "reactstrap";
import TodoItem from './components/TodoItem';
import { ModifierFlags } from 'typescript';
import ModifyModal from './modal/ModifyModal';



const App = () => {
  const [userName, setUserName] = useState("jmyu")
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState([])
  const [titleModalVisible, setTitleModalVisible] = useState(false)
  const [modifyModal, setModifyModal] = useState(false)


  //자주 보는 일정 일단 하드코딩
  const [freSchedule, setFreSchedule] = useState([{ title: "회사출근" }, { title: "회사퇴근" }, { title: "취침" }])
  const [pickerDate, setPickerDate] = useState(dayjs(new Date())); //이게 현재시간
  const [tempName, setTempName] = useState("");
  const [modalIndex, setModalIndex] = useState(0);
  const [clockName, setclockName] = useState("");

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


  const upDateTodos = (index) => {

    let tempList = [...todos];

    let indexList = tempList[index].title;
    setTempName(indexList);
    setModalIndex(index);
    setModifyModal(true);
  }


  const setChange = (date) => {

    //변경이 되게
    //현재 배열 = todos
    //현재 index = modalIndex
    //현재 바뀐 값 = tempName

    let tempList = [...todos];
    tempList[modalIndex].title = tempName;  //여기가 그때 설명해주신 부분이고요
    tempList[modalIndex].date = date;

    // let clockList = [...todos];

    // let formatTime = pickerDate.format("HH:mm");

    // clockList[modalIndex].date = formatTime;
    // console.log(formatTime) 



    // clockList = clockName;
    //clockList[modalIndex].date.format("HH:mm") = clockName;
    //console.log(todos);

    // let clockList = todos.date.format("HH:mm");
    //clockList[modalIndex].date = clockName;
    //console.log(clockName);

    //시간의 데이터가 변경된 시간으로 되게 하기만 하면 됨.

    setTodos(tempList);
    // setPickerDate(formatTime);
    //console.log(clockName)
    //ㅎㅇ 어떤거 했고 어디까지 했는지 설명좀

    setModifyModal(false);
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

  const testButton = () => {
    let tempList = [...todos];
    //문제. 
    //빈 배열일때 {id: userName, date: pickerDate, title: "자동추가", checked: true} 이걸 추가하고
    //일정이 4개 이상이면 가장 오래된 일정을 자동 삭제한다.
    //이거 해볼 수 있겠어? 

    //1. 빈 배열일때 = 배열의 길이가 0일때
    // if (tempList.length === 0) {
    //   tempList.push({ id: userName, date: pickerDate, title: "자동추가", checked: true });
    // } else if (tempList.length > 3) {
    //   //빈 배열이 아닐때
    //   tempList.splice(0, 1); 
    // }
    if (tempList.length > 4) {
      console.log(123)
      tempList.splice(-2, 2); //끝에서 2번째부터 앞으로 2개를 삭제해라
    }
    setTodos(tempList)
    //암튼 이렇게 쓰는건가봐 조건문이랑 반복문 하루에 한개씩 쓰는거 해보자 네 ㅇㅋ 오늘은 여까지 수고했어! 고생하셨어요!
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
              testButton={testButton}



              pickerDate={pickerDate}
              setPickerDate={setPickerDate}
            />}>


            <TodoItemList todos={todos} onRemove={onRemove} handleOnDragEnd={handleOnDragEnd} upDateTodos={upDateTodos} />

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

      <ModifyModal
        setModifyModal={setModifyModal}
        modifyModal={modifyModal}
        upDateTodos={upDateTodos}
        todos={todos}
        tempName={tempName}
        setTempName={setTempName}
        setChange={setChange}
        setPickerDate={setPickerDate}
        pickerDate={pickerDate}
      />


    </div>
  );
}

export default App;
