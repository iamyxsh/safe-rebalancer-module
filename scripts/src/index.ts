import SafeApiKit from '@safe-global/api-kit'
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'
import dotenv from 'dotenv'
import { Contract, ethers } from 'ethers'
import { createSafe } from './safe'
import { confirmTx, createTx, getPendingTx } from './transaction'
const fs = require('fs').promises
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { ERC20Contract } from './contract'

const USDC = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'
async function main() {
  dotenv.config()

  const RPC_URL = 'https://eth-sepolia.public.blastapi.io'
  const provider = new ethers.JsonRpcProvider(RPC_URL)

  const owner1Signer = new ethers.Wallet(
    process.env.OWNER_1_PRIVATE_KEY!,
    provider
  )
  const owner2Signer = new ethers.Wallet(
    process.env.OWNER_2_PRIVATE_KEY!,
    provider
  )

  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer,
  })

  const ethAdapterOwner2 = new EthersAdapter({
    ethers,
    signerOrProvider: owner2Signer,
  })

  const apiKit = new SafeApiKit({
    chainId: 11155111n,
  })

  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

  const destination = await owner2Signer.getAddress()
  const amount = ethers.parseUnits('0.005', 'ether').toString()

  const safeAddress = await fs.readFile('info.txt', 'utf8')

  let safeTransactionData: MetaTransactionData = {
    to: destination,
    data: '0x',
    value: amount,
  }

  // await createSafe(safeFactory, owner1Signer, owner2Signer)
  // await createTx(
  //   safeAddress,
  //   owner1Signer,
  //   safeTransactionData,
  //   apiKit,
  //   ethAdapterOwner1
  // )

  let pendingTx = (await getPendingTx(safeAddress, apiKit))[0]

  //await confirmTx(apiKit, pendingTx.safeTxHash, ethAdapterOwner2, safeAddress)

  console.log('pendingTx', pendingTx)

  const contract = new ERC20Contract(USDC, owner1Signer)
  const data = await contract.returnData('10', await owner2Signer.getAddress())

  safeTransactionData = {
    to: USDC,
    data,
    value: '0',
  }

  await createTx(
    safeAddress,
    owner1Signer,
    safeTransactionData,
    apiKit,
    ethAdapterOwner1
  )

  pendingTx = (await getPendingTx(safeAddress, apiKit))[0]
  console.log('pendingTx', pendingTx)

  await confirmTx(apiKit, pendingTx.safeTxHash, ethAdapterOwner2, safeAddress)

  pendingTx = (await getPendingTx(safeAddress, apiKit))[0]
  console.log('pendingTx', pendingTx)
}

main().catch((err) => console.log('err:', err))
