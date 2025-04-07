#!/bin/bash

# Fail fast on error
set -e

echo "Installing client dependencies..."
cd client
npm install

echo "Building frontend..."
npm run deploy

# echo "Copying frontend build to server/public..."
# cp -r build ../server/public

echo "Installing server dependencies..."
cd ../server
npm install
