/*Lance l'animation de l'arrivée sur le site à travers trois fonctions qui découpent l'animation en périodes*/
document.getElementById('first-look-button').addEventListener('click', () => {
  fLA1();
  setTimeout(fLA2, 300);
  setTimeout(fLA3, 600);
});

function fLA1() {
  //Disparition bouton
  let flButton = document.getElementById('first-look-button');
  flButton.classList.remove("first-look-button-anim");
  flButton.classList.toggle("first-look-button-anim");
  flButton.textContent = '';
}
function fLA2() {
  //Apparition de la navbar, #articlesContainer et du footer
  document.getElementById("nav").style.display = "block";
  document.getElementById("articlesContainer").style.display = "block";
  document.getElementById("footer").style.display = "block";

  //Mise à hauteur de first-look
  let fl = document.getElementById("first-look");
  fl.classList.remove("first-look-anim");
  fl.classList.toggle("first-look-anim");
}
function fLA3() {
  //Disparition conteneur du bouton
  let flButtonContainer = document.getElementById("first-look-button-container");
  flButtonContainer.classList.remove("block");
  flButtonContainer.classList.remove("first-look-button-anim");
  flButtonContainer.classList.toggle("first-look-button-anim");

  //Retrait classe block de first-look-text
  let flText = document.getElementById("first-look-text");
  flText.classList.remove("block");
}