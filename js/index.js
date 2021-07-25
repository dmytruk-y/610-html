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
