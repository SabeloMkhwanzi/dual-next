export const filecoin = {
  id: 314159,
  name: "FIL Calibration",
  network: "filecoin",
  iconUrl:
    "https://assets.coingecko.com/coins/images/12817/small/filecoin.png?1602753933",
  iconBackground: "#333",
  nativeCurrency: {
    decimals: 18,
    name: "tFIL",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://filecoin-calibration.chainup.net/rpc/v1"],
    },
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://calibration.filfox.info/en",
    },
  },
  testnet: true,
};
