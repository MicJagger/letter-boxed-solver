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

    fn get_map(&self) -> &BTreeMap<String, u32> {
        &self.words
    }

    /*fn get_mut_map(&mut self) -> &mut BTreeMap<String, u32> {
        &mut self.words
    }*/
}

// returns any &str as a bitset of 1s to represent which letters are used >= 1 
fn generate_bitset(word: &str) -> u32 {
    let mut value: u32 = 0;
    let chars: Vec<char> = word.chars().collect();
    for i in 0..word.len() {
        let char_value: u8 = chars[i] as u8;
        value = value | (1 << (char_value - 97));
    }
    return value;
}

// returns if the word is valid within the ordered letters
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

fn test_combinations(words: &Vec<WordSet>, word_stack: &Vec<&String>, letter_index: usize, word_count: u32, target_bitset: u32, input_bitset: u32) -> String {
    let mut results: String = "".to_string();
    if word_count == 1 {
        let map = words.iter().nth(letter_index).unwrap();
        for (word, bitset) in map.get_map().into_iter() {
            if (*bitset | input_bitset) == target_bitset {
                for j in 0..word_stack.len() {
                    results += &word_stack[j];
                    results += " - ";
                }
                results += word;
                results += "\n";
            }
        }
    }
    else { // word_count > 1
        let map = words.iter().nth(letter_index).unwrap();
        for (word, bitset) in map.get_map().into_iter() {
            if (*bitset | input_bitset) != target_bitset {
                let mut temp_word_stack = word_stack.clone();
                temp_word_stack.push(word);
                let last_letter = word.chars().last().unwrap() as u8 - 97;
                results += &test_combinations(words, &temp_word_stack, last_letter as usize, word_count - 1, target_bitset, *bitset | input_bitset);
            }
        }
    }
    return results;
}


#[wasm_bindgen]
pub fn solve(word_list: String, input: String) -> String {
    // initialize variables
    let letters = &input[0..12];
    let mut words: Vec<WordSet> = vec![];
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
    let word_count = input.chars().nth(12).unwrap().to_digit(10).unwrap();
    let target_bitset = generate_bitset(letters);
    let mut results: String = "".to_string();
    let letters_chars: Vec<char> = letters.chars().collect();
    for i in 0..letters.len() {
        let letter_index = (letters_chars[i] as u8) - 97;
        results += &test_combinations(&words, &vec![], letter_index as usize, word_count, target_bitset, 0);
    }

    return results;
}
