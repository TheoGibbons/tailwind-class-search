const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Download and process CSS at build time
async function downloadAndProcessCSS() {

  try {
    // Download CSS file
    const cssContent = await downloadCss();

    // Process CSS into JSON
    const jsonOutput = processCSS(cssContent);

    // Save processed JSON to file
    const outputJSONFilePath = path.resolve(__dirname, '../../frontend/public/assets/tailwind.json');
    fs.writeFileSync(outputJSONFilePath, JSON.stringify(jsonOutput, null, 2));
    console.log('CSS processed and JSON generated at:', outputJSONFilePath);

  } catch (error) {
    console.error('Error downloading or processing CSS:', error);
  }
}

// CSS processing logic
function processCSS(cssContent) {
  const lines = cssContent.split('\n');
  const jsonOutput = {};
  let currentClass = null;

  lines.forEach(line => {

    const classNameMatch = line.match(/^\.([a-zA-Z0-9\-:.\\]+) \{/);
    if (classNameMatch) {

      currentClass = classNameMatch[1].replace(/\\/g, '');
      jsonOutput[currentClass] = [];

    } else if (!line.trim() || line.trim() === '}') {
      currentClass = null;
    } else if (currentClass) {
      const style = line.trim();
      jsonOutput[currentClass].push(style);
    }
  });

  return jsonOutput;
}

async function downloadCss() {

  const url = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.css';
  const urlMin = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css';

  const {data: cssContent} = await axios.get(url);

  // Save CSS to file
  const outputCSSFilePath = path.resolve(__dirname, '../../frontend/public/css/tailwind.css');
  fs.writeFileSync(outputCSSFilePath, cssContent);
  console.log('CSS cached:', outputCSSFilePath);


  const {data: cssMinContent} = await axios.get(urlMin);

  // Save MIN CSS to file
  const outputMinCSSFilePath = path.resolve(__dirname, '../../frontend/public/css/tailwind.min.css');
  fs.writeFileSync(outputMinCSSFilePath, cssMinContent);
  console.log('CSS cached:', outputMinCSSFilePath);

  return cssContent;

}

// Trigger the build process
downloadAndProcessCSS().then(() => console.log('Done!'));
