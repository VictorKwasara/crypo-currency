import { createClient, grindKeyPairSigner, lamports, writeKeyPairSigner } from "@solana/kit";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";
import { signerFromFile, airdropPayer } from "@solana/kit-plugin-signer";
import { tokenProgram } from "@solana-program/token";

(async () => {
  const client = await createClient()
    .use(signerFromFile("./keys/creator.json"))
    .use(
      solanaDevnetRpc()
    )
    .use(tokenProgram())


  const mint = await grindKeyPairSigner({ extractable: true, matches: /^v/i });

  const result = await client.token.instructions
    .createMint({
      newMint: mint,
      decimals: 10,
      mintAuthority: client.payer.address,
      freezeAuthority: client.payer.address
    })
    .sendTransaction();

  const mintAccount = await client.token.accounts.mint.fetch(mint.address)

  console.log("Mint Address:", mint.address);
  console.log("Mint Account: ", mintAccount.data)
  console.log("\nTransaction Signature:", result.context.signature);

  await writeKeyPairSigner(mint, "./keys/mint.json");

})()
