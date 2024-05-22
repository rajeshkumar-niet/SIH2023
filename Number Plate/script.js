// script.js
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("data-table");

    // Replace 'data.csv' with the path to your CSV file
    fetch("NumberPlate_on_2023-09-16.csv")
        .then((response) => response.text())
        .then((data) => {
            const rows = data.split("\n");

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].split(",");
                const row = table.insertRow();

                for (let j = 0; j < cells.length; j++) {
                    const cell = row.insertCell();
                    cell.textContent = cells[j];
                }
            }
        })
        .catch((error) => console.error("Error:", error));
});
