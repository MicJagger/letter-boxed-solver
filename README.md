# letter-boxed-solver

This is a Typescript / React website built to solve The New York Times game Letter Boxed.

It utilizes Rust in WebAssembly to run the algorithm locally on the client's machine.

It would have higher word counts than 4, but it is unsafe. If many words and combinations are possible, then this single tab can potentially use gigabytes of memory.

Still, with light optimizations and using compiled Rust, this can spit out thousands of solutions in milliseconds.

# Installation

Ensure you have Rust installed, as well as wasm-pack (``cargo install wasm-pack``).

Clone the repository

1. ``git clone LINK``
2. ``cd letter-boxed-solver``

Prepare the word list (optional, prepared list included)

3. ``cd prepwordlist``
4. ``cargo run``
5. ``cd ..``

Build the web assembly

6. ``cd client/src/wasm/letter-boxed-solver``
7. ``wasm-pack build --target web``
8. ``cd ../../..``

Launch the site

9. ``npm install``
10. ``npm run start`` for dev mode