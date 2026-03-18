const Utilitarios = require('../src/utilitarios');

describe('Classe Utilitarios', () => {
  let util;

  beforeEach(() => {
    util = new Utilitarios();
  });

  test('inverterString', () => {
    expect(util.inverterString("abc")).toBe("cba");
  });

  test('contarCaracteres', () => {
    expect(util.contarCaracteres("teste")).toBe(5);
  });

  test('paraMaiusculas', () => {
    expect(util.paraMaiusculas("abc")).toBe("ABC");
  });

  test('paraMinusculas', () => {
    expect(util.paraMinusculas("ABC")).toBe("abc");
  });

  test('primeiraLetraMaiuscula', () => {
    expect(util.primeiraLetraMaiuscula("teste")).toBe("Teste");
  });

  test('somar', () => {
    expect(util.somar(2, 3)).toBe(5);
  });

  test('subtrair', () => {
    expect(util.subtrair(5, 3)).toBe(2);
  });

  test('multiplicar', () => {
    expect(util.multiplicar(4, 3)).toBe(12);
  });

  test('dividir', () => {
    expect(util.dividir(10, 2)).toBe(5);
  });

  test('dividir por zero deve lançar erro', () => {
    expect(() => util.dividir(10, 0)).toThrow("Divisão por zero");
  });

  test('ehPar', () => {
    expect(util.ehPar(4)).toBe(true);
    expect(util.ehPar(5)).toBe(false);
  });

  test('primeiroElemento', () => {
    expect(util.primeiroElemento([1,2,3])).toBe(1);
  });

  test('ultimoElemento', () => {
    expect(util.ultimoElemento([1,2,3])).toBe(3);
  });

  test('tamanhoArray', () => {
    expect(util.tamanhoArray([1,2,3,4])).toBe(4);
  });

  test('ordenarArray', () => {
    expect(util.ordenarArray([3,1,2])).toEqual([1,2,3]);
  });

  test('inverterArray', () => {
    expect(util.inverterArray([1,2,3])).toEqual([3,2,1]);
  });

  test('gerarNumeroAleatorio', () => {
    const num = util.gerarNumeroAleatorio(50);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThan(50);
  });

  test('ehNumero', () => {
    expect(util.ehNumero(10)).toBe(true);
    expect(util.ehNumero("10")).toBe(false);
    expect(util.ehNumero(NaN)).toBe(false);
  });

  test('removerEspacos', () => {
    expect(util.removerEspacos("  teste  ")).toBe("teste");
  });

  test('repetirTexto', () => {
    expect(util.repetirTexto("a", 3)).toBe("aaa");
  });

  test('juntarArray', () => {
    expect(util.juntarArray([1,2,3], "-")).toBe("1-2-3");
  });

  test('contarPalavras', () => {
    expect(util.contarPalavras("ola mundo teste")).toBe(3);
  });

  test('mediaArray', () => {
    expect(util.mediaArray([2,4,6])).toBe(4);
  });

  test('mediaArray com array vazio', () => {
    expect(util.mediaArray([])).toBe(0);
  });

  test('removerDuplicados', () => {
    expect(util.removerDuplicados([1,1,2,3,3])).toEqual([1,2,3]);
  });

  test('ehPalindromo', () => {
    expect(util.ehPalindromo("Ame a ema")).toBe(true);
    expect(util.ehPalindromo("teste")).toBe(false);
  });

  test('mesclarObjetos', () => {
    const obj1 = {a:1};
    const obj2 = {b:2};
    expect(util.mesclarObjetos(obj1,obj2)).toEqual({a:1,b:2});
  });

});