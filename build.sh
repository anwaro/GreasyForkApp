nx run "$1:build:production"
eslint --fix "./scripts/$1/main.js"
prettier --write  "./scripts/$1/main.js"
