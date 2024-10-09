function calculateSearchScore(row, searchString) {
  const className = row.cells[0].textContent.toLowerCase();
  const cssProperties = row.cells[1].textContent.toLowerCase().trim();
  const cssPropertiesSplit = cssProperties.split(';').filter(l => l);

  if (className === searchString) {
    return 100;
  }

  if (cssProperties === searchString) {
    return 100;
  }

  if (cssPropertiesSplit.includes(searchString.replace(/;/g, ''))) {
    return 99;
  }

  // Split the search string into parts then return the number of parts that match as a percentage of 98
  const searchParts = searchString.split(/[ _-]/);
  const matches = searchParts.filter(part => className.includes(part) || cssProperties.includes(part));
  if (matches.length > 0) {
    return 98 * (matches.length / searchParts.length);
  }

  if (className.startsWith(searchString)) {
    return 50;
  }

  return 0;
}

function addRowSearchScore(row, searchString) {
  // Add the search score to the row using dataset
  row.dataset.searchScore = calculateSearchScore(row, searchString);
}

// Function to filter the results based on search input
function filterResults() {
  const searchString = document.getElementById('search').value.toLowerCase();
  const rows = document.querySelectorAll('#resultsTable tbody tr');

  // Loop through all rows and filter based on class name or CSS properties
  rows.forEach(row => addRowSearchScore(row, searchString));

  // Empty the table
  const tableBody = document.querySelector('#resultsTable tbody');
  tableBody.innerHTML = '';

  // Sort the rows based on search score
  const sortedRows = Array.from(rows).sort((a, b) => Number(b.dataset.searchScore) - Number(a.dataset.searchScore));

  // If any row has a search score === 0, hide it
  sortedRows.forEach(row => row.style.display = Number(row.dataset.searchScore) === 0 ? 'none' : '');

  // Append the sorted rows to the table
  sortedRows.forEach(row => tableBody.appendChild(row));
}


// document.addEventListener('DOMContentLoaded', function () {
//   fetch('js/tailwind.json.js')
//     .then(response => response.json())
//     .then(TailwindCSSJSON => {

      const tableBody = document.querySelector('#resultsTable tbody');
      Object.keys(TailwindCSSJSON).forEach(key => {
        const row = document.createElement('tr');
        const classCell = document.createElement('td');
        classCell.textContent = key;
        classCell.classList.add('border', 'p-2');

        const cssCell = document.createElement('td');
        TailwindCSSJSON[key].forEach((value, index) => {
          const span = document.createElement('span');
          span.textContent = value;
          cssCell.appendChild(span);

          // Add a <br> tag if there are more values to append
          if (index < TailwindCSSJSON[key].length - 1) {
            cssCell.appendChild(document.createElement('br'));
          }
        });
        cssCell.classList.add('border', 'p-2');

        row.appendChild(classCell);
        row.appendChild(cssCell);
        tableBody.appendChild(row);
      });

//     })
// })