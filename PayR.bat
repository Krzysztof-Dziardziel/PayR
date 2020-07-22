@ECHO OFF
DEL Instalacja.bat
ECHO Parsowanie wyciagu...
node pdf2html.js
ECHO.
ECHO Zakonczono parsowanie...
ECHO.
node mileniumParse.js > Przelewy.txt
ECHO Zakonczono prace programu. Dane zapisano do plikow.
return 0