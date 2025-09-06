# Script para corregir los textos de navegacion

$files = @(
    "src\pages\Ciclo1.jsx",
    "src\pages\Ciclo2.jsx",
    "src\pages\Ciclo3.jsx",
    "src\pages\Ciclo4.jsx",
    "src\pages\Ciclo5.jsx",
    "src\pages\Ciclo6.jsx",
    "src\pages\Ciclo7.jsx",
    "src\pages\Ciclo8.jsx",
    "src\pages\Ciclo9.jsx",
    "src\pages\Ciclo10.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Corrigiendo: $file"
        
        # Leer el contenido del archivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Corregir los textos
        $content = $content -replace '← Regresar al inicio', '← Regresar al Inicio'
        $content = $content -replace '← Regresar a cursos', '← Regresar a Cursos'
        
        # Guardar con codificacion UTF8 sin BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText((Resolve-Path $file), $content, $utf8NoBom)
        
        Write-Host "✓ $file corregido"
    } else {
        Write-Host "✗ $file no encontrado"
    }
}

Write-Host ""
Write-Host "Correccion de textos completada!"
