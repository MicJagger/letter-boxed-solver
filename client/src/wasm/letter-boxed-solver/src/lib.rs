use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i64, b:i64) -> i64 {
    return a + b;
}
