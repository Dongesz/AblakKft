# Seed sample orders via the local API
# Usage: Open PowerShell in repo root and run: .\tools\seed-orders.ps1

$baseUrl = "http://127.0.0.1:5121/api/orders"
$apiKey = "72709624631"

# sample orders
$orders = @(
    @{ userId=2; productId=5; quantity=2; shipping_adress="Budapest, V. kerület"; status="New"; order_date=(Get-Date).AddMinutes(-120).ToString("o") },
    @{ userId=3; productId=2; quantity=1; shipping_adress="Pest megye, Szigetszentmiklós"; status="in_progress"; order_date=(Get-Date).AddMinutes(-90).ToString("o") },
    @{ userId=4; productId=7; quantity=4; shipping_adress="Fejér, Székesfehérvár"; status="ready"; order_date=(Get-Date).AddMinutes(-60).ToString("o") },
    @{ userId=5; productId=9; quantity=1; shipping_adress="Győr-Moson-Sopron, Győr"; status="delivered"; order_date=(Get-Date).AddMinutes(-30).ToString("o") },
    @{ userId=6; productId=3; quantity=3; shipping_adress="Veszprém, Veszprém"; status="New"; order_date=(Get-Date).AddMinutes(-15).ToString("o") }
)

$created = @()

foreach ($o in $orders) {
    $body = @{
        UserId = $o.userId
        ProductId = $o.productId
        Quantity = $o.quantity
        Shipping_adress = $o.shipping_adress
        Status = $o.status
        Order_date = $o.order_date
    } | ConvertTo-Json -Depth 3

    try {
        $resp = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -Headers @{"Content-Type"="application/json"; "X-API-KEY"=$apiKey}
        $created += $resp
        Write-Host "Created order id:" $resp.id
    } catch {
        Write-Error "Failed to create order: $_"
    }
}

# Update one order to different status using PUT to make variety
if ($created.Count -ge 1) {
    $first = $created[0]
    $updateBody = @{
        UserId = $first.userId
        ProductId = $first.productId
        Quantity = $first.quantity
        Shipping_adress = $first.shipping_adress
        Status = "kiszallitva"
        Order_date = $first.order_date
    } | ConvertTo-Json -Depth 3

    try {
        Invoke-RestMethod -Uri ("$baseUrl/" + $first.id) -Method Put -Body $updateBody -Headers @{"Content-Type"="application/json"; "X-API-KEY"=$apiKey}
        Write-Host "Updated first order to kiszallitva"
        # reflect in local created list
        $created[0].status = "kiszallitva"
    } catch {
        Write-Error "Failed to update order id $($first.id): $_"
    }
}

# Save outputs
$outJsonPath = "BackEnd/seeded-orders.json"
$outMdPath = "BackEnd/seeded-orders.md"

$created | ConvertTo-Json -Depth 5 | Out-File -FilePath $outJsonPath -Encoding utf8

$md = "# Seeded Orders`n`n"
foreach ($c in $created) {
    $md += "- Id: $($c.id) | UserId: $($c.userId) | ProductId: $($c.productId) | Quantity: $($c.quantity) | Status: $($c.status) | Shipping: $($c.shipping_adress) | Date: $($c.order_date)`n"
}

$md | Out-File -FilePath $outMdPath -Encoding utf8

Write-Host "Wrote $($created.Count) orders to $outJsonPath and $outMdPath"
