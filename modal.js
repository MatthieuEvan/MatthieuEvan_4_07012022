function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements
// Récupère les élements dans le DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
let closeForm = document.querySelector(".close");
let btnSubmit = document.querySelector(".btn-submit");
// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Function
// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
};
// Fonction qui supprime l'effet "display : block" en y appliquant un "none" :
function closeModal() {
  modalbg.style.display = "None";
};
// Function qui affiche une erreur
function displayMessage(element, message) {
  // Document.createElement est une méthode permettant de créer un élément HTML
  let msg = document.createElement('p');
  // .style permet de modifier le style d'un élément
  msg.style.color = "red";
  msg.style.fontSize = "15px";
  // .classList permet d'ajouter une  class à l'élément créé
  msg.classList.add('error_msg');
  msg.innerHTML = message;
  // .after indique la position de l'élement
  element.after(msg);
}
// Affiche un message quand validate() est appelée 
function validate(element, message) {
  displayMessage(element, message)
};

//Function qui vérifie l'utilisation de 2 caractères minimums
function checkName(name) {
  // Typeof me permet de vérifier que la valeur de mon paramètre est une chaine de caractères
  if (typeof (name) != "string") {
    // Si ce n'est pas une chaine de caractère, il me retourne false
    return false
  }
  if (name.length < 2) {
    // Si il y'a moins de 2 caractères, il me retourne false
    return false
  }
  // Sinon il me retourne true
  return true
}
// Function qui vérifie que l'adresse mail est valide
function checkEmail(email) {
  // Utilisation d'une Regex (expression rationnelle) pour valider le format email
  let verify = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire
  return verify.test(email);
}
// Function qui vérifie la date de naissance
function checkDate(birthdate) {
  let ageMinimum = 18;
  let oneYearInMilliseconds = 31557600000;
  // Date actuelle en millisecondes
  let now = new Date();
  // Date anniversaire en millisecondes
  let age = new Date(birthdate);
  // La date actuelle en millisecondes - la date d'anniversaire en millisecondes divisé par une année en milliseconde afin de recevoir un age en année
  let difference = (now - age) / oneYearInMilliseconds;
  let birthDate = document.querySelector("#birthdate");
  // Si l'âge de l'utilisateur est inférieur à l'âge minimum, retourne un message d'erreur + false
  if (difference < ageMinimum) {
    displayMessage(birthDate, "Vous devez avoir + de 18 ans")
    return false;
  }
  // Si l'âge de l'utilisateur est supérieur à l'âge minimum, retourne true
  if (difference >= ageMinimum) {
    return true;
  }
}
// Function qui vérifie qu'une valeur numérique est saisie
function checkNumber(number) {
  // Si number n'est pas nombre, retourne false (IsNaN Retourne true si l'argument n'est pas un nombre)
  if (isNaN(number)) {
    return false
    // Si number est supérieur à 100 ou que number est vide, retourne false
  } else if (number > 100 || number == "") {
    return false
  }
  return true
}
// Function qui vérifie qu'un bouton radio et une checkbox est sélectionné
function checkBtnRadio(btnRadio) {
  // J'utilise une boucle for qui va itérer mes boutons radio et me retourner true si un des boutons est cochés 
  for (let i = 0; i < btnRadio.length; i++) {
    // Si btnRadio a pour name "location" et que btnRadio est coché, alors retourne true
    if (btnRadio[i].name === "location" && btnRadio[i].checked) {
      return true
    }
  }
  // Si btnRadio est coché, alors retourne true
  if (btnRadio.checked == true) {
    return true
  }
}
// function qui efface les erreurs
function resetErrors() {
  // Je récupère tous les éléments ayant pour class .error_msg
  let errors = document.querySelectorAll('.error_msg')
  // forEach me permet d'executer la fonction remove() sur tous les éléments du tableau contenue dans la variable errors (La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.)
  errors.forEach(element => element.remove());
}
// Function qui permet d'afficher le message de confirmation d'envoi du formulaire
function noneModal() {
  let modalBody = document.querySelector(".modal-body");
  // .innerHTML = "" me permet de vider le modal de tous ses éléments
  modalBody.innerHTML = "";
  let p = document.createElement("p")
  p.classList.add("form_msg");
  p.innerHTML = "Merci ! Votre demande de réservation a bien été envoyée.";
  p.style.color = "white";
  p.style.fontSize = "18px";
  p.style.textAlign = "center";
  document.querySelector(".modal-body").before(p);
  // La méthode setTimeout me permet de définir un minuteur qui exécutera le codé donné
  setTimeout(() => {
    // La méthode location.reload permet de recharger la page depuis son URL actuelle
    location.reload();
  }, 5000);
}
// Event
// Je récupère via une variable mon élément ".close" et y ajoute l'événement "click" qui applique une fonction anonyme
closeForm.addEventListener('click', function () {
  closeModal();
});
// // Je récupère via une variable mon élément ".btnSubmit" et y ajoute l'événement "click" qui applique une fonction anonyme
btnSubmit.addEventListener('click', function (e) {
  // Je récupère mes éléments
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
  // La méthode .preventDefault permet d'annuler l'effet par défaut d'un événement
  e.preventDefault();
  // Application de la fonction permettant d'effacer les erreurs
  resetErrors();
  // vérifie que la case condition d'utilisation est cochée
  if (checkBtnRadio(generalCondition)) {
  } else {
    displayMessage(containerCondition, "⇧ Veuillez cocher les conditions générales");
  }
  // Vérifie qu'une ville est bien séléctionné
  if (checkBtnRadio(location)) {
  } else {
    displayMessage(containerLocation, "⇧ Veuillez renseigner une ville");
  }
  // Vérifie qu'un nombre de tournois est indiqués
  if (checkNumber(validQuantity)) {
    console.log("Nombre de tournois participés OK !");
  } else {
    displayMessage(quantity, "⇧ Veuillez renseigner un nombre de tournois participés valide");
  }
  // Vérifie qu'une date de naissance est renseignée
  if (checkDate(validBirthDate)) {
  }
  if (validBirthDate == "") {
    displayMessage(birthDate, "⇧ Veuillez renseigner une date de naissance valide");
  }
  // Vérifie qu'une adresse email est renseignée
  if (checkEmail(validEmail)) {
  } else {
    displayMessage(email, "⇧ Veuillez renseigner une adresse Email valide");
  }
  // Vérifie qu'un nom de famille est renseigné
  if (checkName(validLastName)) {
  } else {
    displayMessage(lastName, "⇧ Veuillez renseigner Nom avec un minimum de deux lettres");
  }
  // Vérifié qu'un prénom est renseigné
  if (checkName(validFirstName)) {
  } else {
    displayMessage(firstName, "⇧ Veuillez renseigner Prénom avec un minimum de deux lettres");
  }
  // Si les conditions précédentes renvois true, alors le formulaire est envoyé
  if (checkName(validFirstName) && checkName(validLastName) && checkEmail(validEmail) && checkDate(validBirthDate) && checkNumber(validQuantity) && checkBtnRadio(location) && checkBtnRadio(generalCondition)) {
    validate(containerCondition, "Merci ! Votre réservation a été reçue.");
    // affiche le message de confirmation d'envois du formulaire et recharge la page
    noneModal();
  }
});
