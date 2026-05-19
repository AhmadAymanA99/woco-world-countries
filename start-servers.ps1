$env:BROWSER='none'
$env:NODE_OPTIONS='--max-old-space-size=4096'

$logDir = "$env:TEMP\woco-logs"
New-Item -ItemType Directory -Path $logDir -Force | Out-Null

$frontendLog = "$logDir\frontend.log"
$backendLog = "$logDir\backend.log"

# Start backend
$backend = Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "D:\new\woco" -RedirectStandardOutput $backendLog -RedirectStandardError $backendLog -PassThru

Start-Sleep -Seconds 3

# Start frontend
$frontend = Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "react-scripts start" -WorkingDirectory "D:\new\woco\client" -RedirectStandardOutput $frontendLog -RedirectStandardError $frontendLog -PassThru

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host "Logs: $logDir"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"
