// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;
use log::debug;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn create_export_file(directory: String, stringify_data: String){
    let mut file = File::create(directory + r"\test.txt").expect("file not created");
    file.write_all(stringify_data.as_bytes()).expect("failed to write to file");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().build())
        .invoke_handler(tauri::generate_handler![create_export_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
