(function () {
    "use strict";

    var VALID = ["wiesci", "o-nas", "projekty", "dolacz", "zasady"];
    var DEFAULT_TAB = "wiesci";

    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var panels = document.querySelectorAll(".tab-panel");
    var links = document.querySelectorAll(".site-nav a[data-tab]");

    function tabFromHash() {
        var hash = (location.hash || "").replace(/^#/, "");
        if (VALID.indexOf(hash) !== -1) {
            return hash;
        }
        return DEFAULT_TAB;
    }

    function showTab(id) {
        var i;
        var link;
        var panel;

        for (i = 0; i < panels.length; i++) {
            panel = panels[i];
            if (panel.id === id) {
                panel.removeAttribute("hidden");
            } else {
                panel.setAttribute("hidden", "");
            }
        }

        for (i = 0; i < links.length; i++) {
            link = links[i];
            if (link.getAttribute("data-tab") === id) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        }

        if (location.hash.replace(/^#/, "") !== id) {
            history.replaceState(null, "", "#" + id);
        }

        closeMenu();
    }

    function closeMenu() {
        if (!nav || !toggle) {
            return;
        }
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
        if (!nav || !toggle) {
            return;
        }
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
    }

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            if (nav.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    window.addEventListener("hashchange", function () {
        showTab(tabFromHash());
    });

    showTab(tabFromHash());
})();
