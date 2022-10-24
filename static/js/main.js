// create input element for each truck
const form = document.querySelector('form');
const loadingDivContainer = document.querySelector('.loadings');
const unloadingDivContainer = document.querySelector('.unloadings');
const addLoadingBtn = document.querySelector('.add-loading');
const addUnloadingBtn = document.querySelector('.add-unloading');
const loadCount = 1;
const unloadCount = 1;
// create input element for each truck

function addLoading() {
    loadCount++
    const load = `
    <div class="load">
        <input type="text" name="loadCompany${loadCount}" placeholder="Loading Place" value="loadcom${loadCount}">
        <input type="text" name="loadAddress${loadCount}" placeholder="Loading Place" value="loadaddr${loadCount}">
    </div>
    `
    loadingDivContainer.appendChild(load);
}

function addUnloading() {
    unloadCount++
    const unload = `
    <div class="unload">
        <input type="text" name="unloadCompany${unloadCount}" placeholder="Unloading Place" value="unloadcom${unloadCount}">
        <input type="text" name="unloadAddress${unloadCount}" placeholder="Unloading Place" value="unloadaddr${unloadCount}">
    </div>
    `
    unloadingDivContainer.appendChild(unload); 
}
