import { Contract, Signer, ethers } from 'ethers'
import { erc20Abi } from 'abitype/abis'

export class ERC20Contract {
  private contract: Contract
  constructor(_address: string, _signer: Signer) {
    this.contract = new Contract(_address, erc20Abi, _signer)
  }

  async returnData(amount: string, toAddress: string) {
    return this.contract.interface.encodeFunctionData('transfer', [
      toAddress,
      ethers.parseUnits(amount, await this.returnDecimal()),
    ])
  }

  async returnDecimal() {
    return await this.contract.decimals()
  }
}
