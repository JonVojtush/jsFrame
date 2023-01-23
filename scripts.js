"use strict";

let siteTitle = "jsFrame",
    main = document.querySelector("main");

function includeHTML() {  // Load data into the index.html from other source files. https://www.w3schools.com/howto/howto_html_include.asp
    let z, i, elmnt, include, xhttp;
    z = document.querySelectorAll("header, main, aside, footer");
    for (i = 0; i < z.length; i++) {  // Loop through elements that contain the include attribute
        elmnt = z[i];
        include = elmnt.getAttribute("include");
        if (include) {  // Search for elements with the include atrribute
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {  // Make an HTTP request using the include attribute value as the file name to fetch data from
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}  // Update elmnt with the include file's data
                    if (this.status == 404) {elmnt.innerHTML = "Content not found. Please let us know what is broken so we can fix it. Thank you.";}
                    elmnt.removeAttribute("include");  //? Why is this necessary?
                    includeHTML();  //? Why is this necessary?
                };
            };
            xhttp.open("GET", include, true);
            xhttp.send();
            return;
        };
    };
};

function setLinks() {  // Disable default behaviour for <a> tags and configure them to update the content area
    let z, i, elmnt, href, xhttp, link;
    z = document.querySelectorAll("a");
            console.log(z.length + " <a> tag(s) found");  //! Not finding any of the <a> tags brought in from header file when it should find atleast 5
    for (i = 0; i < z.length; i++) {  // Loop through a collection of <a> tags
        elmnt = z[i];
        link = elmnt.getAttribute("target");
        if (link !== "_blank") {
            elmnt.className += " disabled";
            addEventListener(elmnt, "click", function() {
                href = elmnt.getAttribute("href");
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(href) {  // Make an HTTP request using the href attribute value as the file name to fetch from
                    if (this.readyState == 4) {
                        if (this.status == 200) {main.innerHTML = this.responseText;}  // Update the main content area
                        if (this.status == 404) {main.innerHTML = "Content not found. Please let us know what is broken so we can fix it. Thank you.";}
                        return;
                    };
                };
                xhttp.open("GET", href, true);
                xhttp.send();
                return;
            });
        };
    };
};

includeHTML();
setLinks();