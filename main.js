(function obavestenje() {
    alert("Ovo je moja prva igrica :)\nSretno sa pogađanjem broja!"); //samopozivajući alert preko IIFE (Immediately Invoked Function Expression) 
    }());

const trazeniBroj = Math.floor(Math.random() * 100 + 1);  // dodana promenljiva - generisan broj između 1 i 100

let uvodni = document.querySelector("#uvodni");     // generisana veza sa html-om
let input = document.querySelector("#input");       // generisana veza sa html-om
let button = document.querySelector("button");      // generisana veza sa html-om
let izlaz = document.querySelector("#izlaz");       // generisana veza sa html-om
let output = document.querySelector("#output");     // generisana veza sa html-om
let tekst = document.querySelector(".tekst");       // generisana veza sa html-om

// reakcija samog button-a
button.addEventListener("click", hendlerDugme, false);      //događaj koji se realizuje na klik preko funkcije događaja (hendlerDugme)
function hendlerDugme() {
    pocetakIgrice();
};

// dodavanje "enter" za potvrdu unosa broja
window.addEventListener("keydown", hendlerEnter, false);     //događaj koji se realizuje na ENTER (hendlerEnter)
function hendlerEnter(event) {
    if (event.keyCode === 13) {
        pocetakIgrice();
    }
};

function pocetakIgrice() {
    if (ostatak > 1) {
        igrajIgricu();
    } else {
        krajIgrice();
    }
};

function igrajIgricu(){
    let broj = parseInt(input.value);   //dodana lokalna promenljiva od potvrdjene vrednosti broja (klikom ili enterom)
    if (broj === trazeniBroj) {
        output.innerHTML = "ČESTITAMO!!! VI STE GENIJALAC :)";
        output.style.backgroundColor = "green";
        let kont = document.querySelector("div");       //generisana veza sa html-om unutar funkcije da bi se izmenili stilovi
        kont.style.backgroundColor = "green";
        let naslov = document.querySelector("h1");
        naslov.innerHTML = "POGODILI STE BROJ";
        tekst.innerHTML = "Bravo! Traženi broj je: " + broj;
        uvodni.innerHTML = "Imali ste još " + (ostatak - 1) + " pokušaja."
        button.removeEventListener("click", hendlerDugme, false);
        window.removeEventListener("keydown", hendlerEnter, false);
        input.parentNode.removeChild(input);
        button.style.width = "15.5rem";
        button.innerHTML = "IGRAJMO SE OPET";
        button.addEventListener("click", hendlerOpet, false);
        window.addEventListener("keydown", hendlerOpet, false);
            function hendlerOpet() {
                location.reload();
            };
    } else
    if (broj > trazeniBroj && broj <= 100) {
        output.innerHTML = "Nažalost, niste pogodili! Pokušajte sa MANJIM brojem!";
        output.style.backgroundColor = "red";
        tekst.innerHTML = "Unesite novi broj! (Pokušaj: " + (brojac + 1) + ")";
        uvodni.innerHTML = "Preostalo Vam je još " + (ostatak - 1) + " pokušaja.";
    } else
    if (broj < trazeniBroj) {
        output.innerHTML = "Nažalost, niste pogodili! Pokušajte sa VEĆIM brojem!";
        output.style.backgroundColor = "red";
        tekst.innerHTML = "Unesite novi broj! (Pokušaj: " + (brojac + 1) + ")";
        uvodni.innerHTML = "Preostalo Vam je još " + (ostatak - 1) + " pokušaja.";
    } else {
        output.innerHTML = "Unesite broj između 1 i 100! Takva su pravila igre :)"
        output.style.backgroundColor = "darkseagreen";
        tekst.innerHTML = "Unesite novi broj! (Pokušaj: " + (brojac + 1) + ")";
        uvodni.innerHTML = "Preostalo Vam je još " + (ostatak - 1) + " pokušaja.";
    }
};

// kraj igrice ukoliko se prekorači dozvoljeni broj pokušaja
function krajIgrice() {
    let broj = parseInt(input.value);   //dodana lokalna promenljiva od potvrdjene vrednosti broja (klikom ili enterom)
    if (broj === trazeniBroj) {
        igrajIgricu();
    }
    else {
        output.innerHTML = "Nažalost, niste pogodili broj! POKUŠAJTE OPET!";
        output.style.backgroundColor = "red";
        let kont = document.querySelector("div");       //generisana veza sa html-om unutar funkcije da bi se izmenili stilovi
        kont.style.backgroundColor = "red";
        let naslov = document.querySelector("h1");
        naslov.innerHTML = "NISTE POGODILI BROJ";
        tekst.innerHTML = "Traženi broj je bio: " + trazeniBroj;
        uvodni.innerHTML = "Iskoristili ste sve pokušaje."
        button.removeEventListener("click", hendlerDugme, false);
        window.removeEventListener("keydown", hendlerEnter, false);
        input.parentNode.removeChild(input);
        button.style.width = "15.5rem";
        button.innerHTML = "IGRAJMO SE OPET";
        button.addEventListener("click", hendlerOpet, false);
        window.addEventListener("keydown", hendlerOpet, false);
            function hendlerOpet() {
                location.reload();
        }
    }
};

// brojači izvršenih i preostalih pokušaja
button.addEventListener("click", counter, false);
window.addEventListener("keydown", enterDole, false);
    function enterDole(event) {
        if (event.keyCode === 13) {
            counter();
        }
    };

let brojac = 1;
let ostatak = 10;

function counter() {
    let broj = parseInt(input.value);
    if (broj === trazeniBroj) {
        button.removeEventListener("click", counter, false);
        window.removeEventListener("keydown", enterDole, false);
    } else {
        brojac++;
        ostatak--;
    }
};

// niz pogađanih brojeva
button.addEventListener("click", nizBrojeva, false);
window.addEventListener("keydown", tipkaDole, false);
    function tipkaDole(event) {
        if (event.keyCode === 13) {
            nizBrojeva();
        }
    };

let nizPrethodnih = [];  // formiramo Array kao globalnu varijablu za prethodne pokušaje

function nizBrojeva() {
    let broj = parseInt(input.value);
    if (broj !== trazeniBroj) {
        nizPrethodnih.push(broj);
        izlaz.innerHTML = "Prethodni pokušaji su (" + (brojac - 1) + "): " + nizPrethodnih;
    }
    if (ostatak < 1) {
        button.removeEventListener("click", nizBrojeva, false);
        window.removeEventListener("keydown", tipkaDole, false);
    }
};