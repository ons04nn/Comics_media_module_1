/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

var burger = document.querySelector('.burger');
var menu = document.querySelector('.header_ul');
burger.addEventListener('click', function () {
  menu.classList.toggle('active');
});
/******/ })()
;