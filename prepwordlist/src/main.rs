use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    // input file
    let mut input = File::open("../english-words/words_alpha.txt")?;
    let mut contents = String::new();
    input.read_to_string(&mut contents)?;
    // output file
    let mut output = File::create("../client/public/wordlist.txt")?;

    //let mut chars = contents.chars();
    let chars: Vec<char> = contents.chars().collect();
    let mut current_word: String = "".to_string();
    let mut i = 0;
    while i < contents.len() {
        if chars[i] == '\r' || chars[i] == '\n' {
            if current_word.len() > 2 {
                output.write((current_word + "\n").as_bytes()).expect("write error");
            }
            current_word = "".to_string();
        }
        else {
            if chars[i] != chars[i + 1] {
                current_word.push(chars[i]);
            }
            // if double letter, skip word
            else {
                for j in i..contents.len() {
                    if chars[j] == '\r' {
                        break;
                    }
                    i += 1;
                }
                current_word = "".to_string();
            }
        }
        i += 1;
    } 
    //

    Ok(())
}
