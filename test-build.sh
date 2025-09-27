#!/bin/bash

# Netlify Build Test Script
# This script tests the build process locally before deploying

echo "🚀 Testing Netlify build process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ -d "out" ]; then
    echo "✅ Build successful! 'out' directory created."
    echo "📁 Build output:"
    ls -la out/
    
    echo ""
    echo "🎉 Ready for Netlify deployment!"
    echo ""
    echo "To deploy:"
    echo "1. Push your code to Git repository"
    echo "2. Connect repository to Netlify"
    echo "3. Netlify will automatically build and deploy"
    echo ""
    echo "Or manually drag and drop the 'out' folder to Netlify"
else
    echo "❌ Build failed! 'out' directory not found."
    exit 1
fi