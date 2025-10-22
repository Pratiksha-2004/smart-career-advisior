<#
dev_start.ps1 - Start backend & frontend dev servers in new PowerShell windows.

Usage:
  Right-click and "Run with PowerShell" or execute from PowerShell:
    .\dev_start.ps1

Behavior:
  - Loads variables from .env.local if present (simple KEY=VALUE lines).
  - Falls back to safe defaults for CLIENT_ID(s) but will NOT write your client secret.
  - Opens two new PowerShell windows: one runs Django, the other runs the frontend Vite server.

Security:
  - Do not commit .env.local if it contains secrets. Use .env.local.example as a template.
#>
param(
    [string]$RepoRoot = $PSScriptRoot,
    [string]$BackendRelative = "backend",
    [string]$FrontendRelative = "frontend",
    [string]$Host = "localhost",
    [int]$BackendPort = 8000,
    [int]$FrontendPort = 5173
)

$BackendPath = Join-Path $RepoRoot $BackendRelative
$FrontendPath = Join-Path $RepoRoot $FrontendRelative

Write-Host "RepoRoot: $RepoRoot"
Write-Host "BackendPath: $BackendPath"
Write-Host "FrontendPath: $FrontendPath"

# Load .env.local if present (simple KEY=VALUE lines, ignore comments)
$envFile = Join-Path $RepoRoot '.env.local'
if (Test-Path $envFile) {
    Write-Host "Loading environment variables from $envFile"
    Get-Content $envFile | ForEach-Object {
        if ($_ -and -not $_.TrimStart().StartsWith('#')) {
            $parts = $_ -split '=',2
            if ($parts.Length -eq 2) {
                $k = $parts[0].Trim()
                $v = $parts[1].Trim()
                # remove surrounding single/double/backtick quotes if present
                    $v = $v.Trim("'`\"")
                Write-Host "Setting env $k"
                Set-Item -Path env:\$k -Value $v
            }
        }
    }
} else {
    Write-Host ".env.local not found; using existing environment or safe defaults (no secrets will be set)."
    if (-not $env:GOOGLE_OAUTH_CLIENT_IDS) {
        $env:GOOGLE_OAUTH_CLIENT_IDS = '685262148501-h55a5e9duhcik89glf3hch1ijkkgg052.apps.googleusercontent.com'
    }
    if (-not $env:GOOGLE_OAUTH_CLIENT_ID) {
        $env:GOOGLE_OAUTH_CLIENT_ID = $env:GOOGLE_OAUTH_CLIENT_IDS
    }
}

Write-Host "GOOGLE_OAUTH_CLIENT_ID = $env:GOOGLE_OAUTH_CLIENT_ID"
Write-Host "GOOGLE_OAUTH_CLIENT_IDS = $env:GOOGLE_OAUTH_CLIENT_IDS"

# Start backend in a new PowerShell window
$backendCmd = "cd `"$BackendPath`"; python manage.py runserver $BackendPort"
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", $backendCmd

# Start frontend in a new PowerShell window
$frontendCmd = "cd `"$FrontendPath`"; if (Test-Path package.json) { npm install --no-audit --no-fund } else { Write-Host 'package.json not found in $FrontendPath' }; npm run dev -- --port $FrontendPort"
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", $frontendCmd

Write-Host "Started backend (http://${Host}:${BackendPort}) and frontend (http://${Host}:${FrontendPort}) in new windows."
