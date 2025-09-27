@echo off
echo 🚀 Testing Netlify build process...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if exist out (
    echo ✅ Build successful! 'out' directory created.
    echo 📁 Build output:
    dir out
    
    echo.
    echo 🎉 Ready for Netlify deployment!
    echo.
    echo To deploy:
    echo 1. Push your code to Git repository
    echo 2. Connect repository to Netlify
    echo 3. Netlify will automatically build and deploy
    echo.
    echo Or manually drag and drop the 'out' folder to Netlify
) else (
    echo ❌ Build failed! 'out' directory not found.
    exit /b 1
)