/** * Создает новый элемент DOM с заданными параметрами. * *
 * @param {object} options - Объект с параметрами для создания элемента. *
 * @param {string} options.tag - Тип тега элемента (обязательно). *
 * @param {(string|string[])} [options.classList] - Один или несколько классов для элемента. *
 * @param {string} [options.text] - Текстовое содержимое элемента. *
 * @param {Record<string, string>} [options.attributes] - Атрибуты элемента. *
 * @param {Record<string, Function|Function[]>} [options.events] - События и их обработчики. *
 * @throws {Error} Если параметр `tag` отсутствует. *
 * @returns {HTMLElement} Созданный элемент. */
export function createElement(options) {
  const { tag, classList, text, attributes, events } = options;

  if (!tag) {
    throw new Error('Таг - обязательный пармаетр');
  }

  const element = document.createElement(tag);

  if (classList) {
    const classes = Array.isArray(classList) ? classList : [classList];
    element.classList.add(...classes);
  }

  if (text) element.textContent = text;

  if (attributes) {
    Object.entries(attributes).forEach(([attr, value]) => {
      element.setAttribute(attr, value);
    });
  }

  if (events) {
    Object.entries(events).forEach(([eventType, handlers]) => {
      if (Array.isArray(handlers)) {
        handlers.forEach(handler => element.addEventListener(eventType, handler));
      } else {
        element.addEventListener(eventType, handlers);
      }
    });
  }

  return element;
}
