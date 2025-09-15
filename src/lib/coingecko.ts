// export const fetchCoinList = async () => {
//   // const cachedData = localStorage.getItem("cryptoData");
//   // const cacheTime = localStorage.getItem("cryptoDataTime");
//   // const now = Date.now();

//   // if (cachedData && cacheTime && now - parseInt(cacheTime) < 60000) {
//   //   return JSON.parse(cachedData);
//   // }
//   try {
//     const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
//     if (!res.ok) throw new Error("Failed to fetch coin list");
//     const data = await res.json();
//     // localStorage.setItem("cryptoData", JSON.stringify(data));
//     // localStorage.setItem("cryptoDataTime", now.toString());

//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// src/lib/coingecko.ts

// export const fetchCoinList = async () => {
//   try {
//     // Change the URL to use your proxy
//     const res = await fetch("/api/coins/list");
//     if (!res.ok) throw new Error("Failed to fetch coin list");
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// export const fetchSelectedCoins = async (ids: string[]) => {
//   if (!ids.length) return [];

//   // Change the URL to use your proxy
//   const url = `/api/coins/markets?vs_currency=usd&ids=${ids.join(
//     ","
//   )}&price_change_percentage=1h,24h`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch selected coins");
//     const data = await res.json();
//     console.log(data, "selected coins");
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// export const fetchSelectedCoins = async (ids: string[]) => {
//   if (!ids.length) return [];

//   // Change the URL to use your proxy
//   const url = `/api/coins/markets?vs_currency=usd&ids=${ids.join(
//     ","
//   )}&price_change_percentage=1h,24h`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch selected coins");
//     const data = await res.json();
//     console.log(data, "selected coins");
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// export const fetchSelectedCoins = async (ids: string[]) => {
//   // const cachedData = localStorage.getItem("cryptoData");
//   // const cacheTime = localStorage.getItem("cryptoDataTime");
//   // const now = Date.now();

//   // if (cachedData && cacheTime && now - parseInt(cacheTime) < 60000) {
//   //   return JSON.parse(cachedData);
//   // }

//   if (!ids.length) return [];

//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
//     ","
//   )}&price_change_percentage=1h,24h`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch selected coins");
//     const data = await res.json();
//     console.log(data, "selected coins");

//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

import type { CoinList, CoinMarket } from "@/types/types";

export const fetchCoinList = async (): Promise<CoinList[]> => {
  const cachedData = localStorage.getItem("cryptoCoinList");
  const cacheTime = localStorage.getItem("cryptoCoinListTime");
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  if (cachedData && cacheTime && now - parseInt(cacheTime) < ONE_DAY) {
    console.log("Using cached coin list");
    return JSON.parse(cachedData) as CoinList[];
  }

  try {
    const res = await fetch("/api/coins/list");
    if (!res.ok) {
      if (res.status === 429) {
        console.warn(
          "CoinGecko API rate limit hit for coin list. Retrying after delay..."
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return fetchCoinList();
      }
      throw new Error(`Failed to fetch coin list: ${res.statusText}`);
    }

    const data: CoinList[] = await res.json();
    console.log("Fetched new coin list");
    localStorage.setItem("cryptoCoinList", JSON.stringify(data));
    localStorage.setItem("cryptoCoinListTime", now.toString());
    return data;
  } catch (err) {
    console.error("Error fetching coin list:", err);
    return [];
  }
};

export const fetchSelectedCoins = async (
  ids: string[]
): Promise<CoinMarket[]> => {
  if (!ids.length) return [];

  const url = `/api/coins/markets?vs_currency=usd&ids=${ids.join(
    ","
  )}&price_change_percentage=1h,24h`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 429) {
        console.warn(
          "CoinGecko API rate limit hit for selected coins. Retrying after delay..."
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return fetchSelectedCoins(ids);
      }
      throw new Error(`Failed to fetch selected coins: ${res.statusText}`);
    }

    const data: CoinMarket[] = await res.json();
    // console.log(data, "selected coins");
    return data;
  } catch (err) {
    console.error("Error fetching selected coins:", err);
    return [];
  }
};

export const fetchCoinDetails = async (id: string) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch coin details for ${id}`);
    const data = await res.json();

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
