const data = [
  {
    folder: true,
    title: 'Grow',
    children: [
      {
        title: 'logo.png'
      },
      {
        folder: true,
        title: 'English',
        children: [
          {
            title: 'Present_Perfect.txt'
          }
        ]
      }
    ]
  },
  {
    folder: true,
    title: 'Soft',
    children: [
      {
        folder: true,
        title: 'NVIDIA',
        children: null
      },
      {
        title: 'nvm-setup.exe'
      },
      {
        title: 'node.exe'
      }
    ]
  },
  {
    folder: true,
    title: 'Doc',
    children: [
      {
        title: 'project_info.txt'
      }
    ]
  },
  {
    title: 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

// TODO: your code goes here
let mapped = [
  {
    id: getRandom(),
    folder: true,
    renaming: false,
    title: 'Grow',
    children: [
      {
        id: getRandom(),
        title: 'logo.png'
      },
      {
        id: getRandom(),
        folder: true,
        title: 'English',
        children: [
          {
            id: getRandom(),
            title: 'Present_Perfect.txt'
          }
        ]
      }
    ]
  },
  {
    id: getRandom(),
    folder: true,
    title: 'Soft',
    children: [
      {
        id: getRandom(),
        folder: true,
        title: 'NVIDIA',
        children: null
      },
      {
        id: getRandom(),
        title: 'nvm-setup.exe'
      },
      {
        id: getRandom(),
        title: 'node.exe'
      }
    ]
  },
  {
    id: getRandom(),
    folder: true,
    title: 'Doc',
    children: [
      {
        id: getRandom(),
        title: 'project_info.txt'
      }
    ]
  },
  {
    id: getRandom(),
    title: 'credentials.txt'
  }
];

let lastClicked = null;
const menu = createMenu();

function treeView() {
  removeAllChildNodes(rootNode);
  rootNode.appendChild(menu);
  let newUl = document.createElement('ul');
  newUl.setAttribute('id', 'list');
  rootNode.append(newUl);

  iterateOverState([{ elements: mapped, node: newUl }]);
}
treeView();

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getRandom() {
  return Math.floor(Math.random() * 100000000000);
}

function iterateOverState(config) {
  let children = [];
  for(let i = 0; i < config.length; i++) {
    for(let j = 0; j < config[i].elements.length; j++) {
      const el = config[i].elements[j];
      let node = null;
      if (el.folder) {
        node = createFolder(el);
      } else {
        node = createFile(el);
      }
      el.nodeRef = node;
      config[i].node.appendChild(node);
      if (el.children) {
        children.push({ elements: el.children, node: node.lastChild });
      }
    }
  }
  if (children.length !== 0) {
    return iterateOverState(children);
  }
}


function createFolder(element) {
  const listElement = document.createElement('li');
  listElement.classList.add('folder');
  const span = document.createElement('span');
  span.innerHTML = element.title;

  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('folder');
  icon.innerHTML = element.isOpened ? 'folder_open' : 'folder';

  const wrapper = document.createElement('div');
  wrapper.appendChild(icon);
  wrapper.appendChild(span);
  wrapper.addEventListener('click', () => setOpenedState(element.id, !element.isOpened, [mapped]));

  const children = document.createElement('ul');
  const openedClass = element.isOpened ? 'active' : 'nested';
  children.classList.add(openedClass);

  if (element.children === null || element.children.length === 0) {
    const empty = document.createElement('li');
    empty.innerHTML = 'Folder is empty';
    empty.classList.add('empty');
    children.appendChild(empty);
  }

  span.addEventListener('contextmenu', (ev) => {
    showMenu(ev);
    lastClicked = element;
  });

  span.addEventListener('blur', () => {
    renameElement(element.id, span.innerHTML, [mapped]);
  });

  listElement.appendChild(wrapper);
  listElement.appendChild(children);
  return listElement;
}

function createFile(element) {
  const fileElement = document.createElement('li');
  fileElement.classList.add('file');
  const span = document.createElement('span');
  span.classList.add('file');
  span.innerHTML = element.title;

  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.innerHTML = 'insert_drive_file';

  span.addEventListener('contextmenu', (ev) => {
    showMenu(ev);
    lastClicked = element;
  });

  span.addEventListener('blur', () => {
    renameElement(element.id, span.innerHTML, [mapped]);
  })

  fileElement.appendChild(icon);
  fileElement.appendChild(span);
  return fileElement;
}

function setOpenedState(id, isOpened, state) {
  let children = [];
  for(let i = 0; i < state.length; i++) {
    for(let j = 0; j < state[i].length; j++) {
      const el = state[i][j];
      if (el.folder && el.id === id) {
        el.isOpened = isOpened;
        treeView();
        return;
      }
      if (el.children) {
        children.push(el.children);
      }
    }
  }
  if (children.length !== 0) {
    return setOpenedState(id, isOpened, children);
  }
}

function deleteElement(id, state) {
  let children = [];
  for(let i = 0; i < state.length; i++) {
    for(let j = 0; j < state[i].length; j++) {
      const el = state[i][j];
      if (el.id === id) {
        state[i].splice(j, 1);
        treeView();
        return;
      }
      if (el.children) {
        children.push(el.children);
      }
    }
  }
  if (children.length !== 0) {
    return deleteElement(id, children);
  }
}

function renameElement(id, newTitle, state) {
  let children = [];
  for(let i = 0; i < state.length; i++) {
    for(let j = 0; j < state[i].length; j++) {
      const el = state[i][j];
      if (el.id === id) {
        el.title = newTitle;
        treeView();
        return;
      }
      if (el.children) {
        children.push(el.children);
      }
    }
  }
  if (children.length !== 0) {
    return renameElement(id, newTitle, children);
  }
}

function createMenu() {
  const menuUlElement = document.createElement('ul');
  menuUlElement.classList.add('menu');
  const renameMenu = document.createElement('li');
  renameMenu.classList.add('rename');
  renameMenu.innerHTML = 'Rename';
  const deleteMenu = document.createElement('li');
  deleteMenu.classList.add('delete');
  deleteMenu.innerHTML = 'Delete item';
  menuUlElement.appendChild(renameMenu);
  menuUlElement.appendChild(deleteMenu);
  deleteMenu.addEventListener('click', () => {
    if (lastClicked) {
      deleteElement(lastClicked.id, [mapped]);
      treeView();
    }
  })
  renameMenu.addEventListener('click', () => {
    if (lastClicked) {
      const edit = lastClicked.nodeRef.getElementsByTagName('span')[0];
      edit.contentEditable = true;
      edit.focus();
      makeSelection(edit);
    }
  })
  document.body.addEventListener('click', () => {
    hideMenu();
    lastClicked = null;
  });
  document.body.addEventListener('contextmenu', (ev) => {
    showMenu(ev);
  })
  return menuUlElement;
}

function makeSelection(selectedElement) {
  const range = document.createRange();
  const lastIndex = selectedElement.innerHTML.lastIndexOf('.');
  const maxRange = lastIndex !== -1 ? lastIndex : selectedElement.innerHTML.length;
  range.setStart(selectedElement.firstChild, 0);
  range.setEnd(selectedElement.firstChild, maxRange);
  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
}

function showMenu(ev) {
  if (ev.target.id === 'list' || ev.target === document.body) {
    menu.classList.add('menu-disabled');
  } else {
    menu.classList.remove('menu-disabled');
  }
  ev.preventDefault();
  menu.style.top = ev.pageY + 'px';
  menu.style.left = ev.pageX + 'px';
  menu.style.display = 'block';
}

function hideMenu() {
  menu.style.display = 'none';
  menu.style.top = '-200%';
  menu.style.left = '-200%';
}
