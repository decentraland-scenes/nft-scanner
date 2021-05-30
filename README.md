# NFT Scanner
_demo of nft-scanner scene running in preview._

![demo](https://github.com/decentraland-scenes/nft-scanner/blob/main/screenshots/nft-scanner.gif)

## Description
Checks whether the player owns a token from a particular smart contract before granting them permission to enter the club. In this example, we're checking whether the player owns a key from [The Meta Key](https://themetakey.com) project, .

## Instructions
Walk up to the door and press the <kbd>E</kbd> key to see if you can access the club. The door will open and the audio quality increases if you own the Genesis Key, which is the first key minted from this contract [contract](https://etherscan.io/address/0x10daa9f4c0f985430fde4959adb2c791ef2ccf83). Please feel free to modify the `contractAddress` along with the `tokenID` within the `game.ts` file to test other scenarios - you'll also need to update the `abi.ts` file to with the corresponding _Contract ABI_, which can be found using at https://etherscan.io/address/&ltcontract address&gt.

Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><kbd>Space</kbd> keys on your keyboard to move forward, left, backward, right and jump respectively. You can also press the <kbd>P</kbd> key to adjust the graphics settings.

## Try it out

**Install the CLI**
Download and install the Decentraland CLI by running the following command:

```
$ npm i -g decentraland
```

**Previewing the scene**
Download this example and navigate to its directory, then run:

```
$  dcl start
```
Any dependencies are installed and then the CLI opens the scene in a new browser tab.

Add the following to the end of the URL in the browser window:

```
&ENABLE_WEB3
```
For example, if the URL is `http://192.168.1.132:8000?position=0%2C0&SCENE_DEBUG_PANEL` then change it to `http://192.168.1.132:8000?position=0%2C0&SCENE_DEBUG_PANEL&ENABLE_WEB3`

> Note: Make sure you have a browser wallet installed like Metamask or Fortmatic as you'll need to be logged onto those with the network set to the `Ethereum Mainnet` in order for the scene to perform checks on your wallet address.

## Acknowledgements
- _accessDenied.mp3_ modified from https://freesound.org/people/tcpp/sounds/151309/
- _jazz.mp3_ modified from https://www.hooksounds.com/royalty-free-music/elegant-jazz/376506/
- _jazzMuffled.mp3_ modified from https://www.hooksounds.com/royalty-free-music/elegant-jazz/376506/
