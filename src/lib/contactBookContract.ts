import { Contract, BrowserProvider, type Signer } from 'ethers'

import ContactBookABI from  '../lib/ContactBook.json' // '@/lib'는 src/lib을 가리키는 경로 별칭입니다.
import { contractAddress } from './constants'

// 🚨 여기에 배포된 컨트랙트 주소를 입력하세요.
const CONTRACT_ABI = ContactBookABI.abi
const CONTRACT_ADDRESS = contractAddress

// Contact 타입 정의
export interface Contact {
  name: string
  wallet: string
}

// 컨트랙트 인스턴스를 생성하는 함수
export const getContract = (provider: BrowserProvider): Contract => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
}

// 서명자가 있는 컨트랙트 인스턴스를 생성하는 함수
export const getContractWithSigner = (
  provider: BrowserProvider,
  signer: Signer
): Contract => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

// 연락처 추가 함수
export const addContact = async (
  provider: BrowserProvider,
  signer: Signer,
  name: string,
  wallet: string
): Promise<void> => {
  try {
    const contract = getContractWithSigner(provider, signer)
    const tx = await contract.addContact(name, wallet)
    await tx.wait()
    console.log('연락처가 성공적으로 추가되었습니다:', tx.hash)
  } catch (error) {
    console.error('연락처 추가 중 오류 발생:', error)
    throw error
  }
}

// 모든 연락처 조회 함수
export const getContacts = async (
  provider: BrowserProvider
): Promise<Contact[]> => {
  try {
    const contract = getContract(provider)
    const contacts = await contract.getContacts()

    // Contact 구조체 배열을 일반 객체 배열로 변환
    const formattedContacts: Contact[] = contacts.map(
      (contact: { name: string; wallet: string }) => ({
        name: contact.name,
        wallet: contact.wallet,
      })
    )

    return formattedContacts
  } catch (error) {
    console.error('연락처 조회 중 오류 발생:', error)
    throw error
  }
}

// 연락처 삭제 함수
export const removeContact = async (
  provider: BrowserProvider,
  signer: Signer,
  index: number
): Promise<void> => {
  try {
    const contract = getContractWithSigner(provider, signer)
    const tx = await contract.removeContact(index)
    await tx.wait()
    console.log('연락처가 성공적으로 삭제되었습니다:', tx.hash)
  } catch (error) {
    console.error('연락처 삭제 중 오류 발생:', error)
    throw error
  }
}

// 현재 계정이 컨트랙트 소유자인지 확인하는 함수
// ContactBook 컨트랙트에는 owner() 함수가 없으므로 항상 true를 반환
export const isOwner = async (): Promise<boolean> => {
  // ContactBook 컨트랙트는 모든 사용자가 연락처를 추가/삭제할 수 있도록 설계되었을 가능성이 높습니다.
  // 만약 권한 제어가 필요하다면, 컨트랙트에 owner() 함수를 추가해야 합니다.
  return true
}