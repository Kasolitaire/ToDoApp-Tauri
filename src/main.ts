import { nanoid } from 'nanoid'
import { Task } from './task';
import { createExportFile } from './fileSystemOperations';

// console.log('message')
// invoke('greet').then((message) => {console.log(typeof message)})

let taskList: Task[] = [];
const exportButton = document.querySelector<HTMLButtonElement>('#export-button')
exportButton?.addEventListener('click', () => createExportFile(taskList))
const unorderedList = document.querySelector<HTMLUListElement>("#unordered-list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const clearButton = document.querySelector<HTMLButtonElement>('#clear-button')
clearButton?.addEventListener('click', async () => {
    const accept = await confirm('Are you sure you want to clear all tasks, this process cannot be undone')
    if(accept){
        clearTasksFromLocalStorage();
        taskList = [];
        while(unorderedList?.hasChildNodes()){
            unorderedList.removeChild(unorderedList.firstChild as Node);
        }
    }
})

loadTasksFromLocalStorage();

const submitTask = (event: Event) => {
    event.preventDefault();
    if(input?.value == '' || input == null) return;

    const task: Task = {
        id: nanoid(5),
        title: input.value,
        completed: false
    }
    taskList.push(task);
    addListItem(task);
    saveTasksToLocalStorage(taskList);
    
}
form?.addEventListener('submit', submitTask)

function addListItem(task: Task){
    const taskElement = document.createElement('li') as HTMLLIElement;
    taskElement.innerHTML = task.title;

    const deleteButton = document.createElement('button') as HTMLButtonElement;
    deleteButton.addEventListener('click', ()=>{
        deleteButton.parentElement?.remove();
        removeTaskById(task, taskList);
    })

    deleteButton.innerHTML = 'Delete Task';
    
    const checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', ()=>{
        task.completed = !task.completed;
        saveTasksToLocalStorage(taskList);
    })
    taskElement.appendChild(checkbox);
    taskElement.appendChild(deleteButton);
    
    unorderedList?.appendChild(taskElement);
}

function removeTaskById(taskArg: Task, taskListRef: Task[]){
    taskListRef = taskListRef.filter((task) => task.id != taskArg.id)
    saveTasksToLocalStorage(taskListRef);
}
function saveTasksToLocalStorage(taskList: Task[]){
    localStorage.setItem('taskListLocalStorage', JSON.stringify(taskList));
}
function loadTasksFromLocalStorage(){
    const taskListStringForm: string | null = localStorage.getItem('taskListLocalStorage')
    if(taskListStringForm != null) taskList = JSON.parse(taskListStringForm) as Task[];
    taskList.forEach((task: Task) => addListItem(task))
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}
    