// "use client"

// import { ethers } from 'ethers'
// import { SEPOLIA_CHAIN_ID, SEPOLIA_NETWORK } from './constants'

// declare global {
//   interface Window {
//     ethereum?: any
//   }
// }

// export const connectWallet = async () => {
//   if (typeof window === 'undefined' || !window.ethereum) {
//     throw new Error('MetaMask가 설치되어 있지 않습니다.')
//   }

//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum)
//     const accounts = await provider.send('eth_requestAccounts', [])
//     const network = await provider.getNetwork()

//     // 🔄 SEPOLIA GA O'TKAZISH
//     if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
//       try {
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: SEPOLIA_NETWORK.chainId }],
//         })
//       } catch (switchError: any) {
//         if (switchError.code === 4902) {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [SEPOLIA_NETWORK],
//           })
//         } else {
//           throw switchError
//         }
//       }
//     }

//     const signer = await provider.getSigner()
//     return { provider, signer, address: accounts[0] }  // 🔥 MUHIM
//   } catch (error: any) {
//     throw new Error(error.message || '지갑 연결에 실패했습니다.')
//   }
// }

// export const getProvider = () => {
//   if (typeof window === "undefined") return null
//   if (!window.ethereum) return null
//   return new ethers.BrowserProvider(window.ethereum)
// }

// export const formatAddress = (address: string) => {
//   if (!address) return ''
//   return `${address.slice(0, 6)}...${address.slice(-4)}`
// }

import { ethers } from 'ethers'
import { SEPOLIA_CHAIN_ID, SEPOLIA_NETWORK } from './constants'

export const connectWallet = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask가 설치되어 있지 않습니다.')
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const network = await provider.getNetwork()

    // Sepolia 네트워크로 전환
    if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_NETWORK.chainId }],
        })
      } catch (switchError: any) {
        // 네트워크가 없으면 추가
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK],
          })
        } else {
          throw switchError
        }
      }
    }

    const signer = await provider.getSigner()
    return { provider, signer, address: accounts[0] }
  } catch (error: any) {
    throw new Error(error.message || '지갑 연결에 실패했습니다.')
  }
}

export const getProvider = () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null
  }
  return new ethers.BrowserProvider(window.ethereum)
}

export const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

declare global {
  interface Window {
    ethereum?: any
  }
}
