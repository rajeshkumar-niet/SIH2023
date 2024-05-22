document.addEventListener("DOMContentLoaded", () => {
    const dataElements = document.querySelectorAll(".data-element");

    // Replace this with the actual path to your local CSV file
    const csvFilePath = "NumberPlate_on_2023-09-16.csv";

    let currentIndex = 0;
    let data = [];
    let isAnimating = false;

    // Function to fetch and parse the CSV data
    function fetchData() {
        fetch(csvFilePath)
            .then(response => response.text())
            .then(csvData => {
                data = csvData.split("\n").map(row => row.split(","));
                displayData();
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    // Function to display the data one by one
    function displayData() {
        if (!isAnimating) {
            isAnimating = true;

            const [vehicleNumber, date, time] = data[currentIndex];

            // Update all data elements simultaneously with a staggered animation
            dataElements.forEach((element, index) => {
                setTimeout(() => {
                    element.textContent = index === 0 ? `Vehicle Number: ${vehicleNumber}` : index === 1 ? `Date: ${date}` : `Time: ${time}`;
                    document.getElementById("data-container").classList.add("animating");
                }, index * 300); // Stagger the animations by 300 milliseconds
            });

            currentIndex = (currentIndex + 1) % data.length;

            // Reset the 'animating' class and allow the animation to replay
            setTimeout(() => {
                document.getElementById("data-container").classList.remove("animating");
                isAnimating = false;
                displayData(); // Display the next entry
            }, 3000); // Adjust the timeout to match your animation duration
        }
    }

    fetchData(); // Fetch and display data when the page loads
});
