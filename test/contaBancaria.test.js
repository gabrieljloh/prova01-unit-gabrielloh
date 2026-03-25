const ContaBancaria = require("../src/contaBancaria");

const contaExemplo = {
  id: "001",
  titular: "Ugioni",
  saldo: 1000,
  status: "ativa",
  limite: 5000,
  criadaEm: new Date(),
  atualizadaEm: new Date(),
};

describe("ContaBancaria", () => {
  let conta;

  beforeEach(() => {
    conta = new ContaBancaria({
      id: "001",
      titular: "Ugioni",
      saldo: 1000,
      status: "ativa",
      limite: 5000,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    });
  });

  // Testes de consulta
  test("obterSaldo deve retornar o saldo correto", () => {
    expect(conta.obterSaldo()).toBe(1000);
  });

  test("obterTitular deve retornar o titular correto", () => {
    expect(conta.obterTitular()).toBe("Ugioni");
  });


  // Testes de depósito
  test("depositar com valor válido deve retornar true", () => {
    expect(conta.depositar(500)).toBe(true);
  });

  test("depositar deve aumentar o saldo corretamente", () => {
    conta.depositar(500);
    expect(conta.obterSaldo()).toBe(1500);
  });

  test("depositar com valor zero deve retornar false", () => {
    expect(conta.depositar(0)).toBe(false);
  });

  test("depositar com valor negativo deve retornar false", () => {
    expect(conta.depositar(-100)).toBe(false);
  });

  // Testes de saque
  test("sacar com valor válido deve retornar true", () => {
    expect(conta.sacar(500)).toBe(true);
  });

  test("sacar deve diminuir o saldo corretamente", () => {
    conta.sacar(500);
    expect(conta.obterSaldo()).toBe(500);
  });

  test("sacar com valor zero deve retornar false", () => {
    expect(conta.sacar(0)).toBe(false);
  });

  test("sacar com valor negativo deve retornar false", () => {
    expect(conta.sacar(-100)).toBe(false);
  });

  test("sacar acima do saldo disponível deve retornar false", () => {
    expect(conta.sacar(7000)).toBe(false);
  });

  // Testes de titular
  test("alterarTitular com novo titular válido deve retornar true", () => {
    expect(conta.alterarTitular("NovoTitular")).toBe(true);
  });

  test("alterarTitular deve atualizar o titular corretamente", () => {
    conta.alterarTitular("NovoTitular");
    expect(conta.obterTitular()).toBe("NovoTitular");
  });

  test("alterarTitular com valor vazio deve retornar false", () => {
    expect(conta.alterarTitular("")).toBe(false);
  });

  test("alterarTitular com null deve retornar false", () => {
    expect(conta.alterarTitular(null)).toBe(false);
  });

  // Testes de bloqueio
  test("bloquearConta deve retornar true quando conta está ativa", () => {
    expect(conta.bloquearConta()).toBe(true);
  });

  test("bloquearConta deve atualizar status para bloqueada", () => {
    conta.bloquearConta();
    expect(conta.obterStatus()).toBe("bloqueada");
  });

  test("bloquearConta deve retornar false quando conta já está bloqueada", () => {
    conta.bloquearConta();
    expect(conta.bloquearConta()).toBe(false);
  });

  // Testes de ativação
  test("ativarConta deve retornar true quando conta está bloqueada", () => {
    conta.bloquearConta();
    expect(conta.ativarConta()).toBe(true);
  });

  test("ativarConta deve atualizar status para ativa", () => {
    conta.bloquearConta();
    conta.ativarConta();
    expect(conta.obterStatus()).toBe("ativa");
  });

  test("ativarConta deve retornar false quando conta já está ativa", () => {
    expect(conta.ativarConta()).toBe(false);
  });

  // Testes de encerramento
  test("encerrarConta deve retornar true quando saldo é zero", () => {
    conta.resetarConta();
    expect(conta.encerrarConta()).toBe(true);
  });

  test("encerrarConta deve retornar false quando saldo não é zero", () => {
    expect(conta.encerrarConta()).toBe(false);
  });

  test("encerrarConta deve atualizar status para encerrada", () => {
    conta.resetarConta();
    conta.encerrarConta();
    expect(conta.obterStatus()).toBe("encerrada");
  });

  // Testes de verificação de saque
  test("podeSacar deve retornar true com valor válido", () => {
    expect(conta.podeSacar(500)).toBe(true);
  });

  test("podeSacar deve retornar false com valor acima do disponível", () => {
    expect(conta.podeSacar(7000)).toBe(false);
  });

  test("podeSacar deve retornar false com valor zero", () => {
    expect(conta.podeSacar(0)).toBe(false);
  });

  test("podeSacar deve retornar false com valor negativo", () => {
    expect(conta.podeSacar(-100)).toBe(false);
  });

  // Testes de tarifa
  test("aplicarTarifa deve retornar true com valor válido", () => {
    expect(conta.aplicarTarifa(50)).toBe(true);
  });

  test("aplicarTarifa deve diminuir o saldo corretamente", () => {
    conta.aplicarTarifa(50);
    expect(conta.obterSaldo()).toBe(950);
  });

  test("aplicarTarifa deve retornar false com valor zero", () => {
    expect(conta.aplicarTarifa(0)).toBe(false);
  });

  test("aplicarTarifa deve retornar false com valor negativo", () => {
    expect(conta.aplicarTarifa(-50)).toBe(false);
  });

  // Testes de limite
  test("ajustarLimite deve retornar true com novo limite válido", () => {
    expect(conta.ajustarLimite(10000)).toBe(true);
  });

  test("ajustarLimite deve atualizar o limite corretamente", () => {
    conta.ajustarLimite(10000);
    expect(conta.obterLimite()).toBe(10000);
  });

  test("ajustarLimite deve retornar false com limite negativo", () => {
    expect(conta.ajustarLimite(-1000)).toBe(false);
  });

  test("ajustarLimite deve permitir limite zero", () => {
    expect(conta.ajustarLimite(0)).toBe(true);
    expect(conta.obterLimite()).toBe(0);
  });

  // Testes de saldo negativo
  test("saldoNegativo deve retornar false quando saldo é positivo", () => {
    expect(conta.saldoNegativo()).toBe(false);
  });

  test("saldoNegativo deve retornar true quando saldo é negativo", () => {
    conta.sacar(1500);
    expect(conta.saldoNegativo()).toBe(true);
  });

  // Testes de transferência
  test("transferir deve retornar true com transferência válida", () => {
    const contaDestino = new ContaBancaria({
      id: "002",
      titular: "Destino",
      saldo: 500,
      status: "ativa",
      limite: 1000,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    });
    expect(conta.transferir(300, contaDestino)).toBe(true);
  });

  test("transferir deve diminuir o saldo da conta origem", () => {
    const contaDestino = new ContaBancaria({
      id: "002",
      titular: "Destino",
      saldo: 500,
      status: "ativa",
      limite: 1000,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    });
    conta.transferir(300, contaDestino);
    expect(conta.obterSaldo()).toBe(700);
  });

  test("transferir deve aumentar o saldo da conta destino", () => {
    const contaDestino = new ContaBancaria({
      id: "002",
      titular: "Destino",
      saldo: 500,
      status: "ativa",
      limite: 1000,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    });
    conta.transferir(300, contaDestino);
    expect(contaDestino.obterSaldo()).toBe(800);
  });

  test("transferir deve retornar false com valor acima do disponível", () => {
    const contaDestino = new ContaBancaria({
      id: "002",
      titular: "Destino",
      saldo: 500,
      status: "ativa",
      limite: 1000,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    });
    expect(conta.transferir(7000, contaDestino)).toBe(false);
  });

  // Testes de saldo disponível
  test("calcularSaldoDisponivel deve retornar saldo + limite", () => {
    expect(conta.calcularSaldoDisponivel()).toBe(6000);
  });

  test("calcularSaldoDisponivel após sacar deve estar correto", () => {
    conta.sacar(200);
    expect(conta.calcularSaldoDisponivel()).toBe(5800);
  });

  // Testes de resumo
  test("gerarResumo deve retornar objeto com dados corretos", () => {
    const resumo = conta.gerarResumo();
    expect(resumo.titular).toBe("Ugioni");
    expect(resumo.saldo).toBe(1000);
    expect(resumo.limite).toBe(5000);
    expect(resumo.disponivel).toBe(6000);
    expect(resumo.status).toBe("ativa");
  });

  // Testes de validação
  test("validarConta deve retornar true para conta válida", () => {
    expect(conta.validarConta()).toBe(true);
  });

  test("validarConta deve retornar false sem id", () => {
    conta.conta.id = null;
    expect(conta.validarConta()).toBe(false);
  });

  test("validarConta deve retornar false sem titular", () => {
    conta.conta.titular = null;
    expect(conta.validarConta()).toBe(false);
  });

  test("validarConta deve retornar false com saldo inválido", () => {
    conta.conta.saldo = "invalido";
    expect(conta.validarConta()).toBe(false);
  });

  test("validarConta deve retornar false com limite negativo", () => {
    conta.conta.limite = -1000;
    expect(conta.validarConta()).toBe(false);
  });

  test("validarConta deve retornar false com status inválido", () => {
    conta.conta.status = "invalido";
    expect(conta.validarConta()).toBe(false);
  });

  // Testes de reset
  test("resetarConta deve zerar o saldo", () => {
    conta.resetarConta();
    expect(conta.obterSaldo()).toBe(0);
  });

  test("resetarConta deve zerar o limite", () => {
    conta.resetarConta();
    expect(conta.obterLimite()).toBe(0);
  });

  test("resetarConta deve definir status como ativa", () => {
    conta.bloquearConta();
    conta.resetarConta();
    expect(conta.obterStatus()).toBe("ativa");
  });
});