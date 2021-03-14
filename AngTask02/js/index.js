function getPath(element) {

    if(!element) {
        console.log("Не передан элемент!")
        return;
    }

    let parents = [];
    let curElement = element;
    while (curElement.parentElement) {
        curElement = curElement.parentElement;
        parents.push(curElement.tagName);
    }
    let elParentsStr = parents.reverse().join(' ');
    if(elParentsStr.trim() !== '') {
        elParentsStr += ' ';
    }

    let elIdStr = Array.from(element.attributes)
        .filter(a => { return a.specified && a.nodeName === 'id'; })
        .map(a => { return '#' + a.textContent; })
        .join('');

    let elClassesStr = Array.from(element.attributes)
        .filter(a => { return a.specified && a.nodeName === 'class'; })
        .map(a => { return '.' + (a.textContent || '').replace(/\s/g, '.'); })
        .join('');

    let elAttributesStr = Array.from(element.attributes)
        .filter(a => { return a.specified && a.nodeName !== 'id' && a.nodeName !== 'class'; })
        .map(a => { return "[" + a.nodeName + "='" + a.textContent + "']"; })
        .join('');

    const createdSelector = elParentsStr + elIdStr + elClassesStr + elAttributesStr;
    console.log('Селектор: ' + createdSelector);

    const foundNode_all = document.querySelectorAll(createdSelector);
    const foundNode = document.querySelector(createdSelector);

    if(foundNode_all.length == 1 && foundNode_all[0] == foundNode) {
        console.log('Найдена одинаковая нода!')
    }
}

getPath(document.querySelector('#first'));
getPath(document.querySelector('#second'));
