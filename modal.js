function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// Je récupère mon élément ".close"
let closeForm = document.querySelector(".close");
let btnSubmit = document.querySelector(".btn-submit");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Function
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
};
// Fonction qui supprime l'effet "display : block" en y appliquant un "none" :
function closeModal() {
  modalbg.style.display = "None";
};

//Function qui vérifie l'utilisation de 2 caractères minimums
function checkName(name) {
  // typeof me permet de vérifier que la valeur de mon paramètre est une chaine de caractères
  if (typeof (name) != "string") {
    // si ce n'est pas une chaine de caractère, il me retourne false
    return false
  }
  if (name.length < 2) {
    // si il y'a moins de 2 caractères, il me retourne false
    return false
  }
  // sinon il me retourne true
  return true
}
//Function qui vérifie que l'adresse mail est valide
function checkEmail(email) {
  let verify = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return verify.test(email);
}
// function checkDate(birthdate) {
//   // La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis le 1er Janvier 1970
//   let now = Date.now();
//   // On récupère la valeur de l'input date ici
//   let date = new Date(birthdate);
//   let ONE_YEAR_IN_MILLISECONDS = 315360000000000;
//   let age = (now - date) / ONE_YEAR_IN_MILLISECONDS;
//   let minimumAge = 13;
//   if (!(date instanceof Date) || isNaN(date)) {
//     return false;
//   }
//   return age >= minimumAge;
//   // Ne pas oublier de créer une variable miminimum age
// }
function checkDate(birthdate) {
  let ageMinimum = 18;
  let oneYearInMilliseconds = 31557600000;
  let now = new Date();
  let age = new Date(birthdate);
  let difference = (now - age) / oneYearInMilliseconds;
  console.log("difference", difference)
  console.log("age", age);
  console.log("now1", now.getTime());
  console.log("now", now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  if (difference < ageMinimum) {
    return false
  }
  return age >= ageMinimum;
}
console.log(checkDate())
// Function qui vérifie qu'une valeur numérique est saisie
function checkNumber(number) {
  if (isNaN(number)) {
    return false
  } else if (number > 100 || number == "") {
    return false
  }
  return true
}
// Function qui vérifie qu'un bouton radio et une checkbox est sélectionné
function checkBtnRadio(btnRadio) {
  // J'utilise une boucle for qui va itérer mes boutons radio et me retourner true si un des boutons est cochés 
  for (let i = 0; i < btnRadio.length; i++) {
    if (btnRadio[i].name === "location" && btnRadio[i].checked) {
      return true
    }
  }
  if (btnRadio.checked == true) {
    return true
  }
}
// Function qui affiche une erreur
function displayMessage(element, message) {
  let msg = document.createElement('p');
  msg.style.color = "red";
  msg.style.fontSize = "15px";
  msg.classList.add('error_msg');
  msg.innerHTML = message;
  element.after(msg);
}
// 
// function qui efface les erreurs
function resetErrors() {
  let errors = document.querySelectorAll('.error_msg')
  // forEach me permet d'executer la fonction remove() sur tous les éléments du tableau contenue dans la variable errors
  errors.forEach(element => element.remove());
}
function validate(element, message) {
  displayMessage(element, message)
};
function noneModal() {
  modalbg.style.display = "none";
  let div = document.createElement("div")
  div.style.display = "block";
  div.style.position = "fixed";
  div.style.left = "370px";
  div.style.right = "0";
  div.style.zIndex = "3"
  div.style.width = "500px";
  div.style.height = "auto";
  div.style.margin = "15px auto";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";
  div.style.backgroundColor = "#fe142f";
  div.classList.add("form_msg");
  div.innerHTML = "Merci ! Votre demande de réservation a bien été envoyée.";
  div.style.color = "white";
  div.style.fontSize = "18px";
  div.style.textAlign = "center";
  document.querySelector(".hero-section").before(div);
  setTimeout(() => {
    location.reload();
  }, 3000);


  // let msg = document.createElement('p');
  // msg.style.color = "red";
  // msg.style.fontSize = "15px";
  // msg.classList.add('error_msg');
  // msg.innerHTML = message;
  // element.after(msg);
}


// Event
// Je récupère via une variable mon élément ".close" et y ajoute l'événement "click" qui applique la fonction "closeModal"
closeForm.addEventListener('click', function () {
  closeModal();
});
btnSubmit.addEventListener('click', function (e) {
  let firstName = document.querySelector("#first");
  let lastName = document.querySelector("#last");
  let email = document.querySelector("#email");
  let birthDate = document.querySelector("#birthdate");
  let quantity = document.querySelector("#quantity");
  let containerLocation = document.querySelector(".containerLocation");
  let location = document.querySelectorAll("[name='location']");
  let containerCondition = document.querySelector(".containerCondition");
  let generalCondition = document.querySelector("#checkbox1");
  let validFirstName = firstName.value;
  let validLastName = lastName.value;
  let validEmail = email.value;
  let validBirthDate = birthDate.value;
  let validQuantity = quantity.value;
  e.preventDefault();
  resetErrors();
  // vérifie que la case condition d'utilisation est cochée
  if (checkBtnRadio(generalCondition)) {
    console.log("Conditions générales OK");
  } else {
    displayMessage(containerCondition, "⇧ Veuillez cocher les conditions générales");
    console.log("Veuillez cocher les conditions générales");
  }
  // vérifie qu'une ville est bien séléctionné
  if (checkBtnRadio(location)) {
    console.log("Ville renseignée OK");
  } else {
    displayMessage(containerLocation, "⇧ Veuillez renseigner une ville");
    console.log("Veuillez renseigner une ville");
  }
  if (checkNumber(validQuantity)) {
    console.log("Nombre de tournois participés OK !");
  } else {
    displayMessage(quantity, "⇧ Veuillez renseigner un nombre de tournois participés valide");
    console.log("Veuillez renseigner un nombre de tournois participés valide");
  }
  if (checkDate(validBirthDate)) {
    console.log("Date de naissance OK !");
  } else {
    displayMessage(birthDate, "⇧ Veuillez renseigner une date de naissance valide")
    console.log("Veuillez renseigner une date de naissance valide");
  }
  if (checkEmail(validEmail)) {
    console.log("Email OK !");
  } else {
    displayMessage(email, "⇧ Veuillez renseigner une adresse Email valide");
    console.log("Veuillez renseigner une adresse Email valide");
  }
  if (checkName(validLastName)) {
    console.log("Nom OK !");
  } else {
    displayMessage(lastName, "⇧ Veuillez renseigner Nom avec un minimum de deux lettres (pas de chiffres)");
    console.log("Veuillez renseigner Nom avec un minimum de deux lettres (pas de chiffres)");
  }
  if (checkName(validFirstName)) {
    console.log("Prénom OK !");
  } else {
    displayMessage(firstName, "⇧ Veuillez renseigner Prénom avec un minimum de deux lettres (pas de chiffres)");
    console.log("Veuillez renseigner Prénom avec un minimum de deux lettres (pas de chiffres)");
  }
  if (checkName(validFirstName) && checkName(validLastName) && checkEmail(validEmail) && checkDate(validBirthDate) && checkNumber(validQuantity) && checkBtnRadio(location) && checkBtnRadio(generalCondition)) {
    validate(containerCondition, "Merci ! Votre réservation a été reçue.");
    noneModal();
  } else {
    console.log("Vous n'avez pas remplis toutes les informations");
  }
});
