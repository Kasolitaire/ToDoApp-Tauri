// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn create_export_file(directory: String, stringify_data: String){
    let mut path = PathBuf::new();
    path.push(directory);
    print!("{}", path.exists());

    //let mut file = File::create(path).expect("file not created");
    //file.write_all(stringify_data.as_bytes()).expect("failed to write to file");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_export_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
