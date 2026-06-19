const { validarRetirada } = require('../validarRetirada');

describe('validarRetirada', () => {
  test('permite retirada válida', () => {
    expect(validarRetirada(10, 5)).toBe(true);
    expect(validarRetirada('10', '10')).toBe(true);
  });

  test('bloqueia retirada maior que o estoque', () => {
    expect(validarRetirada(10, 11)).toBe(false);
  });

  test('bloqueia retirada negativa', () => {
    expect(validarRetirada(10, -1)).toBe(false);
  });

  test('bloqueia retirada zero', () => {
    expect(validarRetirada(10, 0)).toBe(false);
  });

  test('bloqueia valores não numéricos', () => {
    expect(validarRetirada(10, 'abc')).toBe(false);
    expect(validarRetirada('xyz', 1)).toBe(false);
    expect(validarRetirada(undefined, 1)).toBe(false);
  });
});