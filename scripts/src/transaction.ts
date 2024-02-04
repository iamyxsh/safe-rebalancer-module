import SafeApiKit from '@safe-global/api-kit'
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { Signer } from 'ethers'

export const createTx = async (
  safeAddress: string,
  owner1Signer: Signer,
  safeTransactionData: MetaTransactionData,
  apiKit: SafeApiKit,
  ethAdapterOwner1: EthersAdapter
) => {
  let protocolKit = await Safe.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress,
  })

  const safeTransaction = await protocolKit.createTransaction({
    transactions: [safeTransactionData],
  })

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

export const getPendingTx = async (safeAddress: string, apiKit: SafeApiKit) => {
  return (await apiKit.getPendingTransactions(safeAddress)).results
}

export const confirmTx = async (
  apiKit: SafeApiKit,
  safeTxHash: string,
  ethAdapterOwner2: EthersAdapter,
  safeAddress: string
) => {
  let protocolKit = await Safe.create({
    ethAdapter: ethAdapterOwner2,
    safeAddress,
  })

  const signature = await protocolKit.signTransactionHash(safeTxHash)
  await apiKit.confirmTransaction(safeTxHash, signature.data)

  const safeTransaction = await apiKit.getTransaction(safeTxHash)
  const executeTxResponse = await protocolKit.executeTransaction(
    safeTransaction
  )
  await executeTxResponse.transactionResponse?.wait()
}
