#!/bin/bash

# Start the backend 
cd backend
npm start &

# Start the frontend
cd ../frontend
npm start
