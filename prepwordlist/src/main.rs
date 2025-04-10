use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    // input file
    let mut input: File = File::open("./words.txt")?;
    let mut contents: String = String::new();
    input.read_to_string(&mut contents)?;
    // output file
    let mut output: File = File::create("../client/public/wordlist.txt")?;

    let chars: Vec<char> = contents.chars().collect();
    let mut current_word: String = "".to_string();
    let mut i: usize = 0;
    while i < contents.len() {
        if chars[i] == '\r' || chars[i] == '\n' {
            if current_word.len() > 2 {
                output.write((current_word + "\n").as_bytes()).expect("write error");
            }
            current_word = "".to_string();
        }
        else {
            let ascii_value: u8 = chars[i] as u8;
            if (ascii_value > 96) && (ascii_value < 123) && (chars[i] != chars[i + 1]) {
                current_word.push(chars[i]);
            }
            // if invalid characters or double letter, skip word
            else {
                for j in i..contents.len() {
                    if chars[j] == '\r' || chars[j] == '\n' {
                        break;
                    }
                    i += 1;
                }
                current_word = "".to_string();
            }
        }
        i += 1;
    } 

    Ok(())
}
