function showMenu() {
  document.body.classList.toggle('lock');
  menu.classList.toggle('active');
}
const menu = document.querySelector('.main-header nav');

const menuButton = document.querySelector('.burger-button');
menuButton.addEventListener('click', showMenu);

const menuLinks = document.querySelectorAll('.main-header .menu a');
menuLinks.forEach((link) => link.addEventListener('click', onMenuClick));

function onMenuClick() {
  if (menu.classList.contains('active')) {
    document.body.classList.remove('lock');
    menu.classList.remove('active');
  }
}

const tabButtons = document.querySelectorAll('#products .tab-title');
const tabs = document.querySelectorAll('#products .tab-items');
let activeTabButton = document.querySelector('#products .tab-title.active');
let activeTab = document.querySelector('#products .tab-items.active');
tabButtons.forEach((button) => button.addEventListener('click', onTabChange));
function onTabChange(event) {
  if (activeTabButton === event.target) return;
  activeTabButton.classList.remove('active');
  activeTabButton = event.target;
  activeTabButton.classList.add('active');
  activeTab.classList.remove('active');
  for (const value of activeTabButton.classList) {
    for (const tab of tabs) {
      if (tab.classList.contains(value)) {
        tab.classList.add('active');
        activeTab = tab;
        return;
      }
    }
  }
}

const brands = document.querySelectorAll('.brands img');
// brands carousel

const detailsTitles = document.querySelectorAll('.about-us .detail h3');

detailsTitles.forEach((item) => item.addEventListener('click', showDetail));

function showDetail(event) {
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active');
    return;
  }
  for (const title of detailsTitles) {
    title.classList.remove('active');
  }
  event.target.classList.add('active');
}
