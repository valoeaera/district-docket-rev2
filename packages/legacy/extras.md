## Installing PHP & PHP Development Server

1. Install VS Code.
1. Install XAMPP with default settings.
1. Add PHP and PHP Server extensions in VS Code.
1. Open VS Code `settings.json` by doing `CTRL + SHIFT + P`, typing `settings.json` and selecting the option with `User settings`.
1. Add `"php.executablePath": "C:\\xampp\\php\\php.exe",` and `"phpserver.phpPath": "C:\\xampp\\php\\php.exe",` to that object.
1. Open PS Terminal with `CTRL + ~`.
1. Add PHP to your path with `$Env:Path += [IO.Path]::PathSeparator + C:\xampp\php\` in PS.
1. You can confirm this worked by executing `$env:path` in PS and checking for `C:\xampp\php` at the end.
1. You can confirm PHP is installed correctly by doing `php -v` in your Terminal.
1. Finally, you can open up the command palette again with `CTRL + SHIFT + P` and search for and run `PHP Server: Serve Project`.
1. Your directory will be hosted at `http://localhost:3000`.

## Set up Backend (WIP)

1. `npm install`
1. `node js/backend/connection.js`

**DOCUMENT IS A WORK IN PROGRESS AND WILL BE UPDATED AS DEVELOPMENT CONTINUES**

1. Summary

2. Frontend Documentation

   1. Core Functions

      1. Calendar View

         1. Day View

         2. Week View

         3. Month View

      2. Input Form

   2. Supplementary Features

      1. Dark Mode Toggle

      2. Something Else

3. Backend Documentation

   1. Database Structure

   2. PHP Sessions & Handling User Login
