import { open } from "@tauri-apps/api/dialog";
import { invoke } from '@tauri-apps/api/tauri';
import { Task } from './task';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "./localStorageOperations";

export const createExportFile = async (taskList: Task[]) => {
    const stringifyData = JSON.stringify(taskList)
    const directory = await selectDirectory().catch(() => console.log('could not select directory'));
    if(typeof directory === 'string') sendExportDataToRust(directory, stringifyData);
    else{
        console.log('directory not found')
    }
}

export const sendExportDataToRust = (directory: string, stringifyData: string) => {
    invoke('create_export_file', {directory: directory, stringifyData: stringifyData});
}

export const selectDirectory = async () => {
    try {
        const selectedDirectory = await open({
            directory: true,
            multiple: false,
            title: 'Select Directory'
        });
        return selectedDirectory;
    } 
    catch (error) {
        console.log(error)
    }
}

export const selectFilePath = async () => {
    try {
        const selectedFilePath = await open({
            directory: false,
            multiple: false,
            title: 'Select File Path'
        })
        return selectedFilePath
    } 
    catch (error) {
        console.log(error)
    }
}
export const readExportedFile = async () => {
    const selectedFilePath = await selectFilePath()
    await invoke('read_export_file', {filePath: selectedFilePath}).then((data: unknown) => saveTasksToLocalStorage(data as string));
}