# letter-boxed-solver

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

9. ``npm run build`` for dev mode
