import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask, deleteTask } from "./store/actions";

const App = () => {
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (editingTask) {
      dispatch(
        editTask(editingTask.id, { id: editingTask.id, text: taskText })
      );
      setTaskText("");
      setEditingTask(null);
    } else {
      dispatch(addTask({ id: Date.now(), text: taskText }));
      setTaskText("");
    }
  };

  const handleEditTask = (task) => {
    setTaskText(task.text);
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => handleEditTask(item)}
      onLongPress={() => handleDeleteTask(item.id)}
    >
      <Text style={styles.taskText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a task"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
        style={styles.input}
      />
      <Button
        title={editingTask ? "Save Task" : "Add Task"}
        onPress={handleAddTask}
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 8,
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
});

export default App;
