#!/bin/bash

# Blockchain Attendance System - Quick Start Script
# This script automates the setup and deployment process

echo "🚀 Starting Blockchain Attendance System Setup..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "📝 Checking for running Ganache instance..."

# Check if Ganache is already running on port 8545
if lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Ganache is already running on port 8545"
else
    echo "⚠️  Ganache is not running!"
    echo ""
    echo "Please start Ganache in a separate terminal:"
    echo "  npx ganache --port 8545"
    echo ""
    read -p "Press Enter once Ganache is running..."
fi

echo ""
echo "🔨 Compiling smart contracts..."
npx truffle compile
if [ $? -ne 0 ]; then
    echo "❌ Compilation failed"
    exit 1
fi

echo ""
echo "🚀 Deploying contracts to local blockchain..."
npx truffle migrate --network development --reset
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure MetaMask:"
echo "   - Network: http://127.0.0.1:8545"
echo "   - Chain ID: 1337"
echo "2. Import test accounts from Ganache output above"
echo "3. Start the frontend:"
echo "   npm start"
echo ""
echo "📚 See README.md for detailed instructions"
