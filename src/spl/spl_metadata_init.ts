import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import wallet from "../../keys/creator.json" with {"type": "json"};
import mintWallet from "../../keys/mint.json" with {"type": "json"};
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58";


(async () => {

  const umi = createUmi("https://api.devnet.solana.com");
  const mintKey = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(mintWallet));
  const mint = publicKey(mintKey.publicKey)


  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
  const signer = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(signer));

  try {
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };

    //change the metadata
    const data: DataV2Args = {
      name: "V currency",
      symbol: "V",
      uri: "https://gateway.irys.xyz/9Lu8G8MZHkyANCouFp78sVzMbgShmkBTU6poqbypA3H4",
      sellerFeeBasisPoints: 1,
      creators: null,
      collection: null,
      uses: null,
    }

    const args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    const tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    const result = await tx.sendAndConfirm(umi);
    console.log("signature: ", bs58.encode(Buffer.from(result.signature)));
  } catch (error) {
    console.log("error", error);
  }
})();
