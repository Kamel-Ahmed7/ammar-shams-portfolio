Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\Kamel\.gemini\antigravity\scratch\ammar_shams_portfolio\assets\images\projects"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$images = @(
    @{ Name = "atlas-lab-overview.jpg"; Title = "ATLAS LAB — OVERVIEW DASHBOARD"; Tag = "HR Analytics / Power BI"; Metrics = @("Total Employees: 1,470", "Attrition Rate: 16.1%", "Avg Tenure: 7.0 Yrs", "Department Breakdown") },
    @{ Name = "atlas-lab-demographics.jpg"; Title = "ATLAS LAB — DEMOGRAPHICS"; Tag = "HR Analytics / Power BI"; Metrics = @("Age Distribution", "Gender Diversity", "Education Fields", "Marital Status Analytics") },
    @{ Name = "atlas-lab-performance.jpg"; Title = "ATLAS LAB — PERFORMANCE TRACKER"; Tag = "HR Analytics / Power BI"; Metrics = @("Job Satisfaction vs Rating", "Work-Life Balance Score", "Environment Rating", "Manager Feedback") },
    @{ Name = "atlas-lab-attrition.jpg"; Title = "ATLAS LAB — ATTRITION ANALYSIS"; Tag = "HR Analytics / Power BI"; Metrics = @("Departed Employees: 237", "Salary Delta (Active vs Left)", "Distance from Home Signal", "Overtime vs Attrition") },
    @{ Name = "customer-churn-powerbi.jpg"; Title = "CUSTOMER CHURN DASHBOARD"; Tag = "Customer Analytics / Power BI"; Metrics = @("Total Customers: 6,687", "Churn Rate: 26.86%", "Contract Type Impact", "Service Calls Risk Signal") },
    @{ Name = "customer-churn-excel.jpg"; Title = "CUSTOMER CHURN DASHBOARD"; Tag = "Customer Analytics / Excel"; Metrics = @("Power Query Data Clean", "Pivot Table Slicers", "Customer Behavior Matrix", "Actionable Retention Strategy") },
    @{ Name = "superstore-sales.jpg"; Title = "SUPERSTORE SALES ANALYTICS"; Tag = "Sales Analytics / Excel"; Metrics = @("Sample Superstore 2019", "Profit Margin by Category", "Regional Sales Map", "Shipping Mode Breakdown") },
    @{ Name = "sales-dashboard.jpg"; Title = "SALES DASHBOARD"; Tag = "Sales Analytics / Visualization"; Metrics = @("Total Sales & Profit", "Sales Rep Matrix", "Year-over-Year Trend", "Category Breakdown") }
)

foreach ($item in $images) {
    $width = 1200
    $height = 800
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # Background
    $bgColor = [System.Drawing.ColorTranslator]::FromHtml("#ECEAE4")
    $g.Clear($bgColor)

    # Outer border & header area
    $darkPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#E2DDD5"), 2)
    $g.DrawRectangle($darkPen, 30, 30, $width - 60, $height - 60)

    # Banner Header
    $headerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#171717"))
    $g.FillRectangle($headerBrush, 30, 30, $width - 60, 90)

    # Fonts
    $fontTitle = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
    $fontTag = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Regular)
    $fontBody = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Regular)

    $textWhite = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F5F3EE"))
    $textOlive = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#607C6A"))
    $textDark = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#171717"))
    $textMuted = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#5F625D"))

    # Title & Tag Text
    $g.DrawString($item.Title, $fontTitle, $textWhite, 60, 50)
    $g.DrawString($item.Tag.ToUpper(), $fontTag, $textWhite, 60, 85)

    # Placeholder Notice Badge
    $badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#607C6A"))
    $g.FillRectangle($badgeBrush, 750, 55, 390, 40)
    $badgeFont = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("[ TEMPORARY DASHBOARD PLACEHOLDER ]", $badgeFont, $textWhite, 760, 68)

    # Dashboard Grid Layout Mockup
    # 3 Metric Cards
    for ($i = 0; $i -lt 3; $i++) {
        $cardX = 60 + ($i * 360)
        $cardY = 150
        $cardW = 330
        $cardH = 140
        $cardBg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F5F3EE"))
        $g.FillRectangle($cardBg, $cardX, $cardY, $cardW, $cardH)
        $g.DrawRectangle($darkPen, $cardX, $cardY, $cardW, $cardH)

        if ($i -lt $item.Metrics.Count) {
            $g.DrawString($item.Metrics[$i], $fontBody, $textDark, $cardX + 20, $cardY + 30)
        } else {
            $g.DrawString("KPI Analytics Metric", $fontBody, $textDark, $cardX + 20, $cardY + 30)
        }
        $g.DrawString("Verified Data Dimension", $fontSub, $textMuted, $cardX + 20, $cardY + 80)
    }

    # Visual Chart 1: Bar Chart (Left Side)
    $chart1Bg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F5F3EE"))
    $g.FillRectangle($chart1Bg, 60, 320, 520, 410)
    $g.DrawRectangle($darkPen, 60, 320, 520, 410)
    $g.DrawString("Analytical Trend Breakdown", $fontBody, $textDark, 80, 340)

    # Draw Bar Chart bars
    $barBrush1 = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#171717"))
    $barBrush2 = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#607C6A"))
    $heights = @(220, 160, 280, 190, 250, 310)
    for ($b = 0; $b -lt 6; $b++) {
        $bx = 100 + ($b * 70)
        $bh = $heights[$b]
        $by = 700 - $bh
        $brush = if ($b % 2 -eq 0) { $barBrush1 } else { $barBrush2 }
        $g.FillRectangle($brush, $bx, $by, 45, $bh)
        $g.DrawString("Q$($b+1)", $fontSub, $textMuted, $bx + 10, 705)
    }

    # Visual Chart 2: Line Chart & Insights (Right Side)
    $chart2Bg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F5F3EE"))
    $g.FillRectangle($chart2Bg, 610, 320, 530, 410)
    $g.DrawRectangle($darkPen, 610, 320, 530, 410)
    $g.DrawString("Insight Matrix & Trend Analysis", $fontBody, $textDark, 630, 340)

    # Line Chart points
    $linePen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#607C6A"), 4)
    $points = @(
        (New-Object System.Drawing.Point(650, 600)),
        (New-Object System.Drawing.Point(730, 520)),
        (New-Object System.Drawing.Point(810, 560)),
        (New-Object System.Drawing.Point(890, 430)),
        (New-Object System.Drawing.Point(970, 470)),
        (New-Object System.Drawing.Point(1080, 400))
    )
    $g.DrawLines($linePen, $points)

    foreach ($pt in $points) {
        $g.FillEllipse($barBrush1, $pt.X - 6, $pt.Y - 6, 12, 12)
    }

    # Text Notice at Bottom
    $g.DrawString("Placeholder graphic — replace file with real screenshot at: assets/images/projects/$($item.Name)", $fontSub, $textMuted, 630, 680)

    # Save JPEG
    $outputPath = Join-Path $outDir $item.Name
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $outputPath"
}
