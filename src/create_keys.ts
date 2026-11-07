import fs from "fs"
import { generateKeyPairSigner, writeKeyPairSigner } from "@solana/kit";


(async () => {
  try {

    const creator = await generateKeyPairSigner(true)
    const friend = await generateKeyPairSigner(true)

    const dir = "./keys"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await writeKeyPairSigner(creator, `${dir}/creator.json`)
    await writeKeyPairSigner(friend, `${dir}/friend.json`)

    console.log("Fiiles written successfully!");
    console.log("creator Address: ", creator.address);
    console.log("Friend Address:", friend.address);
  } catch (e) {
    console.log("Error writing keys:", e)
  }
})()
