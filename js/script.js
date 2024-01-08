"use strict";
let application = {};
let price = {};
let sendData = new FormData();
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');
    alertPlaceholder === null || alertPlaceholder === void 0 ? void 0 : alertPlaceholder.append(wrapper);
};
const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success');
    });
}
const api_key = "de6e3ec6-5759-48ab-a19d-d7c3f92d1e7a";
let walkingRoutes;
let currentPage = 1;
let maxPage = 1;
function walkingRoutesHandler() {
    let url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes");
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        walkingRoutes = this.response;
        renderWalkingRoutes(walkingRoutes);
        maxPage = Math.floor(this.response.length / 10) + 1;
        renderPagination();
    };
    xhr.send();
}
function setAttributesForTooltip(cell, tooltipText) {
    cell.setAttribute("data-bs-toggle", "tooltip");
    cell.setAttribute("data-bs-placement", "top");
    cell.setAttribute("data-bs-custom-class", "custom-tooltip");
    cell.setAttribute("data-bs-title", tooltipText);
}
function renderWalkingRoutes(walkingRoutes, fromTo = [0, 9]) {
    const maxLetters = Math.floor(window.screen.width / 10);
    const walkingRoutesTbody = document.querySelector('.walking-routes-tbody');
    walkingRoutesTbody.innerHTML = "";
    for (let i = fromTo[0]; i <= fromTo[1]; i++) {
        const walkingRoute = walkingRoutes[i];
        let tableRow = document.createElement("tr");
        let rowName = document.createElement("td");
        let rowDescription = document.createElement("td");
        let rowMainObjects = document.createElement("td");
        let rowSelect = document.createElement("td");
        rowName.textContent = walkingRoute.name.length <= maxLetters ? walkingRoute.name : walkingRoute.name.slice(0, maxLetters) + "...";
        rowDescription.textContent = walkingRoute.description.length <= maxLetters ? walkingRoute.description : walkingRoute.description.slice(0, maxLetters) + "...";
        rowMainObjects.textContent = walkingRoute.mainObject.length <= maxLetters ? walkingRoute.mainObject : walkingRoute.mainObject.slice(0, maxLetters) + "...";
        rowSelect.innerHTML = `<button type="button" class="id-${walkingRoute.id} btn btn-walking-route btn-outline-success px-5" onclick="location.href='#pagination-walking-routes';">Выбрать</button>`;
        setAttributesForTooltip(rowName, walkingRoute.name);
        setAttributesForTooltip(rowDescription, walkingRoute.description);
        setAttributesForTooltip(rowMainObjects, walkingRoute.mainObject);
        tableRow.appendChild(rowName);
        tableRow.appendChild(rowDescription);
        tableRow.appendChild(rowMainObjects);
        tableRow.appendChild(rowSelect);
        walkingRoutesTbody.appendChild(tableRow);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
function renderPagination(fromTo = [1, 3]) {
    let pageOfPages = document.getElementsByClassName("page-of-pages")[0];
    pageOfPages.innerHTML = `Страница ${currentPage} из ${maxPage}`;
    let pagination = document.getElementsByClassName("pagination")[0];
    pagination.innerHTML = "";
    let previous = document.createElement("li");
    previous.classList.add("page-item", "previous-btn");
    previous.innerHTML = '<a class="page-link page-previous" href="#walking-routes">Предыдущая</a>';
    pagination.appendChild(previous);
    for (let page = fromTo[0]; page < fromTo[1] + 1; page++) {
        let pg = document.createElement("li");
        pg.classList.add("page-item");
        pg.innerHTML = `<a class="page-link page-${page}" href="#walking-routes">${page}</a>`;
        pagination.appendChild(pg);
    }
    let next = document.createElement("li");
    next.classList.add("page-item", "next-btn");
    next.innerHTML = '<a class="page-link page-next" href="#walking-routes">Следующая</a>';
    pagination.appendChild(next);
}
function addLanguages() {
    let lng = [];
    const languageDropdownMenu = document.querySelector('#language-dropdown-menu');
    languageDropdownMenu.innerHTML = '';
    for (let i = 0; i <= guides.length; i++) {
        if (!guides[i])
            return;
        if (lng.includes(guides[i].language))
            continue;
        lng.push(guides[i].language);
        let rowLanguage = document.createElement("li");
        let rowLanguageA = document.createElement("a");
        rowLanguageA.classList.add('dropdown-item', `language-${guides[i].language}`);
        rowLanguageA.innerHTML = guides[i].language;
        rowLanguage.appendChild(rowLanguageA);
        languageDropdownMenu === null || languageDropdownMenu === void 0 ? void 0 : languageDropdownMenu.appendChild(rowLanguage);
    }
}
let guides;
function renderGuides(language = "", expFrom = 0, expTo = 999) {
    const guidesTbody = document.querySelector('.guides-tbody');
    guidesTbody.innerHTML = "";
    const guidesContainer = document.getElementById('guides-container');
    guidesContainer.classList.remove('d-none');
    for (let i = 0; i <= guides.length; i++) {
        const guide = guides[i];
        let tableRow = document.createElement("tr");
        let rowPhoto = document.createElement("td");
        let rowBio = document.createElement("td");
        let rowLanguages = document.createElement("td");
        let rowExpirience = document.createElement("td");
        let rowPricePerHour = document.createElement("td");
        let rowSelect = document.createElement("td");
        if (!guide) {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
            addLanguages();
            return;
        }
        rowPhoto.innerHTML = '<i class="fa-solid fa-id-badge fa-3x"></i>';
        rowBio.textContent = guide.name;
        rowLanguages.textContent = guide.language;
        rowExpirience.textContent = String(guide.workExperience);
        rowPricePerHour.textContent = String(guide.pricePerHour);
        rowSelect.innerHTML = `<button type="button" class="id-${guide.id} btn btn-guides btn-outline-primary px-5" data-bs-toggle="modal" data-bs-target="#application-formalization-modal">Выбрать</button>`;
        setAttributesForTooltip(rowBio, guide.name);
        setAttributesForTooltip(rowLanguages, guide.language);
        setAttributesForTooltip(rowExpirience, String(guide.workExperience));
        setAttributesForTooltip(rowPricePerHour, String(guide.pricePerHour));
        tableRow.appendChild(rowPhoto);
        tableRow.appendChild(rowBio);
        tableRow.appendChild(rowLanguages);
        tableRow.appendChild(rowExpirience);
        tableRow.appendChild(rowPricePerHour);
        tableRow.appendChild(rowSelect);
        if (!language) {
            if (expFrom <= guide.workExperience) {
                if (expTo >= guide.workExperience)
                    guidesTbody.appendChild(tableRow);
            }
        }
        else if (guide.language.toLowerCase().includes(language)) {
            if (expFrom <= guide.workExperience) {
                if (expTo >= guide.workExperience)
                    guidesTbody.appendChild(tableRow);
            }
        }
    }
}
function pageBtnHandler(event) {
    const target = event.target;
    const page = target.classList[1].slice(5);
    let fromTo;
    if (Number.isNaN(Number(page))) { // previous or next btn
        if (page == "previous") {
            if (currentPage == 1)
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            else {
                currentPage -= 1;
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            }
        }
        else if (page == "next") {
            if (currentPage == maxPage)
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            else {
                currentPage += 1;
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            }
        }
        else {
            console.log("Unknown pagination btn");
            fromTo = [0, 9];
        }
    }
    else {
        currentPage = Number(page);
        fromTo = [(Number(page) - 1) * 10, Number(page) * 10 - 1];
    }
    let pageOfPages = document.getElementsByClassName("page-of-pages")[0];
    pageOfPages.innerHTML = `Страница ${currentPage} из ${maxPage}`;
    if (currentPage == 1)
        renderPagination();
    else if (currentPage == maxPage)
        renderPagination([maxPage - 2, maxPage]);
    else
        renderPagination([currentPage - 1, currentPage + 1]);
    renderWalkingRoutes(walkingRoutes, fromTo);
}
function searchHandler() {
    const findRouteInput = document.getElementById('find-route-input');
    let wr = [];
    for (const route of walkingRoutes) {
        if (route.name.toLowerCase().includes(findRouteInput.value.toLowerCase())) {
            wr.push(route);
        }
    }
    renderWalkingRoutes(wr);
}
function handleEnterKey(event) {
    if (event.key === "Enter") {
        searchHandler();
    }
}
let routeId;
function walkingRouteBtnHandler(event) {
    const guideExpFromInput = document.querySelector('#guide-exp-from-input');
    const guideExpToInput = document.querySelector('#guide-exp-to-input');
    const language = document.querySelector('.language-input');
    guideExpFromInput.value = "";
    guideExpToInput.value = "";
    language.value = "";
    const target = event.target;
    routeId = Number(target.classList[0].slice(3));
    const guidesRouteName = document.querySelector('.guides-route-name');
    for (const route of walkingRoutes) {
        if (route.id == routeId) {
            guidesRouteName.innerHTML = route.name;
        }
    }
    let url = new URL(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${routeId}/guides`);
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        guides = this.response;
        renderGuides();
    };
    xhr.send();
}
let GuideId;
function GuideBtnHandler(event) {
    const target = event.target;
    GuideId = Number(target.classList[0].slice(3));
    let rt = {};
    let gd = {};
    for (const route of walkingRoutes) {
        if (route.id == routeId) {
            rt = route;
        }
    }
    for (const guide of guides) {
        if (guide.id == GuideId) {
            gd = guide;
        }
    }
    application = { walkingRoute: rt, giude: gd };
    const hoursNumber = document.querySelector('.modal-hour-input');
    const date = document.querySelector('.modal-date-input');
    const time = document.querySelector('.modal-time-input');
    const peopleCount = document.querySelector('.modal-people-count-input');
    const fast = document.querySelector('.modal-fast-checkbox');
    const transfer = document.querySelector('.modal-transfer-checkbox');
    hoursNumber.value = "";
    date.value = "";
    time.value = "";
    peopleCount.value = "";
    fast.checked = false;
    transfer.checked = false;
    applicationFormalizationHandler();
}
function applicationFormalizationHandler() {  //ф-ция для обработки заявки
    const modalBio = document.querySelector('.modal-bio');
    modalBio.innerHTML = 'ФИО гида: ' + application.giude.name;
    const modalWalkingRouteName = document.querySelector('.modal-walking-route-name');
    modalWalkingRouteName.innerHTML = 'Название маршрута: ' + application.walkingRoute.name;
}
function modalHourBtnHandler(event) {
    const target = event.target;
    const input = document.querySelector('.modal-hour-input');
    let countHours = Number(target.classList[target.classList.length - 1].slice(11));
    input.value = "";
    input.value = String(countHours);
}

