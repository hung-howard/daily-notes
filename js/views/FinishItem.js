class FinishItem {
  _parentElement = document.querySelector('.finish__container');
  _progressBar = document.querySelector('#progressBar');
  _progressText = document.querySelector('.progressBar__text p:last-child');

  render(data) {
    const finishNotes = data.filter((note) => note.checked);
    const markup = finishNotes.map(this.generateMarkup).join('');
    this._parentElement.innerHTML = markup;

    this.updateProgress(data);
  }

  generateMarkup(note) {
    return `
         <li class="finish__item" data-id = ${note.id}>
            <label class="done">${note.text}</label>
             <div>
                <button class="fas fa-rotate-left resetBtn" />
             </div>
          </li>
    `;
  }

  updateProgress(data) {
    const total = data.filter((note) => note.type === 'item').length;
    const finished = data.filter((note) => note.checked).length;

    this._progressBar.value = (finished / total) * 100;

    this._progressText.textContent = `${finished}/${total}`;
  }

  addHandlerReset(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const resetBtn = e.target.closest('.resetBtn');
      if (!resetBtn) return;

      const item = resetBtn.closest('.finish__item');
      if (!item) return;

      const id = +item.dataset.id;
      handler(id);
    });
  }
}

export default new FinishItem();
