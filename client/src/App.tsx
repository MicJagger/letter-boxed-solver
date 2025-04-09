import './App.css'
import box from './content/box.png'
import { MouseEvent } from 'react'
import wasm from './wasm'

function App() {

    const nextBox = (event: React.FormEvent<HTMLInputElement>, thisLocation: number) => {
        const next = document.getElementById("letterInput" + (thisLocation + 1).toString());
        next?.focus();
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
        clearResults();
        var letters: string = "";
        for (let i = 0; i < 12; i++) {
            const box = document.getElementById("letterInput" + i.toString()) as HTMLInputElement;
            let letter = box!.value.toLowerCase();
            if (letter.charCodeAt(0) < 97 || letter.charCodeAt(0) > 122 || letter === "") {
                printOut("Invalid Character");
                return;
            }
            for (let j = 0; j < letters.length; j++) {
                if (letter === letters.charAt(j)) {
                    printOut("Duplicate Letters");
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
            printOut("Word Count Required");
            return;
        }

        // solve
        fetch("wordlist.txt") // fetches local wordlist.txt inside ../public/ and passes text into wasm
            .then((response) => response.text())
            .then((text) => {
                const results: string = wasm.solve(text, letters + wordCount);
                var current: string = "";
                console.log("results computed");
                // print results
                if (results === "") {
                    printOut("No Solutions Found!");
                }
                for (let i = 0; i < results.length; i++) {
                    if (results[i] === "\n") {
                        printOut(current);
                        current = "";
                    }
                    else {
                        current = current.concat(results[i]);
                    }
                }
            })
            .catch((error) => console.error(error));
    }

    const clearResults = () => {
        const results = document.getElementById("results");
        results!.querySelectorAll("p").forEach(result => result.parentNode?.removeChild(result));
    }

    const printOut = (text: string) => {
        const results = document.getElementById("results");
        const newResult = document.createElement("p");
        newResult.textContent = text;
        results?.appendChild(newResult);
    }

    return (
        <div className="main">

            <section id="title" className="title">
                <header>Letter Boxed Solver</header>
                <p className="centered">A New York Times Game</p>
            </section>

            <section id="inputs" className="inputs">
                <section id="letterbox" className="letterbox">
                    <div id="letterBoxesX" className="letterBoxesX">
                        <input type="text" id="letterInput0" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 0)} />
                        <input type="text" id="letterInput1" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 1)} />
                        <input type="text" id="letterInput2" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 2)} />
                    </div>

                    <div id="horizontalGrouping" className="horizontalGrouping">
                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput3" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 3)} />
                            <input type="text" id="letterInput4" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 4)} />
                            <input type="text" id="letterInput5" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 5)} />
                        </div>

                        <div id="box" className="box">
                            <img src={box} className="box" alt="sample box" />
                        </div>

                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput6" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 6)} />
                            <input type="text" id="letterInput7" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 7)} />
                            <input type="text" id="letterInput8" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 8)} />
                        </div>
                    </div>

                    <div id="letterBoxesX" className="letterBoxesX">
                        <input type="text" id="letterInput9" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 9)} />
                        <input type="text" id="letterInput10" className="letterBox" maxLength={1} onInput={(event) => nextBox(event, 10)} />
                        <input type="text" id="letterInput11" className="letterBox" maxLength={1} />
                    </div>
                </section>
                
                <section id="settings" className="settings">
                    <div className="tophalf">
                        <p className="horizontalGrouping centered">Word Count:</p>
                        <div id="numSelect" className="numSelect">
                            <div className="selection"><input type="radio" name="num" value="1" />1</div>
                            <div className="selection"><input type="radio" name="num" value="2" />2</div>
                            <div className="selection"><input type="radio" name="num" value="3" />3</div>
                            <div className="selection"><input type="radio" name="num" value="4" />4</div>
                            <div className="selection red"><input type="radio" name="num" value="5" />5</div>
                        </div>
                    </div>
                    <button id="clear" className="button" onClick={handleClearButton}>Clear</button>
                    <button id="enter" className="button" onClick={handleSolveButton}>Solve</button>

                    <section id="notes" className="notes">
                        <p>- This does not use the official dictionary, and will very likely have words that are not valid in the official game.</p>
                        <p>- It is not recommended to run the 5 words option, especially on old or low-end devices.</p>
                        <p>- It is uncommon to solve in 1 word.</p>
                        <p>- This is just for fun, don't spoil playing the game!</p>
                    </section>
                </section>
            </section>

            <section id="outputs" className="outputs">
                <p className="centered">Results:</p>
                <section id="results" className="results">

                </section>
            </section>

            <footer>
                <a href="https://github.com/MicJagger/letter-boxed-solver" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://michaeljagiello.micjagger.net/" target="_blank" rel="noopener noreferrer">Michael Jagiello</a>
                <a href="https://www.nytimes.com/puzzles/letter-boxed" target="_blank" rel="noopener noreferrer">Letter Boxed - The New York Times</a>
            </footer>

        </div>
    );
}

export default App;