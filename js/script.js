var filterList = [];
var items = document.querySelectorAll('.item');

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

toggleAllItems = style => {
    items.forEach( item => {
        item.style.display = style;
    })
}

emptyFilterList = () => {
    filterList = [];
    document.querySelector('.filter').innerHTML = `<div class="filter__labels">&nbsp;</div>
                                                   <div class="filter__clear" onclick="emptyFilterList()">Clear</div>`;
    toggleFilterBar();
    toggleAllItems('flex');
}

pushFilteredItems = (arr, filter) => {
    let temp = [];

    arr.forEach( item => {
        if (item.dataset.role.includes(filter)) {
            temp.push(item);
        }
        else if (item.dataset.level.includes(filter)) {
            temp.push(item);
        }
        else if (item.dataset.languages && item.dataset.languages.includes(filter)) {
            temp.push(item);
        }
        else if (item.dataset.tools && item.dataset.tools.includes(filter)) {
            temp.push(item);
        }
    });
    return temp;
}

filterResult = () => {
    let result = [];

    for (let i = 0; i < filterList.length; i++) {
        if (i == 0) {
            result = pushFilteredItems(items, filterList[i].toLowerCase());
        }
        result = pushFilteredItems(result, filterList[i].toLowerCase());
    }
    return result;
}

displayFilteredItems = result => {
    toggleAllItems('none');

    result.forEach( item => {
        item.style.display = 'flex';
    });
}

addFilter = filter => {
    addFilterToList(filter);
    toggleFilterBar();
    displayFilteredItems(filterResult());
}

removeItemFromList = filter => {
    let index = filterList.indexOf(filter);

    if (filterList.length > 1) {
        filterList.splice(index, 1);
        displayFilteredItems(filterResult());
    }
    else {
        filterList.splice(index, 1);
        toggleFilterBar();
        toggleAllItems('flex');
    }
}

removeFilter = filter => {
    removeItemFromList(filter);
    document.querySelector(`#${filter}`).remove();
}