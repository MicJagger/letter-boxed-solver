import './App.css';
import box from './content/box.png';
import { MouseEvent } from 'react'
import wasm from './wasm';

function wasmTest(): bigint {
  const a = BigInt(5);
  const b = BigInt(8);
  return wasm.add(a, b);
}

function App() {
    const handleClearButton = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("clear");
    }

    const handleSolveButton = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("solve");
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
                        <input type="text" id="letterInput0" className="letterBox" maxLength={1} />
                        <input type="text" id="letterInput1" className="letterBox" maxLength={1} />
                        <input type="text" id="letterInput2" className="letterBox" maxLength={1} />
                    </div>

                    <div id="horizontalGrouping" className="horizontalGrouping">
                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput3" className="letterBox" maxLength={1} />
                            <input type="text" id="letterInput4" className="letterBox" maxLength={1} />
                            <input type="text" id="letterInput5" className="letterBox" maxLength={1} />
                        </div>

                        <div id="box" className="box">
                            <img src={box} className="box" alt="sample box" />
                        </div>

                        <div id="letterBoxesY" className="letterBoxesY">
                            <input type="text" id="letterInput6" className="letterBox" maxLength={1} />
                            <input type="text" id="letterInput7" className="letterBox" maxLength={1} />
                            <input type="text" id="letterInput8" className="letterBox" maxLength={1} />
                        </div>
                    </div>

                    <div id="letterBoxesX" className="letterBoxesX">
                        <input type="text" id="letterInput9" className="letterBox" maxLength={1} />
                        <input type="text" id="letterInput10" className="letterBox" maxLength={1} />
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