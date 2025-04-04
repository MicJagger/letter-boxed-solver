use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve(word_list: String, input: String) -> String {
    // inits
    let word_count = input.chars().nth(12).unwrap().to_digit(10);
    let letters = &input[..12];
    let mut results: String = "".to_string();

    // solve
    
    results.push(word_list.chars().nth(0).unwrap());
    results.push('\n');

    return results;
}