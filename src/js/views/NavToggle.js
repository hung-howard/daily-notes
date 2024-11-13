class NavToggle {
  _todoSection = document.querySelector('.task__container');
  _dailyNoteSection = document.querySelector('.dailyNote');
  _switchTabs = document.querySelector('.switch-tabs');
  _tabs = document.querySelectorAll('.tab');

  constructor() {
    this._initializeView();
  }

  _initializeView() {
    // 初始化時顯示待辦事項，隱藏每日回顧
    this._todoSection.classList.remove('hidden');
    this._dailyNoteSection.classList.add('hidden');

    // 設置初始 tab 狀態
    this._tabs.forEach((tab) => {
      if (tab.textContent === '待辦事項') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  addHandlerToggle(handler) {
    this._switchTabs.addEventListener('click', handler);
  }

  toggleSections(clickedTab) {
    // 更新 tab 狀態
    this._tabs.forEach((tab) => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    // 切換區段顯示
    if (clickedTab.textContent === '待辦事項') {
      this._dailyNoteSection.classList.add('hidden');
      this._todoSection.classList.remove('hidden');
    } else if (clickedTab.textContent === '每日回顧') {
      this._todoSection.classList.add('hidden');
      this._dailyNoteSection.classList.remove('hidden');
    }
  }
}

export default new NavToggle();
