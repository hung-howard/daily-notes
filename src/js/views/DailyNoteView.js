class DailyNoteView {
  _saveBtn = document.querySelector('.saveBtn');
  _parentElement = document.querySelector('.scroll__container');
  _dialog = document.querySelector('dialog');

  addHandlerSave(handler) {
    this._saveBtn.addEventListener('click', (e) => {
      e.preventDefault();

      //獲取 dialog 中的 textarea
      const experience = document.querySelector(
        '.dialog__container .addExperience'
      ).value;

      handler(experience);

      this._dialog.close();
    });
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      const removeBtn = e.target.closest('.fa-trash');

      if (!removeBtn) return;

      const content = removeBtn.closest('.content');
      const date = content.querySelector('.date').textContent;

      handler(date);
    });
  }

  addHandlerEdit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      const editBtn = e.target.closest('.fa-pen');

      if (!editBtn) return;

      const content = editBtn.closest('.content');
      const date = content.querySelector('.date');
      const textarea = content.querySelector('.addExperience');
      const saveBtnContainer = content.querySelector('.savBtn__container');

      //處理 textarea 屬性
      textarea.readOnly = false;
      textarea.classList.add('textarea-focus');
      textarea.focus();

      //顯示Btn
      saveBtnContainer.classList.remove('hidden');

      handler(date, textarea);
    });
  }

  addHandleSaveEdit() {
    this._parentElement.addEventListener('click', (e) => {
      const saveEditBtn = e.target.closest('.saveEditBtn');

      if (!saveEditBtn) return;

      const content = saveEditBtn.closest('.content');
      const date = content.querySelector('.date');
      const textarea = content.querySelector('.addExperience');
      const saveBtnContainer = content.querySelector('.savBtn__container');

      //UI
      textarea.readOnly = true;
      textarea.classList.remove('textarea-focus');
      saveBtnContainer.classList.add('hidden');

      handler(date, textarea);
    });
  }

  addHandleCancel() {
    this._parentElement.addEventListener('click', (e) => {
      const cancelBtn = e.target.closest('.cancelBtn');

      if (!cancelBtn) return;

      const content = cancelBtn.closest('.content');
      const textarea = content.querySelector('.addExperience');
      const saveBtnContainer = content.querySelector('.savBtn__container');

      textarea.value = textarea.dataset.originalContent;

      //UI
      textarea.readOnly = true;
      textarea.classList.remove('textarea-focus');
      saveBtnContainer.classList.add('hidden');
    });
  }

  _generateCompletedTasksMarkup(tasks) {
    // 確保只渲染 checked 為 true 且 type 為 'item' 的任務
    const completedTasks = tasks.filter(
      (task) => task.checked && task.type === 'item'
    );

    return completedTasks
      .map(
        (task) => `
        <li class="finish__note">
          <i class="fa-solid fa-circle"></i>
          <p>${task.text}</p>
        </li>
      `
      )
      .join(''); // 不要忘記 join，否則會出現逗號
  }

  _generateMarkup(data) {
    return `
      <div class="content">
            <div class="dailyNote__head">
              <div class="title">
                <h1>今日回顧</h1>
                <p class="date">${data.date}</p>
              </div>
              <div class="dailyNote__Btn">
                <button class="fa-solid fa-pen"></button>
                <button class="fa-solid fa-trash"></button>
              </div>
            </div>
            <div class="finishNote">
              <textarea 
                class="addExperience"
                readonly 
                
              >${data.experience || ''}</textarea>
              <h3>今日完成事項</h3>
              <ul class="finish__List">
                ${this._generateCompletedTasksMarkup(data.notes)}
              </ul>
            </div>
            <div class="savBtn__container hidden">
              <button class='cancelBtn'>取消</button>
              <button class='saveEditBtn'>儲存</button>
            </div>
    `;
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    const markup = this._generateMarkup(data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new DailyNoteView();
