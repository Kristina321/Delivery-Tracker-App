import { createElement } from './components.js';

/**
 * Базовый класс для отображения карточки доставки
 * Обеспечивает создание DOM-структуры карточки и управление её данными
 */
export default class Delivery {
  _name = '';
  _address = '';
  _distance = 0;

  /**
   * Ключи данных для карточки (используются в data-атрибутах)
   */
  static DataKeys = {
    NAME: 'name',
    ADDRESS: 'address',
    DISTANCE: 'distance'
  };

  /**
   * Создает экземпляр карточки доставки
   * @param {string} name - Имя клиента
   * @param {string} address - Адрес доставки
   * @param {number} distance - Расстояние доставки в км
   */
  constructor(name, address, distance) {
    this.name = name;
    this.address = address;
    this.distance = distance;
  }

  /**
   * Создает полный DOM-элемент карточки со всей внутренней структурой
   */
  createCardElement() {
    this.clientCardEl = this.createMainContainer();
    this.clientCardTextContentEl = this.createCardTextContentEl();
    const cardFieldsElements = this.createCardFieldsElements();

    this.clientCardTextContentEl.append(...cardFieldsElements);
    this.clientCardEl.append(this.clientCardTextContentEl);

    return this.clientCardEl;
  }

  /**
  * Создает основной контейнер карточки (корневой элемент)
  */
  createMainContainer() {
    return createElement({
      tag: 'div',
      classList: 'delivery-card'
    });
  }

  /**
  * Создает контейнер для текстового содержимого карточки
  */
  createCardTextContentEl() {
    return createElement({
      tag: 'dl',
      classList: 'delivery-card__content'
    });
  }

  /**
   * Создает элементы полей карточки (термин + определение)
   */
  createCardFieldsElements() {
    const cardData = this.getCardFields();
    const cardFieldsElements = [];

    cardData.forEach(({ term, definition, dataAtt }) => {
      const { termEl, definitionEl } = this.createTermDefinitionElements(term, definition, dataAtt);
      this.saveElementReference(dataAtt, definitionEl);

      cardFieldsElements.push(termEl, definitionEl);
    });

    return cardFieldsElements;
  }

  /**
   * Создает пару элементов термина и определения
   * @param {string} termKey - Текст термина
   * @param {string} defValue - Текст определения
   * @param {string} dataAtt - Значение для data-атрибута
   * @returns {Object} Объект с элементами termEl и definitionEl
   */
  createTermDefinitionElements(termKey, defValue, dataAtt) {
    const termEl = createElement({
      tag: 'dt',
      classList: 'delivery-card__term',
      text: termKey,
      attributes: {
        'data-term': dataAtt
      }
    });

    const definitionEl = createElement({
      tag: 'dd',
      classList: 'delivery-card__definition',
      text: defValue,
      attributes: {
        'data-definition': `${dataAtt}-value`
      }
    });

    return {
      termEl,
      definitionEl
    }
  }

  /**
   * Сохраняет ссылки на DOM-элементы для последующего обновления
   * @param {string} dataAtt - Ключ данных
   * @param {HTMLElement} definitionEl - Ссылка на элемент определения
   */
  saveElementReference(dataAtt, definitionEl) {
    switch (dataAtt) {
      case Delivery.DataKeys.NAME:
        this.clientCardDefinitionNameEl = definitionEl;
        break;
      case Delivery.DataKeys.ADDRESS:
        this.clientCardDefinitionAddressEl = definitionEl;
        break;
      case Delivery.DataKeys.DISTANCE:
        this.clientCardDefinitionDistanceEl = definitionEl;
        break;
      default:
        // Обработка неизвестного ключа
        console.log(`Неизвестный data-attribute: ${dataAtt}`);
        break;
    }
  }

  /**
   * Возвращает данные для полей карточки
   * @returns {Array} Массив объектов с данными полей
   */
  getCardFields() {
    return [
      { term: 'Имя', definition: this.name, dataAtt: Delivery.DataKeys.NAME },
      { term: 'Адрес', definition: this.address, dataAtt: Delivery.DataKeys.ADDRESS },
      { term: 'Расстояние', definition: `${this.distance} км`, dataAtt: Delivery.DataKeys.DISTANCE }
    ];
  }

  /**
   * Обновляет содержимое элемента, если он существует
   * @param {HTMLElement|null} element - DOM-элемент для обновления
   * @param {string} value - Новое значение
   */
  updateElementContent(element, value) {
    if (element) {
      element.textContent = value;
    }
  }

  set name(value) {
    this._name = value;
    this.updateElementContent(this.clientCardDefinitionNameEl, this._name);
  }

  get name() {
    return this._name;
  }

  set address(value) {
    this._address = value;
    this.updateElementContent(this.clientCardDefinitionAddressEl, this._address);
  }

  get address() {
    return this._address;
  }

  set distance(value) {
    this._distance = value;
    this.updateElementContent(this.clientCardDefinitionDistanceEl, `${this._distance} км`);
  }

  get distance() {
    return this._distance;
  }
}


