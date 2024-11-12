class TodoView {
  _parentElement = document.querySelector('.draggable__title-list');
  _addBtn = document.querySelector('.addItemBtn');
  _addInput = document.querySelector('.addItem__input');
  _titleBtn = document.querySelector('.addNewTitle');
  _overlay = document.querySelector('.overlay');
  _draggedItem = null;

  addHandlerAddItem(handler) {
    this._addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = this._addInput.value.trim();
      if (!text) return;

      handler(text);
      this._addInput.value = '';
    });

    this._addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = this._addInput.value.trim();

        if (!text) return;

        handler(text);
        this._addInput.value = '';
      }
    });
  }

  addHandlerAddTitle(handler) {
    this._titleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newNote = {
        id: Date.now(),
        text: '',
        isEditing: true,
      };
      handler(newNote);
    });
  }

  handleConfirm(item, handler) {
    const id = Number(item.dataset.id);
    const textElement = item.classList.contains('todo__title')
      ? item.querySelector('.title-input')
      : item.querySelector('.todo-input');
    const btnContainer = item.querySelector('.btn__container');
    const confirmBtn = item.querySelector('.checkbtn');
    const newText = item.classList.contains('todo__title')
      ? textElement.value.trim()
      : textElement.value.trim();

    if (!newText) return;

    // 更新 UI
    if (item.classList.contains('todo__title')) {
      textElement.disabled = true;
    } else {
      textElement.disabled = true;
    }

    item.classList.remove('editing');
    item.setAttribute('draggable', 'true');
    btnContainer.style.display = '';
    confirmBtn.style.display = '';
    confirmBtn.classList.add('hidden');

    // 隱藏遮罩層
    this._overlay.classList.add('hidden');

    this._addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = this._addInput.value.trim();

        if (!text) return;

        handler(text);
        this._addInput.value = '';
      }
    });

    // 調用處理器
    handler(id, newText);
  }

  // 添加取消編輯的方法
  handleCancelEdit(item) {
    const textElement = item.classList.contains('todo__title')
      ? item.querySelector('.title-input')
      : item.querySelector('.todo-input');
    const btnContainer = item.querySelector('.btn__container');
    const confirmBtn = item.querySelector('.checkbtn');

    if (item.classList.contains('todo__title')) {
      textElement.disabled = true;
      const itemDiv = item.querySelector('.item');
      if (itemDiv) {
        itemDiv.classList.remove('titleFocus');
      }
    } else {
      textElement.disabled = true;
      item.querySelector('.todo__detail').classList.remove('focus');
    }

    item.classList.remove('editing');
    item.setAttribute('draggable', 'true');
    btnContainer.style.display = '';
    confirmBtn.style.display = '';
    confirmBtn.classList.add('hidden');

    // 隱藏遮罩層
    this._overlay.classList.add('hidden');
  }

  // 添加 ESC 鍵取消編輯
  constructor() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const editingItem = this._parentElement.querySelector('.editing');
        if (editingItem) {
          this.handleCancelEdit(editingItem);
        }
      }
    });

    // 點擊外部取消 focus
    document.addEventListener('click', (e) => {
      const clickedTitle = e.target.closest('.todo__title');
      if (!clickedTitle) {
        const focusedItems =
          this._parentElement.querySelectorAll('.item.titleFocus');
        focusedItems.forEach((item) => {
          const parentLi = item.closest('.todo__title');
          if (parentLi && !parentLi.classList.contains('editing')) {
            item.classList.remove('titleFocus');
            const input = item.querySelector('.title-input');
            if (input) {
              input.disabled = true;
            }
          }
        });
      }
    });

    this._addDragListeners();
  }

  handleEdit(item) {
    const textElement = item.classList.contains('todo__title')
      ? item.querySelector('.title-input')
      : item.querySelector('.todo-input');
    const btnContainer = item.querySelector('.btn__container');
    const confirmBtn = item.querySelector('.checkbtn');
    const titleInput = item.querySelector('.item');

    // 更新 UI
    if (!item.classList.contains('todo__title')) {
      item.querySelector('.todo__detail').classList.add('focus');
    } else {
      titleInput.classList.add('titleFocus');
    }

    item.classList.add('editing');
    item.setAttribute('draggable', 'false');
    btnContainer.style.display = 'none';
    confirmBtn.style.display = 'block';
    confirmBtn.classList.remove('hidden');

    // 設置輸入焦點
    if (item.classList.contains('todo__title')) {
      textElement.disabled = false;
      textElement.focus();
    } else {
      textElement.disabled = false;
      textElement.focus();
      textElement.select();
    }

    // 顯示遮罩層並添加點擊事件
    this._overlay.classList.remove('hidden');
    this._overlay.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        const editingItem = this._parentElement.querySelector('.editing');
        if (editingItem) {
          this.handleCancelEdit(editingItem);
        }
      },
      { once: true }
    ); // 確保事件只觸發一次
  }

  addHandlerEdit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target.closest('.fa-pen, .checkbtn');
      if (!btn) return;

      const item = btn.closest('.todo, .todo__title');
      if (!item) return;

      // 根據按鈕類型執行相應操作
      if (btn.classList.contains('checkbtn')) {
        this.handleConfirm(item, handler);
      } else {
        this.handleEdit(item);
      }
    });
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target.closest('.fa-trash');
      if (!btn) return;

      const item = btn.closest('.todo, .todo__title');
      const id = Number(item.dataset.id);
      handler(id);
    });
  }

  generateMarkup(note) {
    if (note.type === 'title') {
      return `
        <li class="todo__title ${note.isEditing ? 'editing' : ''}" 
            draggable="true" 
            data-id=${note.id}>
          <span class="fa-solid fa-grip-vertical"></span>
          <div class="item ${note.isEditing ? 'titleFocus' : ''}">
            <input 
              type="text" 
              class="title-input"
              value="${note.text}"
              placeholder="輸入標題..."
              autocomplete="off"
              ${note.isEditing ? '' : 'disabled'}
            />
            <div class="btn__container">
              <button class="fa-solid fa-pen"></button>
              <button class="fa-solid fa-trash"></button>
            </div>
            <button class="fa-solid fa-check checkbtn ${
              note.isEditing ? '' : 'hidden'
            }"></button>
          </div>
        </li>
      `;
    } else {
      return `
        <li class="todo" draggable="true" data-id=${note.id}>
          <span class="fa-solid fa-grip-vertical"></span>
          <div class="todo__detail">
            <input 
              type="checkbox" 
             
            >
            <input 
              type="text" 
              class="todo-input ${note.checked ? 'done' : ''}" 
              value="${note.text}"
              disabled
            />
            <div class="btn__container">
              <button class="fa-solid fa-pen"></button>
              <button class="fa-solid fa-trash"></button>
            </div>
            <button class="fa-solid fa-check checkbtn hidden"></button>
          </div>
        </li>
      `;
    }
  }

  render(data) {
    const markup = data.map((note) => this.generateMarkup(note)).join('');
    this._parentElement.innerHTML = markup;

    // 找到正在編輯的 title
    const editingTitle = this._parentElement.querySelector(
      '.todo__title.editing'
    );
    if (editingTitle) {
      const titleInput = editingTitle.querySelector('.title-input');
      const itemDiv = editingTitle.querySelector('.item');
      const btnContainer = editingTitle.querySelector('.btn__container');
      const confirmBtn = editingTitle.querySelector('.checkbtn');

      // 設置編輯狀態的 UI
      if (titleInput) {
        titleInput.disabled = false;
        titleInput.focus();
      }
      if (itemDiv) {
        itemDiv.classList.add('titleFocus');
      }
      if (btnContainer) {
        btnContainer.style.display = 'none';
      }
      if (confirmBtn) {
        confirmBtn.style.display = 'block';
        confirmBtn.classList.remove('hidden');
      }

      // 顯示遮罩層
      this._overlay.classList.remove('hidden');
    }
  }

  addHandlerReorder(handler) {
    this._parentElement.addEventListener('reorder', (e) => {
      handler(e.detail.fromIndex, e.detail.toIndex);
    });
  }

  _addDragListeners() {
    if (!this._parentElement) return;

    this._parentElement.addEventListener(
      'dragstart',
      this._handleDragStart.bind(this)
    );
    this._parentElement.addEventListener(
      'dragend',
      this._handleDragEnd.bind(this)
    );
    this._parentElement.addEventListener(
      'dragover',
      this._handleDragOver.bind(this)
    );
    this._parentElement.addEventListener('drop', this._handleDrop.bind(this));
  }

  _handleDragStart(e) {
    const draggedItem = e.target.closest('li');
    if (!draggedItem || draggedItem.classList.contains('editing')) {
      e.preventDefault();
      return;
    }

    this._draggedItem = draggedItem;
    draggedItem.classList.add('draggable');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  }

  _handleDragEnd(e) {
    if (this._draggedItem) {
      this._draggedItem.classList.remove('draggable');
      this._parentElement.querySelectorAll('li').forEach((item) => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
      });
    }
  }

  _handleDragOver(e) {
    e.preventDefault();
    const item = e.target.closest('li');
    if (!item || item === this._draggedItem) return;

    const rect = item.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;

    if (y < height / 2) {
      item.style.borderTop = '1px solid var(--color-grey-600)';

      item.style.borderBottom = '';
    } else {
      item.style.borderBottom = '1px solid var(--color-grey-600)';
      item.style.borderTop = '';
    }
  }

  _handleDrop(e) {
    e.preventDefault();
    const dropTarget = e.target.closest('li');
    if (!dropTarget || !this._draggedItem) return;

    const rect = dropTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const insertAfter = y > height / 2;

    const items = Array.from(this._parentElement.children);
    const fromIndex = items.indexOf(this._draggedItem);
    let toIndex = items.indexOf(dropTarget);

    if (insertAfter) toIndex++;

    if (fromIndex !== toIndex) {
      this._parentElement.insertBefore(
        this._draggedItem,
        toIndex < items.length ? items[toIndex] : null
      );

      const reorderEvent = new CustomEvent('reorder', {
        detail: { fromIndex, toIndex },
      });
      this._parentElement.dispatchEvent(reorderEvent);
    }

    this._parentElement.querySelectorAll('li').forEach((item) => {
      item.style.borderTop = '';
      item.style.borderBottom = '';
    });
  }

  addHandlerToggle(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const checkbox = e.target.closest('input[type="checkbox"]');
      if (!checkbox) return;

      // 阻止事件冒泡
      e.stopPropagation();

      const item = checkbox.closest('.todo');
      if (!item) return;

      const id = Number(item.dataset.id);
      const todoInput = item.querySelector('.todo-input');

      // 手動切換 checkbox 的狀態，但不阻止默認行為
      const isChecked = checkbox.checked;

      // 直接更新 UI
      if (isChecked) {
        todoInput.classList.add('done');
      } else {
        todoInput.classList.remove('done');
      }

      // 調用 handler 來更新模型
      handler(id);
    });
  }
}

export default new TodoView();
