:: GENERATE THE JAVASCRIPT BUNDLE
for /R ".\kissjs\core" %%f in (*.js) do type "%%f" >> kissjs.js
for /R ".\kissjs\ui" %%f in (*.js) do type "%%f" >> kissjs.js

:: GENERATE THE CSS BUNDLE
type ".\kissjs\ui\styles\base.css" > kissjs.css
for /R ".\kissjs\ui\abstract" %%f in (*.css) do type "%%f" >> kissjs.css
for /R ".\kissjs\ui\containers" %%f in (*.css) do type "%%f" >> kissjs.css
for /R ".\kissjs\ui\elements" %%f in (*.css) do type "%%f" >> kissjs.css
for /R ".\kissjs\ui\mixed" %%f in (*.css) do type "%%f" >> kissjs.css

:: GENERATE THE APPLICATION SPECIFIC RESOURCES
for /R ".\views" %%f in (*.js) do type "%%f" >> views.js
for /R ".\views" %%f in (*.css) do type "%%f" >> views.css