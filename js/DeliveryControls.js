import { createElement } from './components.js';
import { validateRequired } from './validate.js';
import EditDelivery from './EditDelivery.js';

/**
 * Класс для управления отображением и расчетом доставок
 * Отвечает за создание UI-элементов для расчета и отображения общего расстояния доставок
 */
export default class DeliveryControls {
  /**
   * Создает экземпляр DeliveryControls
   * @param {EditDelivery[]} deliveryArr - Массив экземпляров доставок для расчета
   */
  constructor(deliveryArr) {
    validateRequired(deliveryArr, 'Deliveries array')

    this.deliveryArr = deliveryArr;
    this.totalDistance = 0;
    this.distancePanelEl = this.buildCalculateDistancePanelEl();
  }

  /**
   * Создает основную панель для кнопки и результата расчета
   */
  buildCalculateDistancePanelEl() {
    const distancePanelEl = this.createCalculateDistancePanelEl();
    this.calculateDistanceButtonEl = this.createCalculateDistanceButtonEl();
    this.resultCalculateEl = this.createResultCalculateEl();

    distancePanelEl.append(this.calculateDistanceButtonEl, this.resultCalculateEl);

    return distancePanelEl;
  }

  /**
   * Создает контейнер для элементов управления расчетом
   */
  createCalculateDistancePanelEl() {
    return createElement({
      tag: 'div',
      classList: 'calculate-panel'
    })
  }

  /**
   * Создает кнопку для запуска расчета расстояния
   */
  createCalculateDistanceButtonEl() {
    return createElement({
      tag: 'button',
      classList: 'calculate-panel__btn',
      text: 'Общее расстояние',
      attributes: {
        id: 'calculate-distance-btn',
        type: 'button',
      },
      events: {
        click: (e) => this.handlerButtonForTotalDistance(e)
      }
    });
  }

  /**
   * Создает элемент для отображения результата расчета
   */
  createResultCalculateEl() {
    return createElement({
      tag: 'output',
      classList: 'calculate-panel__result',
      attributes: {
        id: 'distance-result'
      }
    })
  }

  /**
  * Показывает результат расчёта с заданным текстом
  * @param {string} text - Текст для отображения
  */
  showResult(text) {
    this.resultCalculateEl.textContent = text;
    this.resultCalculateEl.style.display = 'block';
  }

  /**
  * Сбрасывает состояние результата
  */
  resetResult() {
    this.resultCalculateEl.textContent = '';
    this.resultCalculateEl.style.display = 'none';
  }

  /**
   * Обработчик клика по кнопке расчета расстояния
   * @param {Event} e - Событие клика
   */
  handlerButtonForTotalDistance(e) {
    e.preventDefault();
    this.resetResult();

    try {
      this.totalDistance = EditDelivery.getTotalDistance(this.deliveryArr);
      this.showResult(`Общее расстояние: ${this.totalDistance} км`)
    } catch (error) {
      this.showResult('Не получилось посчитать, попробуйте ещё раз')
      console.error(error);
    }
  }
}
