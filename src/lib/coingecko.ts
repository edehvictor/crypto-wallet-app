export const fetchCoinList = async () => {
  const cachedData = localStorage.getItem("cryptoData");
  const cacheTime = localStorage.getItem("cryptoDataTime");
  const now = Date.now();

  if (cachedData && cacheTime && now - parseInt(cacheTime) < 60000) {
    return JSON.parse(cachedData);
  }
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    if (!res.ok) throw new Error("Failed to fetch coin list");
    const data = await res.json();
    console.log(data);
    localStorage.setItem("cryptoData", JSON.stringify(data));
    localStorage.setItem("cryptoDataTime", now.toString());

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchSelectedCoins = async (ids: string[]) => {
  const cachedData = localStorage.getItem("cryptoData");
  const cacheTime = localStorage.getItem("cryptoDataTime");
  const now = Date.now();

  if (cachedData && cacheTime && now - parseInt(cacheTime) < 60000) {
    return JSON.parse(cachedData);
  }

  if (!ids.length) return [];

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
    ","
  )}&price_change_percentage=1h,24h`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch selected coins");
    const data = await res.json();
    console.log(data, "selected coins");
    localStorage.setItem("cryptoData", JSON.stringify(data));
    localStorage.setItem("cryptoDataTime", now.toString());

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCoinDetails = async (id: string) => {
  // const cacheKey = `coinDetails-${id}`;
  // const cacheTimeKey = `${cacheKey}-time`;
  // const cachedData = localStorage.getItem(cacheKey);
  // const cacheTime = localStorage.getItem(cacheTimeKey);
  // const now = Date.now();

  // // Check cache (valid for 1 minute)
  // if (cachedData && cacheTime && now - parseInt(cacheTime) < 60000) {
  //   return JSON.parse(cachedData);
  // }

  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch coin details for ${id}`);
    const data = await res.json();
    // localStorage.setItem(cacheKey, JSON.stringify(data));
    // localStorage.setItem(cacheTimeKey, now.toString());

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchchChartData = async (id: string) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch chart data for ${id}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
