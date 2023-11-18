// função executada quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
  // ocultar as opções inicialmente
  document.getElementById("opcoesConversor").style.display = "none";
});

// função para iniciar os conversores
function comecarConversores() {
  // ocultar o botão "Começar"
  document.getElementById("comecarButton").style.display = "none";

  // mostrar as opções quando o botão "Começar" é clicado
  document.getElementById("opcoesConversor").style.display = "block";
}

// função chamada quando o usuário muda o tipo de conversor
function mudarConversor() {
  const seletorConversor = document.getElementById("seletorConversor");
  const entradaDados = document.getElementById("entradaDados");
  const resultadoContainer = document.getElementById("resultado");

  // limpar resultados anteriores
  entradaDados.innerHTML = "";
  resultadoContainer.innerHTML = "";

  // adicionar inputs dinamicamente com base na escolha do usuário
  if (seletorConversor.value === "moeda") {
    entradaDados.innerHTML =
      '<label for="quantidadeMoeda">Quantidade do Real:</label>' +
      '<input type="number" id="quantidadeMoeda">' +
      '<label for="tipoMoeda">Tipo de Moeda:</label>' +
      '<select id="tipoMoeda">' +
      '<option value="libra">Libra</option>' +
      '<option value="dolar">Dólar</option>' +
      '<option value="iene">Iene</option>' +
      '<option value="bitcoin">Bitcoin</option>' +
      "</select>";
  } else if (seletorConversor.value === "temperatura") {
    entradaDados.innerHTML =
      '<label for="temperatura">Temperatura:</label>' +
      '<input type="number" id="temperatura">' +
      '<label for="unidadeOrigem">Unidade de Origem:</label>' +
      '<select id="unidadeOrigem">' +
      '<option value="celsius">Celsius</option>' +
      '<option value="fahrenheit">Fahrenheit</option>' +
      '<option value="kelvin">Kelvin</option>' +
      "</select>" +
      '<label for="unidadeDestino">Unidade para a Conversão:</label>' +
      '<select id="unidadeDestino">' +
      '<option value="celsius">Celsius</option>' +
      '<option value="fahrenheit">Fahrenheit</option>' +
      '<option value="kelvin">Kelvin</option>' +
      "</select>";
  } else if (seletorConversor.value === "interestelar") {
    entradaDados.innerHTML =
      '<label for="planeta1">Astro 1:</label>' +
      '<select id="planeta1">' +
      '<option value="sagittariusA">Sagittarius A*</option>' +
      '<option value="alfaCentauri">Alfa Centauri</option>' +
      '<option value="sirius">Sirius</option>' +
      '<option value="terra">Terra</option>' +
      "</select>" +
      '<label for="planeta2">Astro 2:</label>' +
      '<select id="planeta2">' +
      '<option value="sagittariusA">Sagittarius A*</option>' +
      '<option value="alfaCentauri">Alfa Centauri</option>' +
      '<option value="sirius">Sirius</option>' +
      '<option value="terra">Terra</option>' +
      "</select>";
  }
}

// função chamada quando o usuário clica no botão "Converter"
function realizarConversao() {
  const seletorConversor = document.getElementById("seletorConversor");
  const resultadoContainer = document.getElementById("resultado");
  resultadoContainer.innerHTML = ""; // Limpar conteúdo anterior

  if (seletorConversor.value === "moeda") {
    const quantidadeMoeda = document.getElementById("quantidadeMoeda").value;
    const tipoMoeda = document.getElementById("tipoMoeda").value;
    const cotacao = {
      libra: 6.02,
      dolar: 5.35,
      iene: 0.049,
      bitcoin: 178163.4,
    };

    if (quantidadeMoeda !== "") {
      const resultadoConversao = quantidadeMoeda * cotacao[tipoMoeda];
      resultadoContainer.innerHTML = `R$ ${resultadoConversao.toFixed(
        2
      )}`;
    } else {
      alert("Por favor, insira uma quantidade válida.");
    }
  } else if (seletorConversor.value === "temperatura") {
    const temperatura = document.getElementById("temperatura").value;
    const unidadeOrigem = document.getElementById("unidadeOrigem").value;
    const unidadeDestino = document.getElementById("unidadeDestino").value;

    if (temperatura !== "") {
      // verificação de unidades de temperatura iguais
      if (unidadeOrigem === unidadeDestino) {
        alert("Por favor, selecione unidades de temperatura diferentes.");
        return;
      }

      const resultado = converterTemperatura(
        temperatura,
        unidadeOrigem,
        unidadeDestino
      );
      resultadoContainer.innerHTML = `${resultado.toFixed(
        2
      )} ${unidadeDestino}`;
    } else {
      alert("Por favor, insira uma temperatura válida.");
    }
  } else if (seletorConversor.value === "interestelar") {
    const planeta1 = document.getElementById("planeta1").value;
    const planeta2 = document.getElementById("planeta2").value;

    if (planeta1 !== planeta2) {
      const distanciaKm = calcularDistanciaInterestelar(planeta1, planeta2);
      resultadoContainer.innerHTML = `Aproximadamente ${distanciaKm.toFixed(
        2
      )} km.`;
    } else {
      alert("Por favor, selecione astros diferentes.");
    }
  }
}

// função para converter temperatura entre diferentes unidades
function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
  if (unidadeOrigem === unidadeDestino) {
    return parseFloat(valor);
  }

  if (unidadeOrigem === "celsius") {
    if (unidadeDestino === "fahrenheit") {
      return (parseFloat(valor) * 9) / 5 + 32;
    } else if (unidadeDestino === "kelvin") {
      return parseFloat(valor) + 273.15;
    }
  } else if (unidadeOrigem === "fahrenheit") {
    if (unidadeDestino === "celsius") {
      return ((parseFloat(valor) - 32) * 5) / 9;
    } else if (unidadeDestino === "kelvin") {
      return ((parseFloat(valor) - 32) * 5) / 9 + 273.15;
    }
  } else if (unidadeOrigem === "kelvin") {
    if (unidadeDestino === "celsius") {
      return parseFloat(valor) - 273.15;
    } else if (unidadeDestino === "fahrenheit") {
      return ((parseFloat(valor) - 273.15) * 9) / 5 + 32;
    }
  }

  return null; // retornar null se as conversões não forem válidas
}

// função para calcular a distância interestelar entre planetas
function calcularDistanciaInterestelar(planeta1, planeta2) {
  // defina as distâncias em anos-luz
  const distanciasAnosLuz = {
    sagittariusA: 26.67,
    alfaCentauri: 4.37,
    sirius: 8.6,
    terra: 1, // distância da Terra a si mesma é 1 para evitar divisão por zero
  };

  // converte as distâncias para quilômetros
  const conversaoTempo = distanciasAnosLuz[planeta1] * 9.461e12; // 1 ano-luz = 9.461e12 km
  const distanciaKm = conversaoTempo * distanciasAnosLuz[planeta2];

  return distanciaKm;
}
