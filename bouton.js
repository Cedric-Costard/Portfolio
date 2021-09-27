// bouton désactiver three.js
function handlebuton() {
  // alert('salut cest cool !');
  let background = document.querySelector('canvas');
  let furtu = document.querySelector('input:checked + label');
  // alert (furtu);
  if (furtu) {
    background.className = 'hidden';
  }else{
    background.classList.remove("hidden");
  }
}

document.querySelector('div.bouton').addEventListener("click", handlebuton);
