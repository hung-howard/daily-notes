class TodoEditView {
  _parentElement = document.querySelector('.draggable__title-list');

  addHandlerEdit(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();

      // ... 原有的程式碼 ...

      // 移除重複的宣告，直接使用已存在的 checkBtn
      // 將 const checkBtn = ... 改為：
      checkBtn.addEventListener('click', handleConfirm);
    });
  }
}
