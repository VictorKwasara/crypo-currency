import { createClient, generateKeyPairSigner } from "@solana/kit";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";
import { signerFromFile } from "@solana/kit-plugin-signer";

import { findAssociatedTokenPda, tokenProgram, TOKEN_PROGRAM_ADDRESS } from "@solana-program/token"
import getKey from "../getKey.ts"

const client = await createClient()
  .use(signerFromFile("./keys/creator.json"))
  .use(
    solanaDevnetRpc()
  )
  .use(tokenProgram())

const mint = await getKey("mint.json")

const [tokenAccount] = await findAssociatedTokenPda({
  mint: mint.address,
  owner: client.payer.address,
  tokenProgram: TOKEN_PROGRAM_ADDRESS
})


const result = await client.token.instructions.
  burnChecked({
    account: tokenAccount,
    mint: mint.address,
    authority: client.payer,
    amount: 25_000_000_000n,
    decimals: 10
  })
  .sendTransaction();

const mintAccount = await client.token.accounts.mint.fetch(mint.address);
const tokenAccountData = await client.token.accounts.token.fetch(tokenAccount);


console.log("Mint Address:", mint.address);
console.log("Mint Account:", mintAccount.data);
console.log("\nToken Account Address:", tokenAccount);
console.log("Token Account:", tokenAccountData.data);
console.log("\nTransaction Signature:", result.context.signature)
