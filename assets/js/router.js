var bp;
var section = "home";
var xs = false, sm = false, md = false, lg = false;
const all_elements = ['home', 'header', 'explore', 'navigate', 'discover', 'logo', 'search-form', 'city-name', 'back-icon']
const home_xs = ['home', 'logo', 'search-form'];
const home_sm = ['home', 'logo', 'search-form'];
const home_md = ['home', 'logo', 'search-form'];
const home_lg = ['home', 'logo', 'search-form'];
const explore_xs = ['header', 'explore', 'logo', 'search-form', 'back-icon'];
const explore_sm = ['header', 'explore', 'logo', 'search-form', 'back-icon'];
const explore_md = ['header', 'explore', 'navigate', 'logo', 'search-form', 'back-icon'];
const explore_lg = ['header', 'explore', 'navigate', 'logo', 'search-form', 'back-icon'];
const navigate_xs = ['header', 'navigate', 'logo', 'search-form', 'back-icon'];
const navigate_sm = ['header', 'navigate', 'logo', 'search-form', 'back-icon'];
const navigate_md = ['header', 'explore', 'navigate', 'logo', 'search-form', 'back-icon'];
const navigate_lg = ['header', 'explore', 'navigate', 'logo', 'search-form', 'back-icon'];
const discover_xs = ['header', 'navigate', 'discover', 'logo', 'city-name', 'back-icon'];
const discover_sm = ['header', 'navigate', 'discover', 'logo', 'city-name', 'back-icon'];
const discover_md = ['header', 'navigate', 'discover', 'city-name', 'back-icon'];
const discover_lg = ['header', 'explore', 'navigate', 'discover', 'logo', 'search-form', 'city-name', 'back-icon'];

setCurrentBreakpoint();

function setCurrentBreakpoint() {
    bp = window.getComputedStyle(document.getElementById('breakpoint-tracker'), ':before').content.substr(1, 2);

    xs = Boolean(bp == "xs");
    sm = Boolean(bp == "sm");
    md = Boolean(bp == "md");
    lg = Boolean(bp == "lg");
    // console.log(bp, xs, sm, md, lg);
};

function setCurrentSection(s) {
    section = s;
};

/*
* EVENT HANDLERS
*/

// window resized
$(window).resize(function () {
    setCurrentBreakpoint();
    showElements(eval(`${section}_${bp}`));
    // console.log(`${section}_${bp}`);
});

$('.logo').click(function () {
    showElements(eval(`home_${bp}`));
});

// home button clicked
$('.home a').click(function () {
    if (xs || sm) {
        if ($(this).attr('href').substr(1) == "explore") {
            showElements(explore_xs);
            setCurrentSection("explore");
        } else {
            showElements(navigate_xs);
            setCurrentSection("explore");
        }
    } else if (md) {
        showElements(navigate_md);
        setCurrentSection("navigate");
    }
    else {
        showElements(navigate_md);
        setCurrentSection("navigate");
    }
});

// explore button clicked
$('.explore a').click(function () {
    // Call initMap (map.js) to update markers
    var cities_list = $(this).text().trim().split(' ').join('_');
    initMap(cities_list);

    if (xs || sm) {
        showElements(navigate_xs);
        setCurrentSection("navigate");
    }
    else if (md) {
        showElements(navigate_md);
        setCurrentSection("navigate");
    } else {
        //lg
        showElements(navigate_lg);
        setCurrentSection("navigate");
    }
});

function cityMarkerClicked(label) {
    if (xs || sm) {
        showElements(discover_xs);
    } else if (md) {
        showElements(discover_md);
    }
    else {
        // lg
        showElements(discover_lg);
    }
    setCurrentSection("discover");
    $('.city-name').text(label);
};

function venueMarkerClicked() {
    if (!(bp == "xs")) {
        $('#venueModal').modal('show');
    } else {
        showVenue();
    }
};

// close venue clicked
$('.close-icon').click(function () {
    hideVenue();
});

// back-icon clicked
$('.back-icon').click(function () {
    if (xs || sm) {
        if ($('.search-form').hasClass('d-none')) {
            showElements(navigate_xs);
            setCurrentSection("navigate");
            addCityClusters();
        } else if ($('.discover').hasClass('d-none') && $('.explore').hasClass('d-none')) {
            showElements(explore_xs);
            setCurrentSection("explore");
        } else {
            showElements(home_xs);
            setCurrentSection("home");
        }
    } else {
        // md or lg
        if (!$('.discover').hasClass('d-none')) {
            showElements(navigate_md);
            setCurrentSection("navigate");
            addCityClusters();
        } else {
            showElements(home_xs);
            setCurrentSection("home");
        }
    }
});

function showVenue() {
    $('.venue').removeClass('d-none');
};

function hideVenue() {
    $('.venue').addClass('d-none');
};

function showElements(elements) {
    elements.forEach(function (elem) {
        $('.' + elem).removeClass('d-none');
    });
    var to_hide = all_elements.filter(
        function (item) {
            return !elements.includes(item);
        }
    );
    hideElements(to_hide);
};

function hideElements(elements) {
    elements.forEach(function (elem) {
        $('.' + elem).addClass('d-none');
    })
};
