import { Task } from "./task";

export function clearTasksFromLocalStorage(){
    localStorage.clear();
}
 
export function saveTasksToLocalStorage(taskList: Task[]){
    localStorage.setItem('taskListLocalStorage', JSON.stringify(taskList));
}

export function loadTasksFromLocalStorage(): Task[]{
    //if there's an intent for more than one list of tasks, one should be able to pass an argument for a different key
    const taskListStringForm: string | null = localStorage.getItem('taskListLocalStorage')
    let taskList: Task[] = [];
    if(taskListStringForm != null){
        taskList = JSON.parse(taskListStringForm) as Task[];
    }
    return taskList;
}