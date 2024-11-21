# App Start
1. `yarn`
2. `composer install`
3. `yarn dev`

- **inc** - custom functions (import this files in `functions.php`)
- **src** - assets and source files
    |
    - **fonts**
    - **img**
    - **scripts**
      |
      - **core**
        - `AppState.js` - file for importing all page and post templates
        - `Emitter.js` - https://refactoring.guru/design-patterns/observer
        - `Page.js` - base class for all pages
        - `utils.js` - small functions to use on all pages
      - **modules** - files for components (template parts)
      - **pages** - files for pages (template pages)
      - `app.js` - main JS file for importing libraries and initializing Barba
    - **styles**
      |
      - **scss**
        |
        - **base** - styles for tags and resetting browser default settings
        - **layout** - styles for custom grid + reusable components without reference to any section (_page-component)
        - **modules** - styles for sections and components
        - **utilities** - variables, functions, and mixins
        - `app.scss` - main SCSS file (only for importing other files)
- **views** - Blade templates
  |
  - **pages**
  - **partials**
  - **components**
  - **layouts**
