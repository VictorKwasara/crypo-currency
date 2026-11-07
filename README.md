# Create You very Own Crypto Token 


## 🚀 How to Use

Follow these steps in order to execute the pipeline locally:

```bash
# 1. Install dependencies
npm install

# 2. Create local keys (Creator and Friend) and save them
npm run keys:create

# 3. Get the Creator Address to fund it with Devnet SOL faucet
npm run keys:getcreator

# 4. Store IPFS image asset using Umi
npm image:upload

# 5. Upload Metadata to IPFS
npm spl:metadata

# 6. Initialize the token mint account and store the address
npm run spl:init

# 8. Add metadata to the token mint
npm run spl:metadata_init

# 9. Mint tokens to the Creator ATA
npm run spl:mint

# 7. Transfer tokens from Creator to Friend ATA
npm run spl:transfer

