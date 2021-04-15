// realAPI key = "3c03a6dbebfaee780e5db05e16794655250d6e9a6278dcbaa85b97eff2c821e4";
// Fake API key = "ce3fd966e7a1d10d65f907b20bf000552158fd3ed1bd614110baa0ac6cb57a7e";
const API_KEY =
  "3c03a6dbebfaee780e5db05e16794655250d6e9a6278dcbaa85b97eff2c821e4";

const tickersHandlers = new Map(); // {}

//TODO: refactor to use URLSearchParams
const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys()
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then(r => r.json())
    .then(rawData => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach(fn => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;

// получить стоимость криптовалютных пар с АПИшки?
// получать ОБНОВЛЕНИЯ стоимости криптовалютных пар с АПИШки
