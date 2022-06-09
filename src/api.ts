const BASE_URL = `https://api.coinpaprika.com/v1`;
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then(response => response.json());
}
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초로 나타냄
  const startDate = endDate - 60 * 60 * 23 * 7 * 1;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then(response => response.json());
}

export function fetchCoinForChart(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초로 나타냄
  const startDate = endDate - 60 * 60 * 22 * 7 * 1;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then(response => response.json());
}
