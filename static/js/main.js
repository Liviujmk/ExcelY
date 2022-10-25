// create input element for each truck
const form = document.querySelector('form');
const loadingDivContainer = document.querySelector('.loadings');
const unloadingDivContainer = document.querySelector('.unloadings');
const addLoadingBtn = document.querySelector('#addLoad');
const addUnloadingBtn = document.querySelector('#addUnload');
const data_loading = document.querySelector('[data-loadings]');
const data_unloading = document.querySelector('[data-unloadings]');
const loadingsNr = document.getElementById('loadingsNr');
const unloadingsNr = document.getElementById('unloadingsNr');
let loadCount = 1;
let unloadCount = 1;
// create input element for each truck

function addLoading() {
    loadCount++
    const load = document.createElement('div');
    load.classList.add('load');
    load.innerHTML = `
        <input type="text" name="loadCompany${loadCount}" placeholder="Loading com ${loadCount}">
        <input type="text" name="loadAddress${loadCount}" placeholder="Loading address ${loadCount}">
    `
    loadingDivContainer.append(load);
    data_loading.setAttribute('data-loadings', loadCount);
    loadingsNr.setAttribute('value', loadCount);
}

function addUnloading() {
    unloadCount++
    const unload = document.createElement('div');
    unload.classList.add('unload');
    unload.innerHTML = `
        <input type="text" name="unloadCompany${unloadCount}" placeholder="Unloading com ${unloadCount}">
        <input type="text" name="unloadAddress${unloadCount}" placeholder="Unloading adress ${unloadCount}">
    `
    unloadingDivContainer.append(unload);
    data_unloading.setAttribute('data-unloadings', unloadCount);
    unloadingsNr.setAttribute('value', unloadCount);
}

addLoadingBtn.addEventListener('click', addLoading);
addUnloadingBtn.addEventListener('click', addUnloading);

