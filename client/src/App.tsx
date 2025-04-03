import './App.css';
import box from './content/box.png';
import { KeyboardEvent, MouseEvent } from 'react'
import wasm from './wasm';

function wasmTest(): bigint {
  const a = BigInt(5);
  const b = BigInt(8);
  return wasm.add(a, b);
}

function App() {

    const handleKey = (key: KeyboardEvent<HTMLInputElement>, destination: string) => {
        let letter = key.key.charCodeAt(0);
        // letter outside of bounds of [A-Za-z], not
        if (!((letter < 65 || (letter > 90 && letter < 97) || letter > 122) || key.key.length > 1)) {
            const next = document.getElementById("letterInput" + destination);
            next?.focus();
        }
    }

    const handleClearButton = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("clear button pressed");
        for (let i = 0; i < 12; i++) {
            const box = document.getElementById("letterInput" + i.toString()) as HTMLInputElement;
            box!.value = "";
        }
    }

    const handleSolveButton = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("solve button pressed");
        var letters: string = "";
        for (let i = 0; i < 12; i++) {
            const box = document.getElementById("letterInput" + i.toString()) as HTMLInputElement;
            let letter = box!.value.toLowerCase();
            if (letter.charCodeAt(0) < 97 || letter.charCodeAt(0) > 122 || letter === "") {
                invalidInput("invalid character");
                return;
            }
            for (let j = 0; j < letters.length; j++) {
                if (letter === letters.charAt(j)) {
                    invalidInput("duplicate letter");
                    return;
                }
            }
            letters = letters.concat(box!.value).toLowerCase();
        }
        const bubbles = document.getElementsByTagName("input");
        var wordCount: string = "";
        for (var i = 0; i < bubbles.length; i++) {
            if (bubbles[i].type === "radio" && bubbles[i].checked) {
                wordCount = bubbles[i].value;       
            }
        }
        if (wordCount === "") {
            invalidInput("word count required");
            return;
        }
        clearResults();
        // solve

        // examples
        printResult("solving with letters " + letters + " and word count of " + wordCount);
        printResult(wasmTest().toString());
    }

    const clearResults = () => {
        const results = document.getElementById("results");
        results!.querySelectorAll("p").forEach(result => result.parentNode?.removeChild(result));
    }

    const printResult = (text: string) => {
        const results = document.getElementById("results");
        const newResult = document.createElement("p");
        newResult.textContent = text;
        results?.appendChild(newResult);
    }

    const invalidInput = (reason: string) => {
        console.log("input invalid: " + reason);
    }

    return (
        <div className="main">

            <section id="title" className="title">
                <header>Letter Boxed Solver</header>
                <p className="centered">A New York Times Game</p>
            </section>

            <div className="spacer" />

            <section id="inputs" className="inputs">
                <section id="leftSide" className="leftSide">
                    <div id="letterBoxesX" className="letterBoxesX">
                        <input type="text" id="letterInput0" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "1")} />
                        <input type="text" id="letterInput1" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "2")} />
                        <input type="text" id="letterInput2" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "3")} />
                    </div>

                    <div id="horizontalGrouping" className="horizontalGrouping">
                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput3" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "4")} />
                            <input type="text" id="letterInput4" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "5")} />
                            <input type="text" id="letterInput5" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "6")} />
                        </div>

                        <div id="box" className="box">
                            <img src={box} className="box" alt="sample box" />
                        </div>

                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput6" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "7")} />
                            <input type="text" id="letterInput7" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "8")} />
                            <input type="text" id="letterInput8" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "9")} />
                        </div>
                    </div>

                    <div id="letterBoxesX" className="letterBoxesX">
                        <input type="text" id="letterInput9" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "10")} />
                        <input type="text" id="letterInput10" className="letterBox" maxLength={1} onKeyUp={(event) => handleKey(event, "11")} />
                        <input type="text" id="letterInput11" className="letterBox" maxLength={1} />
                    </div>
                </section>
                
                <div id="settings" className="settings">
                    <div className="tophalf">
                        <p className="horizontalGrouping centered">Word Count:</p>
                        <div id="numSelect" className="numSelect">
                            <div className="selection"><input type="radio" name="num" value="1" />1</div>
                            <div className="selection"><input type="radio" name="num" value="2" />2</div>
                            <div className="selection"><input type="radio" name="num" value="3" />3</div>
                            <div className="selection"><input type="radio" name="num" value="4" />4</div>
                        </div>
                    </div>
                    <button id="clear" className="button" onClick={handleClearButton}>Clear</button>
                    <button id="enter" className="button" onClick={handleSolveButton}>Solve</button>
                </div>
            </section>

            <section id="outputs" className="outputs">
                <p className="centered">Results:</p>
                <section id="results" className="results">

                </section>
            </section>

            <footer>
                <a href="https://michaeljagiello.micjagger.net/" target="_blank" rel="noopener noreferrer">Michael Jagiello</a>
                <a href="https://www.nytimes.com/puzzles/letter-boxed" target="_blank" rel="noopener noreferrer">Letter Boxed - The New York Times</a>
            </footer>

        </div>
    );
}

export default App;