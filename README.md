# Tailwind CSS Class Search

This is a small web application that downloads a Tailwind CSS file, processes it into a JSON format, and displays the results in a searchable table. Users can search for both class names and CSS properties to easily find the relevant Tailwind utility classes.

## Features
- **Tailwind CSS Processing**: Downloads and processes a Tailwind CSS file from a URL at build time.
- **Searchable Table**: Frontend UI allows for filtering and searching through class names and associated CSS properties.

## Project Structure

```
tailwind-class-search
│
├── backend/                  
│   ├── build/
│   │   └── generateJSON.js    # Script to download and process CSS at build time
│   └── server.js              # Express server to serve JSON and frontend
│
├── frontend/
│   ├── public/
│   │   └── assets
│   │      └── tailwind.json   # Processed JSON output (generated at build)
│   │   └── index.html         # Frontend HTML served by Express
│   ├── css/                   # Tailwind CSS styles it display index.html
│   ├── js/                    # JS scripts for filtering logic
│   │   └── filter.js          # Search filtering logic
│   └── index.html             # Frontend HTML served by Express
│
├── .gitignore                 # Ignore node_modules, built files, etc.
├── README.md                  # Documentation
└── package.json               # Node.js dependencies and build script
```

## Requirements
- **Node.js** (v14+ recommended)
- **Internet connection** to download the Tailwind CSS file

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tailwind-css-processor.git
   ```

2. Navigate into the project directory:
   ```bash
   cd tailwind-css-processor
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Build Process

The build process downloads the Tailwind CSS file, processes it into a JSON format, and saves it in `backend/tailwind.json`.

1. Run the build script:
   ```bash
   npm run build
   ```

2. This will download the CSS file from:
   ```
   https://shuffle.dev/vendor/tailwind/2.0.0-plugins/tailwind.css
   ```
   and process it into a JSON file.

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`. The application will display a table of Tailwind CSS classes and their corresponding CSS properties. You can search for class names or CSS properties using the input field.

## Customizing

### Changing the CSS URL

To change the CSS URL being processed, modify the URL in `backend/build/generateJSON.js`:

```javascript
const url = 'https://shuffle.dev/vendor/tailwind/2.0.0-plugins/tailwind.css';
```

You can replace this URL with any other CSS file you want to process.

## License
This project is licensed under the MIT License.
