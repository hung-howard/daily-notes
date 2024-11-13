class Dialog {
  _closeBtn = document.querySelector('.xmark');
  _reviewBtn = document.querySelector('.reviewBtn');
  _parentElement = document.querySelector('.finish__List');
  _date = document.querySelector('.date');

  constructor() {
    this._dialog = document.querySelector('dialog');

    this._setDate();

    // 添加點擊外部關閉的監聽器
    this._dialog.addEventListener('click', (e) => {
      // 檢查點擊是否在 dialog 元素本身（而不是其內容）
      const dialogDimensions = this._dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this._dialog.close();
      }
    });
  }

  _setDate() {
    this._parentElement.innerHTML = '';
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份從0開始，需要+1
    const day = String(now.getDate()).padStart(2, '0');

    this._date.textContent = `${year}/${month}/${day}`;
  }

  addHandlerOpen(handler) {
    this._reviewBtn.addEventListener('click', () => {
      this._dialog.showModal();
      this.render(handler);
    });
  }

  addHandlerClose() {
    this._closeBtn.addEventListener('click', () => {
      this._dialog.close();
      this._parentElement.innerHTML = '';
    });
  }

  _generateMarkup(note) {
    return `
         <li class="finish__note" >
                <i class="fa-solid fa-circle"></i>
                <p>${note.text}</p>
              </li>
    `;
  }

  render(data) {
    if (!data) return;

    this._parentElement.innerHTML = '';

    const finishedItem = data.filter((note) => note.checked);
    const markup = finishedItem
      .map((note) => this._generateMarkup(note))
      .join('');

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new Dialog();
