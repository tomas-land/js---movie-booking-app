const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat"); //returns nodelist object
const totalSeats = document.getElementById("total-seats");
const totalPrice = document.getElementById("price");
const movieSelect = document.querySelector(".movie-select");
retrieveSeatsStorage();
let ticketPrice = document.getElementById("movie").value;
//---------------------------------------------------------------------
// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// count selected seats and change html elements text, map through all seats and return index of selected seat
function countSelectedSeats() {
  const selectedSeats = document.querySelectorAll(".selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  totalSeats.innerText = selectedSeats.length;
  totalPrice.innerText = selectedSeats.length * ticketPrice;
}
// get data from localstorage and display when movie is selected
function retrieveSeatsStorage() {
  const selectedSeatsStorage = JSON.parse(
    localStorage.getItem("selectedSeats")
  );
  if (selectedSeatsStorage !== null && selectedSeatsStorage.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsStorage.indexOf(index) > 2) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex != null){
      movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//--------------------------------------------------------------------

// movie select event // after select, nulify html element text and remove selected seats
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  //   totalSeats.innerHTML = "0";
  //   totalPrice.innerHTML = "0";
  //   seats.forEach((seat) => {
  //     seat.classList.remove("selected"); // on movie change removes selected seats
  //   });
  countSelectedSeats();
});

//seats click event and and count selected seats
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  countSelectedSeats();
});
countSelectedSeats();