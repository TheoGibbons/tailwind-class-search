// Function to filter the results based on search input
function filterResults() {
  const search = document.getElementById('search').value.toLowerCase();
  const rows = document.querySelectorAll('#resultsTable tbody tr');

  // Loop through all rows and filter based on class name or CSS properties
  rows.forEach(row => {
    const className = row.cells[0].textContent.toLowerCase();
    const cssProperties = row.cells[1].textContent.toLowerCase();

    // Check if search term is found in the class name or CSS properties
    if (className.includes(search) || cssProperties.includes(search)) {
      row.style.display = '';  // Show the row if it matches the search
    } else {
      row.style.display = 'none';  // Hide the row if it doesn't match
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/tailwind.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#resultsTable tbody');
      Object.keys(data).forEach(key => {
        const row = document.createElement('tr');
        const classCell = document.createElement('td');
        classCell.textContent = key;
        classCell.classList.add('border', 'p-2');

        const cssCell = document.createElement('td');
        data[key].forEach((value, index) => {
          const span = document.createElement('span');
          span.textContent = value;
          cssCell.appendChild(span);

          // Add a <br> tag if there are more values to append
          if (index < data[key].length - 1) {
            cssCell.appendChild(document.createElement('br'));
          }
        });
        cssCell.classList.add('border', 'p-2');

        row.appendChild(classCell);
        row.appendChild(cssCell);
        tableBody.appendChild(row);
      });
    })
})