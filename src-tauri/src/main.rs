// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs::File;
use std::io::prelude::*;
use log::debug;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn create_export_file(directory: String, stringify_data: String){
    let mut file = File::create(directory + r"\ToDoApp-Import.txt").expect("file not created");
    file.write_all(stringify_data.as_bytes()).expect("failed to write to file");
}

#[tauri::command]
fn read_export_file(file_path: String) -> String{
    let mut file = File::open(file_path).expect("could not find file");
    let mut stringify_data = String::new();
    file.read_to_string(&mut stringify_data).expect("failed to read file");
    return stringify_data;
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().build())
        .invoke_handler(tauri::generate_handler![create_export_file, read_export_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
