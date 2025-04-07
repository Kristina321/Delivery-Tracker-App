import { createElement } from './components.js';
import { validateRequired } from './validate.js';

/**
 * Класс формы для редактирования данных доставки
 * Обеспечивает создание и управление формой
 */
export default class Form {
  _inputNameValue = '';
  _inputAddressValue = '';
  _inputDistanceValue = '';
  _selectValue = 'delivery';
  popupInstance = null;

  /**
   * Конфигурация полей ввода формы
   */
  static InputConfigs = [
    { field: 'name', label: 'Имя', type: 'text' },
    { field: 'address', label: 'Адрес', type: 'text' },
    { field: 'distance', label: 'Расстояние', type: 'number' },
  ];

  /**
   * Доступные статусы доставки
   */
  static Statuses = {
    delivery: 'Доставляется',
    delivered: 'Доставлен',
    canceled: 'Отменен'
  };

  /**
   * Создает экземпляр формы
   * @param {Popup} popupInstance - Экземпляр попапа
   */
  constructor(popupInstance) {
    validateRequired(popupInstance, 'Popup instance');

    this.popupInstance = popupInstance; // Хранит ссылку на экземпляр класса Popup
    this.formEl = this.buildForm();
  }

  /**
   * Собирает полную структуру формы
   */
  buildForm() {
    const formEl = this.createFormEl();

    this.inputFields = Form.InputConfigs.map(({ field, label, type }) => this.createInputFieldEl(field, type, label))
    this.selectEl = this.createSelectWithOptionsEl(Form.Statuses);
    this.submitButtonEl = this.createSubmitButtonEl();

    formEl.append(...this.inputFields, this.selectEl, this.submitButtonEl);

    return formEl;
  }

  /**
   * Создает элемент формы
   */
  createFormEl() {
    return createElement({
      tag: 'form',
      classList: 'popup__form',
      attributes: {
        id: 'popup-form',
        name: 'popup-form',
      },
      events: {
        submit: this.handlerSubmit.bind(this)
      }
    });
  }

  /**
   * Создает поле ввода с лейблом и сообщением об ошибке
   * @param {string} fieldKey - Ключ поля
   * @param {string} type - Тип input
   * @param {string} placeholder - Подсказка в поле
   */
  createInputFieldEl(fieldKey, type, placeholder) {
    const labelEl = this.createLabelEl(fieldKey);
    const inputEl = this.createInputEl(fieldKey, type, placeholder);
    const errorSpan = this.createErrorSpanEl(fieldKey);

    labelEl.append(inputEl, errorSpan);

    return labelEl;
  }

   /**
   * Создает элемент label для поля ввода
   * @param {string} fieldKey - Ключ поля
   */
  createLabelEl(fieldKey) {
    return createElement({
      tag: 'label',
      classList: 'popup__form-label',
      attributes: {
        for: `input-${fieldKey}`
      }
    });
  }

  /**
   * Создает элемент input
   * @param {string} fieldKey - Ключ поля
   * @param {string} type - Тип input
   * @param {string} placeholder - Подсказка в поле
   */
  createInputEl(fieldKey, type, placeholder = '') {
    return createElement({
      tag: 'input',
      classList: 'popup__form-input',
      attributes: {
        id: `input-${fieldKey}`,
        name: fieldKey,
        type,
        placeholder,
      },
    });
  }

  /**
   * Создает элемент для отображения ошибки
   * @param {string} fieldKey - Ключ поля
   */
  createErrorSpanEl(fieldKey) {
    return createElement({
      tag: 'span',
      classList: 'popup__form-error',
      attributes: {
        id: `error-${fieldKey}`,
      }
    });
  }

  /**
   * Создает select с опциями
   * @param {Object} options - Объект с вариантами {value: text}
   */
  createSelectWithOptionsEl(options) {
    const selectEl = createElement({
      tag: 'select',
      classList: 'popup__form-select',
      attributes: {
        id: 'status-select',
        name: 'status',
      }
    });

    Object.entries(options).forEach(([value, text]) => {
      const optionEl = new Option(text, value);
      selectEl.append(optionEl);
    })

    return selectEl;
  }

  /**
   * Создает кнопку отправки формы
   */
  createSubmitButtonEl() {
    return createElement({
      tag: 'button',
      classList: 'popup__save-btn',
      text: 'Сохранить',
      attributes: {
        type: 'submit',
      },
    });
  }

  /**
   * Устанавливает значение для поля ввода
   * @param {string} fieldKey - ID поля ввода
   * @param {string} value - Устанавливаемое значение
   */
  setInputValue(fieldKey, value) {
    this.inputFields.forEach(item => {
      if (item.firstElementChild.id === fieldKey) {
        item.firstElementChild.value = value;
      }
    });
  }

  /**
   * Обновляет данные экземпляра доставки
   * @param {Object} formProps - Данные формы
   * @param {EditDelivery} instance - Экземпляр доставки
   */
  updateInstanceEditDelivery(formProps, instance) {
    Object.assign(instance, formProps);
  }

  /**
   * Обработчик отправки формы
   * @param {Event} e - Событие submit
   */
  handlerSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      if (this.popupInstance) {
        const instanceEditDelivery = this.popupInstance.instanceEditDelivery;
        this.updateInstanceEditDelivery(formProps, instanceEditDelivery);
        instanceEditDelivery.styledCardEl(); // Обновление стилей карточек
        this.popupInstance.closePopup();
      }
    } catch (error) {
      console.error('Form submit error:', error);
    }
  }

  set inputNameValue(value) {
    this._inputNameValue = value;
    this.setInputValue('input-name', value);
  }

  get inputNameValue() {
    return this._inputNameValue;
  }

  set inputAddressValue(value) {
    this._inputAddressValue = value;
    this.setInputValue('input-address', value);
  }

  get inputAddressValue() {
    return this._inputAddressValue;
  }

  set inputDistanceValue(value) {
    this._inputDistanceValue = value;
    this.setInputValue('input-distance', value);
  }

  get inputDistanceValue() {
    return this._inputDistanceValue;
  }

  set selectValue(value) {
    this._selectValue = value;
    if (this.selectEl) {
      this.selectEl.setAttribute('value', this._selectValue)
      this.selectEl.value = this._selectValue;
    }
  }

  get selectValue() {
    return this._selectValue;
  }
}
