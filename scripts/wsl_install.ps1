Write-Host "Copying .tgz files..."
$source = Get-Location
$destination = "\\wsl.localhost\debian\home\andor\.node-red"
Copy-Item -Path (Join-Path $source "*.tgz") -Destination $destination -Force -Verbose -ErrorAction Stop
Write-Host "Files copied."

Write-Host "Installing package..."
wsl bash -c "cd /home/andor/.node-red && npm i andor-automation-node-red-dashboard-2-widgets-ui-kioskboard-1.0.0.tgz"
Write-Host "Done."
