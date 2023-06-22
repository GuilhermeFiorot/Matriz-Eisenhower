import React, { useState } from 'react';
import styled from 'styled-components';

const EisenhowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const EisenhowerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;

const Quadrant = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 12px;
`;

interface CellProps {
  backgroundColor: string;
}

const Cell = styled.div<CellProps>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 600px;
  height: 300px;
  background-color: ${(props) => props.backgroundColor};
`;

const CellTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const AddButton = styled.button`
  font-size: 14px;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 16px;
  border-radius: 4px;
  width: 300px;
  height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Question = styled.p`
  margin-bottom: 8px;
  padding: 2px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 8px;
  padding: 2px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
`;

const CheckboxLabel = styled.label`
  margin-left: 4px;
  padding: 2px;
`;

const Task = styled.div`
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

type Task = {
  name: string;
  description: string;
  urgent: boolean;
  important: boolean;
};


const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [tasks, setTasks] = useState<Array<Array<Task>>>([[], [], [], []]);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTaskName('');
    setTaskDescription('');
    setIsUrgent(false);
    setIsImportant(false);
  };

  const addTask = () => {
    const newTask: Task = {
      name: taskName,
      description: taskDescription,
      urgent: isUrgent,
      important: isImportant,
    };
    const quadrantIndex = isUrgent ? (isImportant ? 0 : 2) : isImportant ? 1 : 3;
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[quadrantIndex].push(newTask);
      return updatedTasks;
    });
    closeDialog();
  };

  return (
    <EisenhowerContainer>
      <AddButton onClick={openDialog}>Add Task</AddButton>
      {dialogOpen && (
        <Dialog>
          <Question>Task Name:</Question>
          <Input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Question>Task Description:</Question>
          <Input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <CheckboxWrapper>
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={() => setIsUrgent(!isUrgent)}
            />
            <CheckboxLabel>Urgent</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <input
              type="checkbox"
              checked={isImportant}
              onChange={() => setIsImportant(!isImportant)}
            />
            <CheckboxLabel>Important</CheckboxLabel>
          </CheckboxWrapper>
          <button onClick={addTask}>Add</button>
          <button onClick={closeDialog}>Cancel</button>
        </Dialog>
      )}
      <EisenhowerWrapper>
        <Quadrant>
          <Cell backgroundColor="#afa">
            <CellTitle>Important and Urgent</CellTitle>
            {tasks[0].map((task, index) => (
              <Task key={index}>
                Task : {task.name} | Description : {task.description}
              </Task>
            ))}
          </Cell>
        </Quadrant>
        <Quadrant>
          <Cell backgroundColor="#aaf">
            <CellTitle>Important but Not Urgent</CellTitle>
            {tasks[1].map((task, index) => (
              <Task key={index}>
                Task : {task.name} | Description : {task.description}
              </Task>
            ))}
          </Cell>
        </Quadrant>
        <Quadrant>
          <Cell backgroundColor="#ffa">
            <CellTitle>Not Important but Urgent</CellTitle>
            {tasks[2].map((task, index) => (
              <Task key={index}>
                Task : {task.name} | Description : {task.description}
              </Task>
            ))}
          </Cell>
        </Quadrant>
        <Quadrant>
          <Cell backgroundColor="#f77">
            <CellTitle>Not Important and Not Urgent</CellTitle>
            {tasks[3].map((task, index) => (
              <Task key={index}>
                Task : {task.name} | Description : {task.description}
              </Task>
            ))}
          </Cell>
        </Quadrant>
      </EisenhowerWrapper>
    </EisenhowerContainer>
  );
};
export default App;