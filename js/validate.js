/**
 * Валидирует форму с использованием библиотеки JustValidate
 * Настраивает правила валидации для полей формы и обработчик проверки
 * @param {HTMLFormElement} form - DOM-элемент формы, которую нужно валидировать
 */
export function validateForm(form) {
  const validator = new JustValidate(form, {
    validateBeforeSubmitting: true,
  });
  validator
    .addField(document.querySelector('#input-name'), [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
    ], {
      errorsContainer: '#error-name',
    })
    .addField(document.querySelector('#input-address'), [
      {
        rule: 'required',
        errorMessage: 'Введите адрес',
      },
    ], {
      errorsContainer: '#error-address',
    })
    .addField(document.querySelector('#input-distance'), [
      {
        rule: 'required',
        errorMessage: 'Введите расстояние',
      },
      {
        validator: (value) => {
          return value > 0;
        },
        errorMessage: 'Расстояние должно быть больше 0',
      },
    ], {
  errorsContainer: '#error-distance',
    })

validator.onValidate((e) => {
  const submitButtonEl = validator.form.querySelector(`button[type='submit']`);
  e.isValid ? submitButtonEl.disabled = false : submitButtonEl.disabled = true;
})
}

/**
* Универсальная проверка на существование
*/
export function validateRequired(param, paramName) {
  if (!param) {
    throw new Error(`${paramName} is required`);
  }
}
