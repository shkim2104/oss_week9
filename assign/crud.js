const API_URL = "https://6ae7413156b2ee1e54403e32.mockapi.io/restaurants";
const tbody = document.querySelector("#list");
const statusMsg = document.querySelector("#status");
let restaurants = []; 

async function loadRestaurants() {
  statusMsg.textContent = "불러오는 중...";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    restaurants = await response.json();
    render(restaurants);
    statusMsg.textContent = `${restaurants.length}개를 불러왔습니다.`;
  } catch (error) {
    statusMsg.textContent = `조회 실패: ${error.message}`;
  }
}

function render(list) {
  tbody.replaceChildren(); 
  list.forEach(item => {
    const tr = document.createElement("tr");
    [item.name, item.category, item.location, item.menu, item.rating].forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

loadRestaurants(); 