/* Sorry, I didn't finich it */

var rootNode = document.getElementById("root");

// Your code goes here

let modulDynamicApi = function (structure) {
    let _baseStructure = structure,
        structureToRender = _baseStructure,
        nodeToRender = document.getElementById('root');

    function render() {
        let container = document.createElement('ul');
        container.className = 'folder';
        structureToRender.forEach(e => {
            let liWrap = document.createElement('li'),
                liContainer = document.createElement('div'),
                iconWrap = document.createElement('i'),
                folderName = document.createElement('span');

            liWrap.className = 'liWrap';
            liContainer.className = 'liContainer';

            iconWrap.className = 'material-icons';
            iconWrap.innerHTML = e.folder ? 'folder' : 'folder_open';

            folderName.className = 'folder-name';
            folderName.innerHTML = e.title;

            liWrap.appendChild(liContainer);
            liContainer.appendChild(iconWrap);
            liContainer.appendChild(folderName);

            container.appendChild(liWrap);
        });
        nodeToRender.parentElement.replaceChild(container, nodeToRender);
        nodeToRender = container;
    }

    return {
        render: render
    }
}(structure);

window.onload = function () {
    modulDynamicApi.render();
}

// rootNode.appendChild(modulDynamicApi)
