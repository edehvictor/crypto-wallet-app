import { z } from "zod";
export type NavItem = {
  name: string;
  href: string;
};
export interface CryptoToken {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change: number;
}

export interface Account {
  id: string;
  name: string;
  address: string;
  balance: number;
}

export interface Network {
  id: string;
  name: string;
  chainId: number;
  icon: string;
  color: string;
}

// Coin Market Data Interface
export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

// Coin List Interface
export interface CoinList {
  id: string;
  symbol: string;
  name: string;
  platforms: Record<string, string>;
}

// NFT Market Interface
export interface NftMarket {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    small_2x: string;
  };
  description: string;
  native_currency: string;
  native_currency_symbol: string;
  market_cap_rank: number;
  floor_price: {
    native_currency: number;
    usd: number;
  };
  market_cap: {
    native_currency: number;
    usd: number;
  };
  volume_24h: {
    native_currency: number;
    usd: number;
  };
  floor_price_in_usd_24h_percentage_change: number;
  floor_price_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  market_cap_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  volume_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  number_of_unique_addresses: number;
  number_of_unique_addresses_24h_percentage_change: number;
  volume_in_usd_24h_percentage_change: number;
  total_supply: number;
  one_day_sales: number;
  one_day_sales_24h_percentage_change: number;
  one_day_average_sale_price: number;
  one_day_average_sale_price_24h_percentage_change: number;
}

// NFT List Interface
export interface NftList {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

export const NftMarketSchema = z.object({
  id: z.string(),
  contract_address: z.string(),
  asset_platform_id: z.string(),
  name: z.string(),
  symbol: z.string(),
  image: z.object({
    small: z.string().url(),
    small_2x: z.string().url(),
  }),
  description: z.string(),
  native_currency: z.string(),
  native_currency_symbol: z.string(),
  market_cap_rank: z.number(),
  floor_price: z.object({
    native_currency: z.number(),
    usd: z.number(),
  }),
  market_cap: z.object({
    native_currency: z.number(),
    usd: z.number(),
  }),
  volume_24h: z.object({
    native_currency: z.number(),
    usd: z.number(),
  }),
  floor_price_in_usd_24h_percentage_change: z.number(),
  floor_price_24h_percentage_change: z.object({
    usd: z.number(),
    native_currency: z.number(),
  }),
  market_cap_24h_percentage_change: z.object({
    usd: z.number(),
    native_currency: z.number(),
  }),
  volume_24h_percentage_change: z.object({
    usd: z.number(),
    native_currency: z.number(),
  }),
  number_of_unique_addresses: z.number(),
  number_of_unique_addresses_24h_percentage_change: z.number(),
  volume_in_usd_24h_percentage_change: z.number(),
  total_supply: z.number(),
  one_day_sales: z.number(),
  one_day_sales_24h_percentage_change: z.number(),
  one_day_average_sale_price: z.number(),
  one_day_average_sale_price_24h_percentage_change: z.number(),
});

export const NftListSchema = z.object({
  id: z.string(),
  contract_address: z.string(),
  name: z.string(),
  asset_platform_id: z.string(),
  symbol: z.string(),
});

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
}
