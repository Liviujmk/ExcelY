// create input element for each truck
const form = document.querySelector('form');
const loadingDivContainer = document.querySelector('.loadings');
const unloadingDivContainer = document.querySelector('.unloadings');
const addLoadingBtn = document.querySelector('#addLoad');
const addUnloadingBtn = document.querySelector('#addUnload');
let loadCount = 1;
let unloadCount = 1;
// create input element for each truck

function addLoading() {
    loadCount++
    const load = document.createElement('div');
    load.classList.add('load');
    load.innerHTML = `
        <input type="text" name="loadCompany${loadCount}" placeholder="Loading Place" value="loadcom${loadCount}">
        <input type="text" name="loadAddress${loadCount}" placeholder="Loading Place" value="loadaddr${loadCount}">
    `
    loadingDivContainer.append(load);
}

function addUnloading() {
    unloadCount++
    const unload = document.createElement('div');
    unload.classList.add('unload');
    unload.innerHTML = `
        <input type="text" name="unloadCompany${unloadCount}" placeholder="Unloading Place" value="unloadcom${unloadCount}">
        <input type="text" name="unloadAddress${unloadCount}" placeholder="Unloading Place" value="unloadaddr${unloadCount}">
    `
    unloadingDivContainer.append(unload);
}

addLoadingBtn.addEventListener('click', addLoading);
addUnloadingBtn.addEventListener('click', addUnloading);