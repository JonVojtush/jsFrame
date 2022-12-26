"use strict";

// Global variables
let siteTitle = "jsFrame";

// Get HTML source files for inclusion
function includeHTML() {
    let z, i, elmnt, file, xhttp;
    // Loop through a collection of all HTML elements:
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        // Search for elements with a certain atrribute:
        file = elmnt.getAttribute("include");
        if (file) {
            // Make an HTTP request using the attribute value as the file name:
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    // Remove the attribute, and call this function once more:
                    elmnt.removeAttribute("include");
                    includeHTML();
                };
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            // Exit the function:
            return;
        };
    };
};

// Load include files into index.html
includeHTML();

// Update per nav list items
    // Update meta data
        // siteTitle
    // Update page main HTML section

// Event Listeners
    // Nav links