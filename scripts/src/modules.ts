import SafeApiKit from '@safe-global/api-kit'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { Signer } from 'ethers'

export const addModuleTx = async (
  safeAddress: string,
  ethAdapterOwner1: EthersAdapter,
  owner1Signer: Signer,
  moduleAddress: string,
  apiKit: SafeApiKit
) => {
  let protocolKit = await Safe.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress,
  })

  const safeTransaction = await protocolKit.createEnableModuleTx(moduleAddress)
  const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)
  const senderSignature = await protocolKit.signTransactionHash(safeTxHash)

  await apiKit.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: await owner1Signer.getAddress(),
    senderSignature: senderSignature.data,
  })
}

export const getModules = async (
  safeAddress: string,
  ethAdapterOwner1: EthersAdapter
) => {
  let protocolKit = await Safe.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress,
  })

  return await protocolKit.getModules()
}
