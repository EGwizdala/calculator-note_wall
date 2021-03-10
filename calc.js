/** następna operacja jaką będziemy wykonywać **/
let nextOperation = null;
/** Poprzednio wpisana liczba **/
let lastNumber = "0";
/** Liczba obecnie w trakcie wpisywania **/
let currentNumber = "0";
/** czy już został wciśnięty znak kropki **/
let decimals = false;
/** czy jest potrzebny reset - np. po wciśnięciu znaku = **/
let isResetNeeded = false;

/** hard reset - czyści ekran i wszystkie zmienne **/
function hardReset() {
  currentNumber = "0";
  lastNumber = "0";
  decimals = false;
  nextOperation = null;  
  isResetNeeded = false;  
  refreshScreen();  
}

/** podpinamy funkcję hardReset pod przycisk AC **/
document.querySelector("#AC").addEventListener( 'click' , hardReset);

/** refreshScreen - funkcja pomocnicza - wyświetla przekazaną liczbę na ekranie. Jeśli nie przekazano liczby, wyświetla currentNumber **/
function refreshScreen( newValue = currentNumber ) {
  document.querySelector("#screen").innerHTML = newValue;    
}

/** percent - zamienia aktualnie wyświetloną liczbę na procenty **/
function percent() {
  currentNumber = parseFloat( currentNumber ) / 100;
  refreshScreen( currentNumber ); 
}

/** podpinamy funkcję percent pod odpowiedni przycisk **/
document.querySelector("#percent").addEventListener( 'click' , percent);

/** pointClicked - wyświetla kropkę na ekranie - pod warunkiem, że nie ma jeszcze żadnej **/
function pointClicked() {
  if ( decimals === false ) {
    currentNumber += ".";    
    decimals = true;
    refreshScreen();
  }
}

/** podpinamy funkcję pointClicked pod znak kropki **/
document.querySelector("#point").addEventListener( 'click' , pointClicked);

/** wykonuje zapamiętaną wcześniej operację i zwraca wynik. Liczby mamy zapisane w pamięci jako tekst, dlatego musimy je przekonwertować do formatu liczby rzeczywistej i z powrotem **/
function processOperation( operation ) {
  return operation( parseFloat( lastNumber ), parseFloat( currentNumber ) ).toString();
}

/** Sprawdza, czy mamy zapamiętaną operację do wykonania na potem - jeżeli tak, wykonuje tę operację. Jeżeli nie, przygotowuje kalkulator do wprowadzenia nowej liczby **/
function maybeProcessNextOperation() {
if( nextOperation ) {
    lastNumber = processOperation( nextOperation );
  } else {
    lastNumber = currentNumber.toString();
  }  
  refreshScreen( lastNumber );  
}

/** Zapamiętuje następną operację do wykonania **/
function scheduleNextOperation( operation ) { 
  if( isResetNeeded ) {
    lastNumber = lastNumber.toString();    
    isResetNeeded = false;
  } else {
    maybeProcessNextOperation();
  }
  nextOperation = operation;    
  currentNumber = "0";      
}

/** przycisk = - po wciśnięciu potrzebny reset **/
function equalKeyPressed() {
  maybeProcessNextOperation();
  isResetNeeded = true;
}

document.querySelector("#equal").addEventListener( 'click' , equalKeyPressed);

/** dopisuje podaną cyfrę do aktualnie tworzonej liczby **/
function numberKeyPressed( number ) {
  if( isResetNeeded === true ) {
    hardReset();
  }
  if( currentNumber === 0 || currentNumber === "0" ) {
    currentNumber = number.toString();
  }
  else if ( currentNumber.length < 11 ) {
    currentNumber += number.toString();
  } 
  refreshScreen();
}
function reset() {
  currentNumber = 0;
  document.querySelector('#screen').innerText = currentNumber;
  console.log("klik")
}

document.querySelector('#C').addEventListener('click', reset)


for (let i=0; i<10; i++) {
  document.querySelector(`#number${i}`).addEventListener('click', function() {
    numberKeyPressed(i)
  });
}

function sum (x, y) {
  return x+y;
} 

document.querySelector('#plus').addEventListener('click', function () {
  scheduleNextOperation(sum); 
});

function sum (x, y) {
  return x+y;
} 

document.querySelector('#plus').addEventListener('click', function () {
  scheduleNextOperation(sum); 
});

function substraction (x, y) {
  return x-y;
}

document.querySelector('#minus').addEventListener('click', function () {
  scheduleNextOperation(substraction); 
});

function multiply (x, y) {
  return x*y;
}

document.querySelector('#multiply').addEventListener('click', function () {
  scheduleNextOperation(multiply); 
});

function division (x, y) {
  return x/y;
}

document.querySelector('#divide').addEventListener('click', function () {
  scheduleNextOperation(division); 
});