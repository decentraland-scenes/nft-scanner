// NOTE: remember to add &ENABLE_WEB3 to the url when running locally
import * as EthereumController from "@decentraland/EthereumController"
import * as EthConnect from "eth-connect"
import { getProvider } from "@decentraland/web3-provider"
import { abi } from "./abi"

async function doUserHaveNFT(contractAddress: string, typeOfKey: number): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      const address = await EthereumController.getUserAccount()
      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abi)
      const contract = (await factory.at(contractAddress)) as any
      const val = await contract.balanceOf(address, typeOfKey)

      return resolve(val)
    } catch (error) {
      log(error.toString())
      reject(error.toString())
    }
  })
}

async function checkTokens() {
  let allowed = await doUserHaveNFT("0x10daa9f4c0f985430fde4959adb2c791ef2ccf83", 1)
  Number(allowed) > 0 ? log("Let Player In") : log("Refuse Player Entry")
}

// Button
const box = new Entity()
box.addComponent(new BoxShape())
box.addComponent(new Transform({ position: new Vector3(8, 1, 8) }))
box.addComponent(
  new OnPointerDown(
    () => {
      checkTokens()
    },
    {
      showFeedback: true,
      hoverText: "Check Tokens",
    }
  )
)
engine.addEntity(box)
