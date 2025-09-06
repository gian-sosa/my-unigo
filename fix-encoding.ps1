# Script para corregir la codificacion corrupta en los archivos de ciclo

$files = @(
    "src\pages\Ciclo4.jsx",
    "src\pages\Ciclo5.jsx",
    "src\pages\Ciclo6.jsx",
    "src\pages\Ciclo7.jsx",
    "src\pages\Ciclo8.jsx",
    "src\pages\Ciclo9.jsx",
    "src\pages\Ciclo10.jsx"
)

# Mapeo de caracteres corruptos a caracteres correctos
$charMap = @{
    'Ã¡' = 'á'
    'Ã©' = 'é'
    'Ã­' = 'í'
    'Ã³' = 'ó'
    'Ãº' = 'ú'
    'Ã±' = 'ñ'
    'Ã¿' = 'ÿ'
    'Ã ' = 'à'
    'Ã¨' = 'è'
    'Ã¬' = 'ì'
    'Ã²' = 'ò'
    'Ã¹' = 'ù'
    'Ã‚' = 'Â'
    'Ã‡' = 'Ç'
    'Ã' = 'Ñ'
}

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Corrigiendo codificacion en: $file"
        
        # Leer el contenido actual
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Aplicar todas las correcciones de caracteres
        foreach ($corrupt in $charMap.Keys) {
            $correct = $charMap[$corrupt]
            $content = $content -replace [regex]::Escape($corrupt), $correct
        }
        
        # Guardar con codificacion UTF8 correcta
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText((Resolve-Path $file), $content, $utf8NoBom)
        
        Write-Host "✓ $file corregido"
    } else {
        Write-Host "✗ $file no encontrado"
    }
}

Write-Host ""
Write-Host "Correccion de codificacion completada!"
