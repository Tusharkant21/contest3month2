// Fetch data from the API using .then
function fetchDataWithThen() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  )
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
      handleSearch(data);
      handleSort(data);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

// Fetch data from the API using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
    handleSearch(data);
    handleSort(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// Render the data in the table
function renderTable(data) {
  const tableBody = document.getElementById("dataBody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
       <td><img src="${item.image}" alt="${item.name}" width="30"></td>
      <td>${item.name}</td>
      <td>${item.id}</td>
   
      <td>${item.symbol}</td>
      <td>${item.current_price}</td>
      <td>${item.total_volume}</td>
      <td>${item.market_cap}</td>
      <td>${item.market_cap_change_percentage_24h}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Handle search functionality
function handleSearch(data) {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.symbol.toLowerCase().includes(searchTerm)
      );
    });
    renderTable(filteredData);
  });
}

// Handle sort functionality
function handleSort(data) {
  const sortMarketCapButton = document.getElementById("sortMarketCapButton");
  const sortPercentageButton = document.getElementById("sortPercentageButton");

  sortMarketCapButton.addEventListener("click", () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
  });

  sortPercentageButton.addEventListener("click", () => {
    const sortedData = [...data];
    sortedData.sort(
      (a, b) =>
        b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h
    );
    renderTable(sortedData);
  });
}

// Main function
function main() {
  fetchDataWithThen(); // Use either fetchDataWithThen() or fetchDataWithAsyncAwait() based on your preference
}

// Run the main function
main();
