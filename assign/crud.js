const API_URL = "https://6ae7413156b2ee1e54403e32.mockapi.io/restaurants";
const tbody = document.querySelector("#list");
const statusMsg = document.querySelector("#status");
const searchInput = document.querySelector("#search");
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

    const actionTd = document.createElement("td");
    const delBtn = document.createElement("button");

    delBtn.textContent = "삭제";
    delBtn.addEventListener("click", () => deleteRestaurant(item.id));

    actionTd.appendChild(delBtn);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });
}

async function deleteRestaurant(id) {

  if(!confirm("정말 삭제할까요?")){
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    
    if (!response.ok){
        throw new Error(`HTTP ${response.status}`);
    } 

    await loadRestaurants();
    statusMsg.textContent = "삭제되었습니다.";

  } catch (error) {
    statusMsg.textContent = `삭제 실패: ${error.message}`;
  }
  
}

loadRestaurants(); 


const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const data = {
    name: document.querySelector("#name").value.trim(),
    category: document.querySelector("#category").value.trim(),
    location: document.querySelector("#location").value.trim(),
    menu: document.querySelector("#menu").value.trim(),
    rating: Number(document.querySelector("#rating").value),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",                                   
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),                              
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    form.reset();
    await loadRestaurants();                                            
    statusMsg.textContent = "추가되었습니다.";

  } catch (error) {
    statusMsg.textContent = `추가 실패: ${error.message}`;
  }
});

