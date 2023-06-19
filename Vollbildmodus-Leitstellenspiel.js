// ==UserScript==
// @name         Vollbild-Schriftzug hinzufügen
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fügt den Schriftzug "Vollbildmodus an" bsw ,"Vollbildmodus aus" der Navigation auf Leitstellenspiel.de hinzu.
// @author       TorBEngel
// @match        https://www.leitstellenspiel.de/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Erzeuge ein neues Element für den Schriftzug
    var vollbildLi = document.createElement('li');
    vollbildLi.innerHTML = 'Vollbildmodus an';
    vollbildLi.style.cursor = 'pointer';
    vollbildLi.style.lineHeight = '19px';
    vollbildLi.style.paddingBottom = '10px';
    vollbildLi.style.paddingTop = '10px';
    vollbildLi.style.paddingLeft = '15px'

    // Finde das Element mit der ID "news"
    var newsElement = document.getElementById('news_li');

    // Überprüfe die Bildschirmbreite
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Füge das Element vor dem "news"-Element hinzu, wenn die Bildschirmbreite kleiner als 786px ist
    if (screenWidth <= 786) {
        newsElement.parentNode.insertBefore(vollbildLi, newsElement);
    }

    // Funktion zum Wechseln in den Vollbildmodus
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    // Füge einen Klick-Eventlistener hinzu
    vollbildLi.addEventListener('click', toggleFullscreen);

    // Überprüfe den Vollbildmodus beim Laden der Seite
    document.addEventListener('fullscreenchange', updateFullscreenText);
    document.addEventListener('webkitfullscreenchange', updateFullscreenText);
    document.addEventListener('mozfullscreenchange', updateFullscreenText);
    document.addEventListener('MSFullscreenChange', updateFullscreenText);

    // Funktion zum Aktualisieren des Schriftzugs basierend auf dem Vollbildmodus
    function updateFullscreenText() {
        if (document.fullscreenElement || document.webkitFullscreenElement ||
            document.mozFullScreenElement || document.msFullscreenElement) {
            vollbildLi.innerHTML = 'Vollbildmodus aus';
        } else {
            vollbildLi.innerHTML = 'Vollbildmodus an';
        }
    }
})();