Write-Host "Stopping any running Next.js processes..."
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Cleaning up .next directory..."
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Starting development server..."
npm run dev
