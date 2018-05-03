$(document).ready(function() {

    // show explore or navigate
    $('.home a').click(function() {
        if ($(this).attr('href').substr(1) == "explore") {
            showExplore();
        } else {
            showNavigate();
        }

    });

    // show navigate
    $('.explore a').click(function () {
        showNavigate();
    });

    // show discover
    $('.map-marker-city').click(function () {
        showDiscover();
    });

    // show venue
    $('.map-marker-venue').click(function () {
        showVenue();
    });

    // hide venue
    $('.close-icon').click(function () {
        hideVenue();
    });

    $('.back-icon').click(function(){
        if ($('.search-form').hasClass('d-none')) {
            showNavigate();
        } else if ($('.discover').hasClass('d-none') && $('.explore').hasClass('d-none')) {
            showExplore();
        } else {
            showHome();
        }
    });

});

function showHome() {
    showSections(['home', 'search-form']);
    hideSections(['header', 'explore', 'navigate', 'discover', 'city-name']);
}

function showExplore() {
    showSections(['header', 'explore', 'search-form', 'back-icon']);
    hideSections(['home', 'navigate', 'discover', 'city-name']);
}

function showNavigate() {
    showSections(['header', 'navigate', 'search-form', 'back-icon']);
    hideSections(['home', 'explore', 'discover', 'city-name']);
}

function showDiscover() {
    showSections(['header', 'navigate', 'discover', 'city-name', 'back-icon']);
    hideSections(['home', 'explore', 'search-form']);
}

function showVenue() {
    showSections(['venue']);
}

function hideVenue() {
    hideSections(['venue']);
}

function showSections(sections) {
    sections.forEach(function(section){
        $('.' + section).removeClass('d-none');
    })
}

function hideSections(sections) {
    sections.forEach(function(section){
        $('.' + section).addClass('d-none');
    })
}