// export const contractAddress = '0xd3709132742F701F05FE3259f73D1Cc890DAB827'
// export const contractAddress = '0x749efe67e8005B06A30688F5F637Ee12CB63503A'
// export const contractAddress = '0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692'
export const contractAddress = '0xd7Ca4e99F7C171B9ea2De80d3363c47009afaC5F'
export const SEPOLIA_CHAIN_ID = 11155111
export const SEPOLIA_RPC_URL = 'https://rpc.sepolia.org'


export const SEPOLIA_NETWORK = {
  chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
}
