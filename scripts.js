"use strict";

let siteTitle = "jsFrame",
    main = document.querySelector("main");

function includeHTML() {  // https://www.w3schools.com/howto/howto_html_include.asp
// Use the include attribute to load html content dynamically into an html framework
    let z, i, elmnt, include, xhttp;
    // Loop through a collection of specific HTML elements:
    z = document.querySelectorAll("header, main, aside, footer");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        // Search for elements with a certain atrribute:
        include = elmnt.getAttribute("include");
        if (include) {
            // Make an HTTP request using the attribute value as the file name:
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Content not found. Please let us know what is broken so we can fix it. Thank you.";}
                    // Remove the attribute, and call this function once more:
                    elmnt.removeAttribute("include");
                    includeHTML();
                };
            };
            xhttp.open("GET", include, true);
            xhttp.send();
            // Exit the function:
            return;
        };
    };
};

includeHTML();  // Load include files into index.html

function setLinks() {
    let z, i, elmnt, href, xhttp, link;
    // Loop through a collection of specific HTML elements:
    z = document.querySelectorAll("a");
            console.log(z.length + " <a> tag(s) found");  // BUG : This is only fetching 1 a element when it should find atleast 5
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        link = elmnt.getAttribute("target");
        if (link !== "_blank") {
            elmnt.className += " disabled";
            addEventListener(elmnt, "click", function() {
                href = elmnt.getAttribute("href");
                // Make an HTTP request using the attribute value as the file name:
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(href) {
                    if (this.readyState == 4) {
                        if (this.status == 200) {main.innerHTML = this.responseText;} // Update the main content area
                        if (this.status == 404) {main.innerHTML = "Content not found. Please let us know what is broken so we can fix it. Thank you.";}
                        return;
                    };
                };
                xhttp.open("GET", href, true);
                xhttp.send();
                // Exit the function:
                return;
            });
        };
    };
};

setLinks();