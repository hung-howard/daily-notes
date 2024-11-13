class TabChange {
  _parentElement = document.querySelector('.switch-tabs');
  _tabs = document.querySelectorAll('.tab');
  _taskContainer = document.querySelector('.task__container');
  _dailyNote = document.querySelector('.dailyNote');

  constructor() {
    this._addHandlerTabChange();
  }

  _addHandlerTabChange() {
    this._tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // 移除所有 tab 的 active class
        this._tabs.forEach((t) => t.classList.remove('active'));

        // 為當前點擊的 tab 添加 active class
        tab.classList.add('active');

        // 切換 slide-right class 和內容顯示
        if (index === 1) {
          this._parentElement.classList.add('slide-right');
          this._taskContainer.classList.add('hidden');
          this._dailyNote.classList.remove('hidden');
        } else {
          this._parentElement.classList.remove('slide-right');
          this._taskContainer.classList.remove('hidden');
          this._dailyNote.classList.add('hidden');
        }
      });
    });
  }
}

export default new TabChange();
