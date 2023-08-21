import { Chain } from "wagmi";
/**
 * List of all the networks supported by Altverse
 */
export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  BSC = 56,
  BSC_TESTNET = 97,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  CELO = 42220,
  CELO_ALFAJORES = 44787,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.ROPSTEN]: "ropsten",
  [SupportedChainId.RINKEBY]: "rinkeby",
  [SupportedChainId.GOERLI]: "goerli",
  [SupportedChainId.KOVAN]: "kovan",
  [SupportedChainId.POLYGON]: "polygon",
  [SupportedChainId.POLYGON_MUMBAI]: "polygon_mumbai",
  [SupportedChainId.CELO]: "celo",
  [SupportedChainId.CELO_ALFAJORES]: "celo_alfajores",
  [SupportedChainId.ARBITRUM_ONE]: "arbitrum",
  [SupportedChainId.ARBITRUM_RINKEBY]: "arbitrum_rinkeby",
  [SupportedChainId.OPTIMISM]: "optimism",
  [SupportedChainId.OPTIMISTIC_KOVAN]: "optimistic_kovan",
  [SupportedChainId.BSC]: "binance_smart_chain",
  [SupportedChainId.BSC_TESTNET]: "binance_smart_chain_testnet",
};

const bscExplorer = { name: "BscScan", url: "https://bscscan.com" };

const bscTemplate = {
  id: 56,
  name: "BNB Smart Chain",
  network: "bsc",
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  multicall: {
    address: "0xcA11bde05977b3631167028862bE2a173976CA11",
    blockCreated: 15921452,
  },
  testnet: false,
};

export const bsc: Chain = {
  ...bscTemplate,
  rpcUrls: {
    public: "https://bsc-dataseed1.binance.org",
    default: "https://bsc-dataseed1.binance.org",
  },
};

export const bscChains: Chain[] = [
  {
    ...bscTemplate,
    rpcUrls: {
      default:
        "https://crimson-divine-hexagon.bsc.quiknode.pro/5bc8a75c2e67cf5279cd8b12b8f7ea20989baa98",
      // wss: "wss://crimson-divine-hexagon.bsc.quiknode.pro/5bc8a75c2e67cf5279cd8b12b8f7ea20989baa98",
    },
  },
  {
    ...bscTemplate,
    rpcUrls: {
      public: "https://bsc-dataseed1.binance.org",
      default: "https://bsc-dataseed1.binance.org",
    },
  },
  {
    ...bscTemplate,
    rpcUrls: {
      public: "https://bsc-dataseed2.binance.org",
      default: "https://bsc-dataseed2.binance.org",
    },
  },
  {
    ...bscTemplate,
    rpcUrls: {
      public: "https://bsc-dataseed3.binance.org",
      default: "https://bsc-dataseed3.binance.org",
    },
  },
  {
    ...bscTemplate,
    rpcUrls: {
      public: "https://bsc-dataseed4.binance.org",
      default: "https://bsc-dataseed4.binance.org",
    },
  },
];

export const bscTest: Chain = {
  id: 97,
  name: "BNB Smart Chain Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Binance Chain Native Token",
    symbol: "tBNB",
  },
  rpcUrls: {
    public: "https://data-seed-prebsc-1-s2.binance.org:8545/",
    default: "https://data-seed-prebsc-1-s2.binance.org:8545/",
    // default: "https://falling-delicate-flower.bsc-testnet.quiknode.pro/bfa212fbb758c3c830bb02e7183bcbe189af5395",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  multicall: {
    address: "0xcA11bde05977b3631167028862bE2a173976CA11",
    blockCreated: 17422483,
  },
  testnet: true,
};
