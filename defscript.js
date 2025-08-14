// sidenav toggler
let sideNavButton = document.getElementById("sideNav-button");
let sideNav = document.getElementById("sidenav");

const openIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-panel-right-open-icon lucide-panel-right-open">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M15 3v18"/>
  <path d="m10 15-3-3 3-3"/>
</svg>
`;

const closeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-panel-right-close-icon lucide-panel-right-close">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M15 3v18"/>
  <path d="m8 9 3 3-3 3"/>
</svg>
`;

sideNavButton.innerHTML = openIcon;

sideNavButton.onclick = function () {
  sideNav.classList.toggle("collapsed");

  // Switch icon based on sidebar state
  if (sideNav.classList.contains("collapsed")) {
    sideNavButton.innerHTML = closeIcon;
    sideNavButton.style.top = "50px";

  } else {
    sideNavButton.innerHTML = openIcon;
    sideNavButton.style.top = "330px";

  }
};

let resultDD = document.getElementById("searchResults");

// Dictionary of pages
const siteIndex = {
  home: { title: "Home", url: "index.html", keywords: "welcome intro overview" },
  about: { title: "About", url: "about.html", keywords: "bio background profile" },
  education: { title: "Study", url: "study.html", keywords: "SAT school degree university study" },
  WhyScoreStack: { title: "Why ScoreStack", url: "whySS.html", keywords: "projects jobs career better reason" }
};

const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    searchDropdown.innerHTML = "";

    if (!query) {
        searchDropdown.style.display = "none";
        return;
    }

    let matches = [];

    for (let key in siteIndex) {
        let page = siteIndex[key];
        if (page.title.toLowerCase().includes(query) || page.keywords.toLowerCase().includes(query)) {
            matches.push(page);
        }
    }

    if (matches.length > 0) {
        matches.forEach(page => {
            const option = document.createElement('div');
            option.textContent = page.title;
            option.addEventListener('click', () => {
                searchInput.value = page.title;
                searchDropdown.style.display = "none";
                // navigate if desired:
                window.location.href = page.url;
            });
            searchDropdown.appendChild(option);
        });
        searchDropdown.style.display = "block";
    } else {
        searchDropdown.style.display = "none";
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!document.getElementById('search-container').contains(e.target)) {
        searchDropdown.style.display = "none";
    }
});