
//  Get DOM elements
const carList = document.getElementById("carList");
const form = document.getElementById("addCarForm");
const successMsg = document.getElementById("successMsg");

const carTitle = document.getElementById("carTitle");
const carBrand = document.getElementById("carBrand");
const carPrice = document.getElementById("carPrice");
const carImage = document.getElementById("carImage");
const carLocation = document.getElementById("carLocation");
const carContact = document.getElementById("carContact");
const carDescription = document.getElementById("carDescription");

// Backend base URL
const baseURL = "http://localhost:3000/cars"; 

//  Load cars from server
function loadCars() {
  fetch(baseURL)
    .then(res => res.json())
    .then(cars => {
      carList.innerHTML = ""; // Clear any existing
      cars.forEach(createCarCard);
    });
}

// Create and display one car card
function createCarCard(car) {
  const card = document.createElement("div");
  card.className = "car-card";

  card.innerHTML = `
    <img src="${car.image}" alt="${car.title}">
    <h3>${car.title}</h3>
    <p><strong>Brand:</strong> ${car.brand}</p>
    <p><strong>Price:</strong> ${car.price}</p>
    <p><strong>Location:</strong> ${car.location}</p>
    <p><strong>Contact:</strong> ${car.contact}</p>
    <p>${car.description}</p>
    <button class="delete-btn">Delete</button>
  `;

  //  Delete button
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    fetch(`${baseURL}/${car.id}`, {
      method: "DELETE"
    }).then(() => card.remove());
  });

  carList.appendChild(card);
}

// Form submit: add new car
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newCar = {
    title: carTitle.value,
    brand: carBrand.value,
    price: "Ksh " + carPrice.value,
    image: carImage.value,
    location: carLocation.value,
    contact: carContact.value,
    description: carDescription.value
  };

  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCar)
  })
    .then(res => res.json())
    .then(car => {
      createCarCard(car);       // Add to UI
      form.reset();             // Clear form
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);
    });
});

//  Run on page load
loadCars();
