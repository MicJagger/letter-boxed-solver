import init from 'letter-boxed-solver'
import wasmData from 'letter-boxed-solver/letter_boxed_solver_bg.wasm'
import * as wasm from 'letter-boxed-solver'

await init(wasmData);

export default wasm