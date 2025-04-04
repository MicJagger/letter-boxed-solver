# letter-boxed-solver

Clone the repository

1. ``git clone LINK --recursive``

Prepare the word list

2. ``cd prepwordlist``
3. ``cargo run``
4. ``cd ..``

Build the web assembly

5. ``cd client/src/wasm/letter-boxed-solver``
6. ``wasm-pack build --target web``
7. ``cd ../../..``

Launch the site

8. ``npm run build`` for dev mode
