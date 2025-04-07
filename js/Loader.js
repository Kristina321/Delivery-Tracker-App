import { createElement } from './components.js';

/**
 * Класс для управления индикатором загрузки (лоадером)
 */
export default class Loader {
  /**
   * Создает экземпляр Loader
   * @param {string} [loaderId='loader'] - ID элемента лоадера
   * @param {string} [loaderClass='loader'] - CSS-класс лоадера
   * @param {number} [elementsCount=3] - Количество анимированных элементов в лоадере
   */
  /*constructor(loaderId = 'loader', loaderClass = 'loader', elementsCount = 3) {
    this.loaderId = loaderId;
    this.loaderClass = loaderClass;
    this.elementsCount = elementsCount;
    this.loaderElement = null;
  }*/
 constructor() {
  this.loaderEl = this.createLoaderEl();
 }
 createLoaderEl() {
  const loaderEl = createElement({
    tag: 'div',
    classList: 'loader',
    attributes: {
      id: 'loader',
    }
  });

  for (let i = 1; i <= 3; i++) {
    const divEl = createElement({ tag: 'div' });
    loaderEl.append(divEl);
  }

  return loaderEl;
}
  /**
   * Создает DOM-элемент лоадера
   */
  /*createLoaderEl() {
    this.loaderEl = createElement({
      tag: 'div',
      classList: this.loaderClass,
      attributes: {
        id: this.loaderId,
      }
    });

    for (let i = 1; i <= this.elementsCount; i++) {
      const divEl = createElement({ tag: 'div' });
      loaderEl.append(divEl);
    }

    return this.loaderEl;
  }*/

  /**
   * Показывает лоадер в указанном контейнере
   * @param {HTMLElement} container - Контейнер для размещения лоадера
   * @returns {HTMLElement} Элемент лоадера
   */
  renderLoader(container) {
    if (!this.loaderEl) {
      this.createLoaderEl();
    }

    container.append(this.loaderEl);
    return this.loaderEl;
  }

  /**
   * Удаляет лоадер из DOM
   */
  removeLoader() {
    if (this.loaderEl && this.loaderEl.parentNode) {
      this.loaderEl.remove();
    }
  }
}
