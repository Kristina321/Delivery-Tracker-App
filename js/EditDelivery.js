import { createElement } from './components.js';
import Delivery from './DeliveryCard.js';
import Loader from './Loader.js';

/**
 * Класс расширяющий базовый Delivery, добавляющий функционал редактирования
 * и управления статусами доставки
 */
export default class EditDelivery extends Delivery {
  _status = '';

  /**
   * Доступные статусы доставки
   */
  static Statuses = {
    DELIVERY: 'delivery',
    DELIVERED: 'delivered',
    CANCELED: 'canceled'
  };

  /**
  * Рассчитывает суммарное расстояние всех доставок, исключая отмененные
  * @param {EditDelivery[]} deliveries - Массив экземпляров доставок
  */
  static getTotalDistance(deliveries) {
    if (!Array.isArray(deliveries)) {
      throw new TypeError('Parameter should be an array of deliveries');
    }

    if (deliveries.some(item => !(item instanceof EditDelivery))) {
      throw new TypeError('All array elements must be instances of EditDelivery');
    }

    return deliveries.filter(delivery => delivery.status !== this.Statuses.CANCELED)
      .reduce((total, delivery) => {
        const distance = +delivery.distance;
        if (isNaN(distance)) {
          throw new TypeError(`Invalid distance value: ${delivery.distance}`);
        }
        return total + distance;
      }, 0);
  }

  /**
   * Создает экземпляр редактируемой карточки доставки
   * @param {string} name - Имя клиента
   * @param {string} address - Адрес доставки
   * @param {number} distance - Расстояние доставки в км
   * @param {string} [status=EditDelivery.Statuses.DELIVERY] - Статус доставки
   */
  constructor(name, address, distance, status = EditDelivery.Statuses.DELIVERY) {
    super(name, address, distance);
    this.status = status;
  }

  /**
   * Создает DOM-элемент карточки с добавленной кнопкой редактирования
   */
  createCardElement() {
    this.clientCardEl = super.createCardElement();
    this.editButtonEl = this.createEditButtonEl();

    this.styledCardEl();

    this.clientCardEl.append(this.editButtonEl);

    return this.clientCardEl;
  }

  /**
   * Создает кнопку для редактирования карточки
   */
  createEditButtonEl() {
    return createElement({
      tag: 'button',
      classList: 'delivery-card__btn',
      text: 'Изменить',
      attributes: {
        type: 'button',
      },
      events: {
        click: async () => await this.handlerEditButton(this)
      }
    })
  }

  /**
   * Применяет стили к карточке в зависимости от текущего статуса
   */
  styledCardEl() {
    const { DELIVERED, CANCELED } = EditDelivery.Statuses;
    // Добавляем/удаляем классы в зависимости от статуса
    this.clientCardEl.classList.toggle('delivery-card--delivered', this.status === DELIVERED);
    this.clientCardEl.classList.toggle('delivery-card--canceled', this.status === CANCELED);
  }

  /**
   * Обрабатывает клик по кнопке редактирования
   * @param {EditDelivery} instance - Экземпляр текущего класса
   */
  async handlerEditButton(instance) {
    const app = document.querySelector('#app');
    const loader = new Loader();
    loader.renderLoader(app);

    try {
      const [validateModule, popupModule] = await Promise.all([
        import('./validate.js'),
        import('./Popup.js')
      ]);

      const popup = new popupModule.default(instance); // Создаем и открываем попап редактирования
      popup.openPopup(app);

      validateModule.validateForm(popup.form.formEl); // Применяем валидацию к форме попапа
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    } finally {
      loader.removeLoader(); // Всегда убираем индикатор загрузки
    }
  }

  /**
   * Сеттер для статуса с валидацией
   * @param {string} value - Новое значение статуса
   */
  set status(value) {
    // Проверяем, что значение есть в списке допустимых статусов
    if (!Object.values(EditDelivery.Statuses).some(status => status === value)) {
      throw new Error(
        `Недопустимое значение статуса. Допустимые значения: ${Object.values(EditDelivery.Statuses).join(', ')}`
      );
    }

    this._status = value;
  }

  get status() {
    return this._status;
  }
}
