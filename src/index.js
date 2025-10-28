import './index.css'




const burger = document.querySelector('.burger');
const menu = document.querySelector('.header_ul');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
