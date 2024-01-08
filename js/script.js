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
    let url = new URL("http://exam-2023-1-api.std-700.ist.mospolytech.ru/api/routes");
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
        rowSelect.innerHTML = `<button type="button" class="id-${walkingRoute.id} btn btn-walking-route btn-outline-primary px-5" onclick="location.href='#pagination-walking-routes';">Выбрать</button>`;
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
