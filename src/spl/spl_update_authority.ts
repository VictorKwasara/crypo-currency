import { createClient, } from "@solana/kit";
import { signerFromFile } from "@solana/kit-plugin-signer";
import { AuthorityType, tokenProgram } from "@solana-program/token";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";
import getKey from "../getKey.ts";

const client = await createClient()
  .use(signerFromFile("./keys/creator.json"))
  .use(solanaDevnetRpc())
  .use(tokenProgram());

const mint = await getKey("mint.json")
const friend = await getKey("friend.json")

const result = await client.sendTransaction([
  client.token.instructions.setAuthority({
    owned: mint.address,
    owner: client.payer,
    authorityType: AuthorityType.MintTokens,
    newAuthority: friend.address
  }),
  client.token.instructions.setAuthority({
    owned: mint.address,
    owner: client.payer,
    authorityType: AuthorityType.FreezeAccount,
    newAuthority: friend.address
  })
]);

const mintAccount = await client.token.accounts.mint.fetch(mint.address);

console.log("Mint Address:", mint.address);
console.log("mint Account:", mintAccount.data);
console.log("\nNew Authority Address:", friend.address);
console.log("\nTransaction Signature:", result.context.signature);
