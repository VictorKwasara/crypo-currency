import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

import wallet from "../../keys/creator.json" with {"type": "json"};

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

(async () => {

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
  const signer = createSignerFromKeypair(umi, keypair);

  umi.use(
    irysUploader({
      address: "https://devnet.irys.xyz/",
    }),
  );

  umi.use(signerIdentity(signer));

  try {
    //chanege image path to your image path
    const image = await readFile("./src/images/v.png");

    //change the image name and mime type
    const file = createGenericFile(image, "v.png", { contentType: "image/png" })

    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log(error);
  }
})();
