const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

document.addEventListener('DOMContentLoaded', () => {
    const moedaOrigem = document.getElementById('moeda-origem');
    const moedaDestino = document.getElementById('moeda-destino');
    const valorInput = document.getElementById('valor');
    const resultado = document.getElementById('resultado');
    const converterBtn = document.getElementById('converter-btn');

    // Fetch currencies and populate dropdowns
    fetch(API_URL + 'USD')
        .then(response => response.json())
        .then(data => {
            const moedas = Object.keys(data.rates);
            moedas.forEach(moeda => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = moeda;
                option1.text = moeda;
                option2.value = moeda;
                option2.text = moeda;
                moedaOrigem.add(option1);
                moedaDestino.add(option2);
            });
            moedaOrigem.value = 'USD';
            moedaDestino.value = 'BRL';
        });

    // Perform conversion
    converterBtn.addEventListener('click', () => {
        const valor = parseFloat(valorInput.value);
        const fromCurrency = moedaOrigem.value;
        const toCurrency = moedaDestino.value;

        if (isNaN(valor) || valor <= 0) {
            resultado.textContent = 'Por favor, insira um valor válido.';
            return;
        }

        fetch(API_URL + fromCurrency)
            .then(response => response.json())
            .then(data => {
                const taxa = data.rates[toCurrency];
                const valorConvertido = (valor * taxa).toFixed(2);
                resultado.textContent = `${valor} ${fromCurrency} = ${valorConvertido} ${toCurrency}`;
            })
            .catch(() => {
                resultado.textContent = 'Erro ao obter as taxas de câmbio.';
            });
    });
});
