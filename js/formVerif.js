/**
 * Verification de formulaire.
 * Version utilisable pour bulma.
 * 
 * Fonctionnement :
 * Pour chaque champs d'un formulaire, vérifie à la perte du focus :
 *  -si la valeur du champs est vide alors que le champs est requis,
 *  -si la valeur du champs correspond à une regex.
 * 
 * Si la valeur d'un champs requis est vide : coloration en rouge.
 * Si la valeur d'un champs ne correspond pas à la regex : coloration en jaune.
 * Si la valeur d'un champs est ok : coloration en vert.
 * 
 * Quand on clique sur la bouton d'envoi de formulaire, tous les champs sont ré-analysés.
 * Dès lors qu'il y a un élément requis vide ou une valeur qui ne correspond pas à une regex,
 * le formulaire n'est pas envoyé.
 * 
 * Mise en place :
 * Inclure ce code dans la page html.
 * La balise form doit posséder un identifiant unique.
 * Les champs du formulaire doivent posséder un identifiant unique.
 * Initialiser boutonValider avec l'identifiant du bouton submit.
 * Initialiser le tableau associatif elementsAVerifier comme ci-après énoncé :
 * chaque entrée représente un champs,
 * chaque CLEF est l'id d'un champs,
 * chaque VALEUR est une regex qui a pour but de contrôler la valeur du champs.
 * 
 * @author Samier Fabien <samierfabien@gmail.com>
 */



//Liste des regex courantes (non exhaustive)
const DEFAULT = /./;
const NOM = /^[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöŒœŨũŰűùúûüýÿŶŷŸ'-]+$/;
const CODEPOSTAL = /^[0-9]{5}$/;
const TELEPHONE = /^[0-9]{10}$|[0-9]{2}([\s-./])?[0-9]{2}([\s-./])?[0-9]{2}([\s-./])?[0-9]{2}([\s-./])?[0-9]{2}/;
const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const DATE = /^[0-9]{4}[\s-/][0-9]{2}[\s-/][0-9]{2}$|[0-9]{2}[\s-/][0-9]{2}[\s-/][0-9]{4}$/;

let boutonValider = 'submit';
let elementsAVerifier = {
    /*CLEF : VALEUR*/
    'nom' : NOM,
    'prenom' : NOM,
    'email' : EMAIL,
    'message' : DEFAULT
};

verifierElements(elementsAVerifier);

document.getElementById(boutonValider).addEventListener('click', (event) => {
    verifierFormulaire(elementsAVerifier, event);
});

/**
 * Fonction qui attache des écouteurs à chaque champs en vue de le colorer en fonction du cas de figure.
 * Requis vide : rouge, pas de correspondance regex : jaune, ok : vert.
 * @param {Array} elements la liste des champs
 */
function verifierElements(elements) {
    /*Pour chaque élément à vérifier :*/
    for (let id in elements) {
        let regex = elements[id];
        let element = document.getElementById(id);
        /*On attache un écouteur au focus in qui enlève la coloration*/
        element.addEventListener('focusin', (event) => {
            event.target.classList.remove("has-background-danger");
            event.target.classList.remove("has-background-warning");
            event.target.classList.remove("has-background-success");
        });
        /*on attache un écouteur au focus out qui colore chaque champs*/
        element.addEventListener('focusout', (event) => {
            if (requisVide(element)) {
                event.target.classList.toggle("has-background-danger");
            } else if (mauvaisFormat(element, regex)) {
                event.target.classList.toggle("has-background-warning");
            } else {
                event.target.classList.toggle("has-background-success");
            }
        });
    }
}

/**
 * Verifie si la valeur d'un champs requis est vide
 * @param {elementHtml} element Un champs du formulaire
 * @returns true si requis et vide, sinon false
 */
function requisVide(element) {
    if (element.validity.valueMissing) {
        return true;
    } else {
        return false;
    }
}

/**
 * Verifie si la valeur d'un champs correspond à une regex donnée
 * @param {elementHtml} element Un champs du formulaire
 * @param {RegExp} regex Une expression régulière
 * @returns true si ne correspond pas à la regex, sinon false
 */
function mauvaisFormat(element, regex) {
    if (regex.test(element.value) == false) {
        return true;
    } else {
        return false;
    }
}

/**
 * Au clic sur le bouton de submit du formulaire, vérifie pour chaque valeur de chaque champs :
 * si le champs requis est vide,
 * si la valeur du champs correspond à la regex donnée.
 * S'il y a la moindre erreur, l'action d'envoi du formulaire est annulée.
 * @param {Array} elements La liste des champs du formulaire
 * @param {Event} event L'évènement au clique sur le bouton submit
 */
function verifierFormulaire(elements, event) {
    let valide = true;
    for (let id in elements) {
        let regex = elements[id];
        let element = document.getElementById(id);

        element.classList.remove("has-background-danger");
        element.classList.remove("has-background-warning");
        element.classList.remove("has-background-success");
        
        if (requisVide(element)) {
            element.classList.toggle("has-background-danger");
            valide = false;
        } else if (mauvaisFormat(element, regex)) {
            element.classList.toggle("has-background-warning");
            valide = false;
        } else {
            element.classList.toggle("has-background-success");
        }
    }
    if (valide === false) {
        event.preventDefault();
    }
}