const urlBar = document.getElementById('url-bar');
const btnGo = document.getElementById('go');
const btnBack = document.getElementById('back');
const btnForward = document.getElementById('forward');
const btnReload = document.getElementById('reload');
const btnNewTab = document.getElementById('new-tab');
const tabsContainer = document.getElementById('tabs-container');
const webviewContainer = document.getElementById('webview-container');

let currentTabId = 1;
let tabs = { 1: { url: '', content: '<h2>Bienvenue sur votre navigateur custom !</h2>' } };

// Afficher contenu de l'onglet actuel
function renderCurrentTab() {
  const tab = tabs[currentTabId];
  webviewContainer.innerHTML = tab.content;
  urlBar.value = tab.url;
}

// Bouton "Go" (chargement minimal URL)
btnGo.addEventListener('click', () => {
  const url = urlBar.value;
  tabs[currentTabId].url = url;
  tabs[currentTabId].content = `<h3>URL demandée : ${url}</h3><p>(Rendu HTML à venir)</p>`;
  renderCurrentTab();
});

// Boutons navigation (précédent, suivant, reload)
btnBack.addEventListener('click', () => {
  console.log('Navigation précédente');
});
btnForward.addEventListener('click', () => {
  console.log('Navigation suivante');
});
btnReload.addEventListener('click', () => {
  console.log('Rechargement');
});

// Ajouter nouvel onglet
btnNewTab.addEventListener('click', () => {
  const newTabId = Date.now();
  tabs[newTabId] = { url: '', content: '<h2>Nouvel onglet</h2>' };
  
  const tabElement = document.createElement('div');
  tabElement.className = 'tab';
  tabElement.dataset.tabId = newTabId;
  tabElement.textContent = 'Nouvel Onglet';
  
  tabsContainer.appendChild(tabElement);
  
  setActiveTab(newTabId);
});

// Changer d'onglet
tabsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab')) {
    const tabId = e.target.dataset.tabId;
    setActiveTab(tabId);
  }
});

function setActiveTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelector(`.tab[data-tab-id="${tabId}"]`).classList.add('active');
  currentTabId = tabId;
  renderCurrentTab();
}

// Initialisation
renderCurrentTab();
