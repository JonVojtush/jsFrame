"use strict";

let siteTitle = "jsFrame",
    main = document.querySelector("main");

function includeHTML() {  // https://www.w3schools.com/howto/howto_html_include.asp
// Use the include attribute to load html content dynamically into an html framework
    let z, i, elmnt, include, xhttp;
    // Loop through a collection of all HTML elements:
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

// TO DO - new function to update main

function setLinks() {
    let z, i, elmnt, href, link;
    z = document.querySelectorAll("a");
            console.log(z.length + " a tag(s) found");  // BUG 1: This is only fetching 1 a element when it should find atleast 5
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        href = elmnt.getAttribute("href");
        link = elmnt.getAttribute("target");
        if (href && link !== "_blank") {
            console.log("Add event listener, iteration " + (i+1)); // BUG 2: Only seeing one iteration at this time. Assuming its beause z.length=1
            elmnt.addEventListener("click", function(event){
                event.preventDefault();  //  BUG 3: Not working
                // Make an HTTP request using the attribute value as the file name:
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
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
        return;
    };
};

setLinks();