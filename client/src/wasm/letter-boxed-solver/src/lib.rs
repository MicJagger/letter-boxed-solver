use wasm_bindgen::prelude::*;

use wasm_bindgen_file_reader::WebSysFile;
use std::io::Read;
use std::io::Seek;
use std::io::SeekFrom;

#[wasm_bindgen]
pub fn solve(word_list: String, input: String) -> String {
    // inits
    let _word_count = input.chars().nth(12).unwrap().to_digit(10);
    let _letters = &input[..12];
    let mut results: String = "".to_string();

    // solve
    
    results.push(word_list.chars().nth(0).unwrap());
    results.push('\n');

    return results;
}