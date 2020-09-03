var filterList = [];

displayFilterInFilterBar = filter => {
    let filterBar = document.querySelector('.filter__labels');
    let html = `<div class="filter__labels--label" id="${filter}">
                    <div class="filter__labels--label-text">${filter}</div>
                    <img src="./images/icon-remove.svg" alt="remove" class="filter__labels--label-remove" onclick="removeFilter('${filter}')">
                </div>`;
    filterBar.insertAdjacentHTML('afterbegin', html); 
}

addFilterToList = filter => {
    for (let i = 0; i < filterList.length; i++) {
        if (filterList[i] == filter) {
            return null;
        }
    }
    filterList.push(filter);
    displayFilterInFilterBar(filter);
}

toggleFilterBar = () => {
    let filterBarStyle = document.querySelector('.filter').style;
    filterList.length ? filterBarStyle.display = 'flex' : filterBarStyle.display = 'none';
}

displayResult = filter => {
    filter = filter.toLowerCase();
    let items = document.querySelectorAll('.item');
    
    items.forEach( item => {
        if (item.dataset.role.includes(filter)) {
            item.style.display = 'flex';
        }
        else if (item.dataset.level.includes(filter)) {
            item.style.display = 'flex';
        }
        else if (item.dataset.languages && item.dataset.languages.includes(filter)) {
            item.style.display = 'flex';
        }
        else if (item.dataset.tools && item.dataset.tools.includes(filter)) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    });
}

addFilter = filter => {
    addFilterToList(filter);
    toggleFilterBar();
    displayResult(filter);
}

displayAllItems = () => {
    let allItems = document.querySelectorAll('.item');
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].style.display = 'flex';
    }
}

emptyFilterList = () => {
    filterList = [];
    document.querySelector('.filter').innerHTML = `<div class="filter__labels">&nbsp;</div>
                                                   <div class="filter__clear" onclick="emptyFilterList()">Clear</div>`;
    toggleFilterBar();
    displayAllItems();
}

removeItemFromList = filter => {
    let index = filterList.indexOf(filter);
    if (filterList.length > 1) {
        filterList.splice(index, 1);
        displayResult(filterList[filterList.length - 1]);
    }
    else {
        filterList.splice(index, 1);
        toggleFilterBar();
        displayAllItems();
    }
}

removeFilter = filter => {
    removeItemFromList(filter);
    document.querySelector(`#${filter}`).remove();
}