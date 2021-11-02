const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = +movieSelect.value;
//add + to chance string to number
//console.log( typeof ticketPrice); //String + => number

const SetMovieData = (moiveIndex, moviePrice) => {
    localStorage.setItem('selectedMovieindex', moiveIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

const updateSelectedCount = () => {
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeat); // array ,length
    const seatIndex = [...selectedSeat].map((seat) => {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    // console.log(seatIndex);
    const selectedSeatCount = selectedSeat.length;
    // console.log(selectedSeatCount);
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

const populateUI = ()=> {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeat);
    if(selectedSeat !== null && selectedSeat.length > 0 ){
        seats.forEach((seat,index)=> {
            if(selectedSeat.indexOf(index)>-1){
                seat.classList.add('selected');
            }

        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieindex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
populateUI();
//difference arrow funct vs regular funct


movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    SetMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

})


container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }
    updateSelectedCount();

})
