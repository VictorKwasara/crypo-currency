import fs from "fs";
import path from "path";
import { createKeyPairSignerFromBytes } from "@solana/kit";


export default async function getKey(filename: string) {
  const filePath = path.join("./keys", filename);

  const fileContent = fs.readFileSync(filePath, "utf8");
  const secretKeyBytes = new Uint8Array(JSON.parse(fileContent));

  const signer = await createKeyPairSignerFromBytes(secretKeyBytes);

  console.log("Wallet Address:", signer.address);
  return signer
}

