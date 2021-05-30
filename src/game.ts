// NOTE: Remember to add &ENABLE_WEB3 to the url when running locally
import * as EthereumController from "@decentraland/EthereumController"
import * as EthConnect from "eth-connect"
import { getProvider } from "@decentraland/web3-provider"
import { abi } from "./abi"
import { Sound } from "./sound"
import { Door } from "./door"
import * as ui from "@dcl/ui-scene-utils"

// Config
// Example token from the contract: https://opensea.io/assets/0x10DaA9f4c0F985430fdE4959adB2c791ef2CCF83/1
// Contract address on Etherscan: https://etherscan.io/address/0x10daa9f4c0f985430fde4959adb2c791ef2ccf83
const contractAddress = "0x10daa9f4c0f985430fde4959adb2c791ef2ccf83" // Contract The Meta Key
const tokenID = 1 // Metakey Edition One - Genesis

async function doesUserHaveNFT(contractAddress: string, typeOfKey: number): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      const address = await EthereumController.getUserAccount()
      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abi)
      const contract = (await factory.at(contractAddress)) as any
      const value = await contract.balanceOf(address, typeOfKey)
      return resolve(value)
    } catch (error) {
      log(error.toString())
      reject(error.toString())
    }
  })
}

async function checkTokens() {
  let allowed = await doesUserHaveNFT(contractAddress, tokenID)
  if (Number(allowed) > 0) {
    door.playDoorOpen()
    openDoorSound.getComponent(AudioSource).playOnce()
    jazzSound.getComponent(AudioSource).volume = 1.0
  } else {
    noSign.show(1)
    accessDeniedSound.getComponent(AudioSource).playOnce()
    jazzMuffledSound.getComponent(AudioSource).volume = 1.0
  }
}

// Sounds
const openDoorSound = new Sound(new AudioClip("sounds/openDoor.mp3"), false)
const accessDeniedSound = new Sound(new AudioClip("sounds/accessDenied.mp3"), false)

// Music
const jazzMuffledSound = new Sound(new AudioClip("sounds/jazzMuffled.mp3"), true, true)
const jazzSound = new Sound(new AudioClip("sounds/jazz.mp3"), true, true)
jazzSound.getComponent(AudioSource).volume = 0.0

// Base
const base = new Entity()
base.addComponent(new GLTFShape("models/baseDarkWithCollider.glb"))
engine.addEntity(base)

// Facade
const facade = new Entity()
facade.addComponent(new GLTFShape("models/facade.glb"))
facade.addComponent(new Transform({ position: new Vector3(8, 0.05, 10) }))
facade.getComponent(Transform).rotate(Vector3.Up(), 180)
engine.addEntity(facade)

// Door
const door = new Door(new GLTFShape("models/door.glb"))
door.setParent(facade)
door.addComponent(
  new OnPointerDown(
    () => {
      checkTokens()
    },
    {
      button: ActionButton.PRIMARY,
      hoverText: "Enter Club",
      showFeedback: true,
    }
  )
)

// UI
let noSign = new ui.CenterImage("images/no-sign.png", 1, true, 0, 20, 128, 128, {
  sourceHeight: 512,
  sourceWidth: 512,
  sourceLeft: 0,
  sourceTop: 0,
})
