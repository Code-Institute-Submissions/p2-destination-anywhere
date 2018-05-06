$(document).ready(function () {
    var bp;
    var xs = false, sm = false, md = false, lg = false;

    getCurrentBreakpoint();

    $(window).resize(function () {
        getCurrentBreakpoint();
    });

    function getCurrentBreakpoint() {
        bp = window.getComputedStyle(document.getElementById('breakpoint-tracker'), ':before').content.substr(1, 2);

        xs = Boolean(bp == "xs");
        sm = Boolean(bp == "sm");
        md = Boolean(bp == "md");
        lg = Boolean(bp == "lg");
        console.log(bp, xs, sm, md, lg);
    }

    // home button clicked
    $('.home a').click(function () {
        if (xs || sm) {
            if ($(this).attr('href').substr(1) == "explore") {
                showExploreMobile();
            } else {
                showNavigateMobile();
            }
        } else if (md) {
            showNavigateTablet();
        }
        else {
            showNavigateTablet();
        }
    });

    // explore button clicked
    $('.explore a').click(function () {
        if (xs || sm) {
            showNavigateMobile();
        }
        else if (md) {
            showDiscoverTablet();
        } else {
            //lg
            showDiscoverDesktop();
        }
    });

    // city marker clicked
    $('.map-marker-city').click(function () {
        if (xs || sm) {
            showDiscoverMobile();
        } else if (md) {
            showDiscoverTablet();
        }
        else {
            //lg
            showDiscoverDesktop();
        }
    });

    // venue marker clicked
    $('.map-marker-venue').click(function () {
        showVenue();
    });

    // close venue clicked
    $('.close-icon').click(function () {
        hideVenue();
    });

    // back-icon clicked
    $('.back-icon').click(function () {
        if (xs || sm) {
            if ($('.search-form').hasClass('d-none')) {
                showNavigateMobile();
            } else if ($('.discover').hasClass('d-none') && $('.explore').hasClass('d-none')) {
                showExploreMobile();
            } else {
                showHome();
            }
        } else {
            // md or lg
            if (!$('.discover').hasClass('d-none')) {
                showNavigateTablet();
            } else {
                showHome();
            }
        }
    });
});

function showHome() {
    console.log("home mob");
    showSections(['home', 'search-form']);
    hideSections(['header', 'explore', 'navigate', 'discover', 'city-name']);
}

function showExploreMobile() {
    console.log("explore mob");
    showSections(['header', 'explore', 'search-form', 'back-icon']);
    hideSections(['home', 'navigate', 'discover', 'city-name']);
}

function showNavigateMobile() {
    console.log("nav mob");
    showSections(['header', 'navigate', 'search-form', 'back-icon']);
    hideSections(['home', 'explore', 'discover', 'city-name']);
}

function showNavigateTablet() {
    console.log("nav tablet");
    showSections(['header', 'explore', 'navigate', 'search-form', 'back-icon']);
    hideSections(['home', 'discover', 'city-name']);
}

function showDiscoverMobile() {
    console.log("discover mob");
    showSections(['header', 'navigate', 'discover', 'city-name', 'back-icon']);
    hideSections(['home', 'explore', 'search-form']);
}

function showDiscoverTablet() {
    console.log("discover tablet");

    showSections(['header', 'navigate', 'discover', 'city-name', 'back-icon']);
    hideSections(['home', 'explore', 'search-form']);
}

function showDiscoverDesktop() {
    console.log("discover desktop");
    showSections(['header', 'explore', 'navigate', 'discover', 'search-form', 'city-name', ]);
    hideSections(['home']);
}

function showVenue() {
    showSections(['venue']);
}

function hideVenue() {
    hideSections(['venue']);
}

function showSections(sections) {
    sections.forEach(function (section) {
        $('.' + section).removeClass('d-none');
    })
}

function hideSections(sections) {
    sections.forEach(function (section) {
        $('.' + section).addClass('d-none');
    })
}