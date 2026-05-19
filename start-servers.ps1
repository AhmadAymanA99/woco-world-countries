$env:BROWSER='none'
$env:NODE_OPTIONS='--max-old-space-size=4096'

$logDir = "$env:TEMP\woco-logs"
New-Item -ItemType Directory -Path $logDir -Force | Out-Null

$backendLog = "$logDir\backend.log"
$frontendLog = "$logDir\frontend.log"

# Start backend
$backend = Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c", "node server.js > `"$backendLog`" 2>&1" -WorkingDirectory "D:\new\woco" -PassThru

Start-Sleep -Seconds 5

# Start frontend
$frontend = Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c", "npx react-scripts start > `"$frontendLog`" 2>&1" -WorkingDirectory "D:\new\woco\client" -PassThru

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host "Logs: $logDir"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"
