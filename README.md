# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also do `ng serve --open` to open it right away in your default browser.

## Package managers

To download all denendencies you can use `npm install` or `yarn` commands (yarn package manader is preferable).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Usage of visualization tool

After loading the tool locally or visiting url: https://vladymyrkozyr.github.io/FishPlots/ you will have the main interface loaded.

Use top controls to select years and additional filtering.

To reload data press button `Get Data`.

Bottom part of screen contains tabstrip with amCharts visualizations. Please, refer to: https://www.amcharts.com/docs/ for information on how to interact with amCharts components.

For saving the state of current visualization filter parameters, please use `Copy to Clipboard` button. This will generate base64 string. Save it somewhere on you local machine. Next time when you need to access visualizations you can paste that base64 string into the field and press `Load Visualization`.
