use std::collections::BTreeMap;
use wasm_bindgen::prelude::*;

struct WordSet {
    words: BTreeMap<String, u32>
}

impl WordSet {
    fn new() -> WordSet {
        WordSet { words: Default::default() }
    }

    fn insert(&mut self, word: &str, bitset: u32) {
        self.words.insert(word.to_string(), bitset);
    }

    fn get_map(&mut self) -> &mut BTreeMap<String, u32> {
        &mut self.words
    }
}


fn generate_bitset(word: &str) -> u32 {
    let mut value: u32 = 0;
    let chars: Vec<char> = word.chars().collect();
    for i in 0..word.len() {
        let char_value: u8 = chars[i] as u8;
        value = value | (1 << (char_value - 97));
    }
    return value;
}

fn check_word(word: &str, letters: &str) -> bool {

    const TOP: i8 = 0;
    const LEFT: i8 = 1;
    const RIGHT: i8 = 2;
    const BOTTOM: i8 = 3;

    #[inline]
    fn check_side(char: char, side: &Vec<char>) -> bool {
        for i in 0..side.len() {
            if char == side[i] {
                return true;
            }
        }
        return false;
    }

    let chars: Vec<char> = word.chars().collect();
    let top: Vec<char> = (&letters[0..3]).chars().collect();
    let left: Vec<char> = (&letters[3..6]).chars().collect();
    let right: Vec<char> = (&letters[6..9]).chars().collect();
    let bottom: Vec<char> = (&letters[9..12]).chars().collect();
    let mut prev_side: i8;
    if check_side(chars[0], &top) {
        prev_side = TOP;
    }
    else if check_side(chars[0], &left) {
        prev_side = LEFT;
    }
    else if check_side(chars[0], &right) {
        prev_side = RIGHT;
    }
    else if check_side(chars[0], &bottom) {
        prev_side = BOTTOM;
    }
    else {
        return false;
    }

    for i in 1..word.len() {
        let mut possible = false;
        if prev_side != TOP {
            if check_side(chars[i], &top) {
                prev_side = TOP;
                possible = true;
            }
        }
        if !possible && (prev_side != LEFT) {
            if check_side(chars[i], &left) {
                prev_side = LEFT;
                possible = true;
            }
        }
        if !possible && (prev_side != RIGHT) {
            if check_side(chars[i], &right) {
                prev_side = RIGHT;
                possible = true;
            }
        }
        if !possible && (prev_side != BOTTOM) {
            if check_side(chars[i], &bottom) {
                prev_side = BOTTOM;
                possible = true;
            }
        }
        
        if possible == false {
            return false;
        }
    }
    return true;
}


#[wasm_bindgen]
pub fn solve(word_list: String, input: String) -> String {
    // inits
    let word_count = input.chars().nth(12).unwrap().to_digit(10).unwrap();
    let letters = &input[0..12];
    let mut words: Vec<WordSet> = vec![];
    let mut results: String = "".to_string();
    for _i in 0..26 {
        words.push(WordSet::new());
    }

    // gather possible words
    let chars: Vec<char> = word_list.chars().collect();
    let mut current_word: String = "".to_string();
    let mut i = 0;
    while i < word_list.len() {
        if chars[i] == '\n' {
            if check_word(&current_word, letters) == true {
                let start_letter_index = ((current_word.chars().nth(0).unwrap() as u8) - 97) as usize;
                let index_map = words.iter_mut().nth(start_letter_index).unwrap();
                index_map.insert(&current_word, generate_bitset(&current_word));
            }
            current_word = "".to_string();
        }
        else {
            current_word.push(chars[i]);
        }
        i += 1;
    }

    // solve

    let start_letter_index = (("s".chars().nth(0).unwrap() as u8) - 97) as usize;
    let map = words.iter_mut().nth(start_letter_index).unwrap();
    for (word, bitset) in map.get_map().into_iter() {
        results += &word;
        //results += " ";
        //results += &format!("{:x}", bitset).to_string();
        results += "\n";
    }

    return results;
}