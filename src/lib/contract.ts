import { ethers } from 'ethers'
import { contractAddress } from './constants'
import CounterABI from './Counter.json'

// 컨트랙트 메서드들을 타입 안전하게 정의
interface CounterContractMethods {
  getCounter(): Promise<bigint>
  incrementCounter(): Promise<ethers.ContractTransactionResponse>
  decrementCounter(): Promise<ethers.ContractTransactionResponse>
  resetCounter(): Promise<ethers.ContractTransactionResponse>
  owner(): Promise<string>
}

export class CounterContractService {
  private contract: (ethers.Contract & CounterContractMethods) | null = null
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.JsonRpcSigner | null = null

  async connect(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('이 함수는 브라우저에서만 실행할 수 있습니다.')
    }

    if (!window.ethereum) {
      throw new Error('MetaMask가 설치되지 않았습니다.')
    }

    this.provider = new ethers.BrowserProvider(window.ethereum)
    this.signer = await this.provider.getSigner()
    this.contract = new ethers.Contract(
      contractAddress,
      CounterABI,
      this.signer
    ) as ethers.Contract & CounterContractMethods
  }

  async getCounter(): Promise<bigint> {
    if (!this.contract) {
      throw new Error('컨트랙트에 연결되지 않았습니다.')
    }
    return await this.contract.getCounter()
  }

  async incrementCounter(): Promise<void> {
    if (!this.contract) {
      throw new Error('컨트랙트에 연결되지 않았습니다.')
    }
    const tx = await this.contract.incrementCounter()
    await tx.wait()
  }

  async decrementCounter(): Promise<void> {
    if (!this.contract) {
      throw new Error('컨트랙트에 연결되지 않았습니다.')
    }
    const tx = await this.contract.decrementCounter()
    await tx.wait()
  }

  async resetCounter(): Promise<void> {
    if (!this.contract) {
      throw new Error('컨트랙트에 연결되지 않았습니다.')
    }
    const tx = await this.contract.resetCounter()
    await tx.wait()
  }

  async getOwner(): Promise<string> {
    if (!this.contract) {
      throw new Error('컨트랙트에 연결되지 않았습니다.')
    }
    return await this.contract.owner()
  }

  async getWalletAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('지갑에 연결되지 않았습니다.')
    }
    return await this.signer.getAddress()
  }

  isConnected(): boolean {
    return this.contract !== null
  }
}

// 전역 인스턴스
export const counterService = new CounterContractService()