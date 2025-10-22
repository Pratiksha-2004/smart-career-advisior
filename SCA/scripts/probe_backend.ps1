# probes backend endpoints and prints status + short response snippet
$urls = @(
    'http://localhost:8000/',
    'http://localhost:8000/auth/google/',
    'http://localhost:8000/auth/users/me/'
)

foreach ($u in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        Write-Output "URL: $u"
        Write-Output "Status: $($r.StatusCode)"
        $len = 0
        if ($r.Content) { $len = $r.Content.Length }
        Write-Output "Len: $len"
        if ($len -gt 0) {
            $snippet = $r.Content.Substring(0,[Math]::Min(800,$len))
            Write-Output "Snippet:"
            Write-Output $snippet
        }
    } catch {
        Write-Output "URL: $u ERROR: $($_.Exception.Message)"
    }
    Start-Sleep -Milliseconds 200
}
