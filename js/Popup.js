import { createElement } from './components.js';
import Form from './Form.js';
import { validateRequired } from './validate.js';

/**
 * Класс попапа для редактирования данных доставки
 * Создает модальное окно с формой редактирования
 */
export default class Popup {
  /**
   * Создает экземпляр попапа
   * @param {EditDelivery} editDeliveryInstance - Экземпляр редактируемой доставки
   */
  constructor(instanceEditDelivery) {
    validateRequired(instanceEditDelivery, 'EditDelivery instance');

    this.instanceEditDelivery = instanceEditDelivery; // Хранит ссылку на экземпляр класса EditDelivery
    this.overlay = this.createOverlayEl()
    this.popup = this.buildPopup();
  }

  /**
   * Собирает полную структуру попапа
   */
  buildPopup() {
    this.popupEl = this.createPopupEl();
    this.popupTitleEl = this.createPopupTitleEl();

    this.form = new Form(this);
    this.setFormValues(this.instanceEditDelivery);

    this.popupCloseButtonEl = this.createPopupCloseButtonEl();

    this.popupEl.append(this.popupTitleEl, this.form.formEl, this.popupCloseButtonEl);

    return this.popupEl;
  }

  /**
   * Создает overlay (подложку) для попапа
   */
  createOverlayEl() {
    return createElement({
      tag: 'div',
      classList: 'overlay',
      events: {
        click: () => this.handlerClosePopup()
      }
    });
  }

  /**
   * Создает основной контейнер попапа
   */
  createPopupEl() {
    return createElement({
      tag: 'div',
      classList: 'popup'
    });
  }

  /**
   * Создает заголовок попапа
   */
  createPopupTitleEl() {
    return createElement({
      tag: 'h2',
      classList: 'popup__title',
      text: 'Изменить'
    });
  }

   /**
   * Создает кнопку закрытия попапа
   */
  createPopupCloseButtonEl() {
    const popupCloseButtonEl = createElement({
      tag: 'button',
      classList: 'popup__close-btn',
      attributes: {
        id: 'popup-close-btn',
        type: 'button',
        ariaLabel: 'Закрыть окно'
      },
      events: {
        click: () => this.handlerClosePopup()
      }
    });

    const closeBtnSvgEl = this.createCloseIconSvgEl();
    popupCloseButtonEl.append(closeBtnSvgEl);

    return popupCloseButtonEl;
  }

  /**
   * Создает SVG-иконку закрытия для кнопки
   */
  createCloseIconSvgEl() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.setAttribute('viewBox', '144 144 512 512');
    path.setAttribute('d', 'm400.91 433.76 145.93 145.93c9.07 9.07 23.801 9.04 32.848 0 9.063-9.07 9.07-23.781-.004-32.848l-145.92-145.93 145.93-145.93c9.063-9.07 9.063-23.785 0-32.848-9.07-9.07-23.78-9.07-32.848 0l-145.93 145.92-145.93-145.93c-9.07-9.07-23.78-9.07-32.844 0-4.535 4.535-6.773 10.457-6.77 16.414-.015 5.969 2.235 11.902 6.77 16.434l145.93 145.93-145.91 145.91a23.137 23.137 0 0 0-6.8 16.43c.011 5.95 2.265 11.891 6.796 16.426 9.063 9.063 23.781 9.07 32.848 0z');

    svg.append(path);

    return svg
  }

  /**
   * Устанавливает значения формы из данных доставки
   * @param {Object} deliveryData - Данные доставки
   * @param {string} deliveryData.name - Имя клиента
   * @param {string} deliveryData.address - Адрес доставки
   * @param {number} deliveryData.distance - Расстояние доставки
   * @param {string} deliveryData.status - Статус доставки
   */
  setFormValues({ name, address, distance, status }) {
    this.form.inputNameValue = name;
    this.form.inputAddressValue = address;
    this.form.inputDistanceValue = distance;
    this.form.selectValue = status;
  }

  /**
   * Открывает попап в указанном контейнере
   * @param {HTMLElement} container - Контейнер для размещения попапа
   */
  openPopup(container) {
    if (container && this.overlay && this.popup) {
      container.append(this.overlay, this.popup);
    }
  }

  /**
   * Закрывает попап, удаляя его из DOM
   */
  closePopup() {
    if (this.overlay && this.popup) {
      this.overlay.remove();
      this.popup.remove();
    }
  }

  /**
   * Обработчик закрытия попапа
   */
  handlerClosePopup() {
    this.closePopup();
  }
}



