:: DELETE EXISTING OUTPUT FILES
del /Q ".\app.js"

:: BUNDLE THE APPLICATION RESOURCES
for /R ".\utils" %%f in (*.js) do type "%%f" >> app.js
for /R ".\views" %%f in (*.js) do type "%%f" >> app.js
for /R ".\blocks" %%f in (*.js) do type "%%f" >> app.js