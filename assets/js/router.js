$(document).ready(function() {

    // show explore or navigate
    $('.home a').click(function() {
        var sectionsToShow = [];
        sectionsToShow.push($(this).attr('href').substr(1));
        sectionsToShow.push('header');

        showSections(sectionsToShow);
        hideSections(['home']);
    });

    // show navigate
    $('.explore a').click(function () {
        hideSections(['explore']);
        showSections(['navigate']);
    });

    // show discover
    $('.map-marker-city').click(function () {
        showSections(['discover', 'city-name']);
        hideSections(['search-form']);
    });

    // show venue
    $('.map-marker-venue').click(function () {
        showSections(['venue']);
    });

});

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
