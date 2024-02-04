import { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit'
import { Signer } from 'ethers'
import fs from 'fs'

export const createSafe = async (
  safeFactory: SafeFactory,
  owner1Signer: Signer,
  owner2Signer: Signer
) => {
  const safeAccountConfig: SafeAccountConfig = {
    owners: [await owner1Signer.getAddress(), await owner2Signer.getAddress()],
    threshold: 2,
  }

  const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

  const safeAddress = await protocolKitOwner1.getAddress()

  fs.writeFile('info.txt', safeAddress, {}, (err) => {
    if (err) {
      console.error('Error writing to file:', err)
    } else {
      console.log('Data has been written to the file successfully.')
    }
  })
}
