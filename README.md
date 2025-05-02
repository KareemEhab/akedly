# Akedly OTP SDK

A simple JavaScript wrapper for the [Akedly OTP service](https://akedly.io). This SDK simplifies creating, activating, and verifying OTP (One-Time Password) transactions via Akedly's API.

---

## 📦 Installation

```bash
npm install akedly
```

Or with Yarn:

```bash
yarn add akedly
```

---

## 🚀 Usage

### 1. Initial Setup

```js
import akedly from "akedly";

// Set your credentials (get them from Akedly dashboard)
akedly.setAPIKey("YOUR_API_KEY");
akedly.setPipelineID("YOUR_PIPELINE_ID");
```

### 2. Step-by-Step Flow

#### 🔹 Step 1: Create and Activate Transaction (e.g. on user signup or login trigger)

```js
async function initiateOTPFlow() {
  try {
    const transaction = await akedly.createTransaction(
      "user@example.com",
      "+201234567890"
    );

    // You can log the activatedTransaction to your backend to keep track of all transactions until they are verified
    const activatedTransaction = await akedly.activateTransaction(
      transaction.data._id
    );

    // You can store activatedTransaction.data._id to use during verification
    const transactionObjectID = activatedTransaction.data._id;

    console.log("OTP sent. Transaction ID:", transactionObjectID);

    // Now wait for the user to enter the OTP (e.g., via frontend input)
  } catch (error) {
    console.error("OTP initiation error:", error.message);
  }
}
```

#### 🔹 Step 2: Verify OTP (called when user submits the code)

```js
async function handleOTPSubmit(userEnteredOTP, transactionObjectID) {
  try {
    const result = await akedly.verifyOTP(userEnteredOTP, transactionObjectID);
    console.log("✅ OTP Verified:", result);
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }
}
```

---

## 🔧 API Reference

### `setAPIKey(APIKey: string): void`

Sets your Akedly API key. **Must be called before other methods.**

### `setPipelineID(pipelineID: string): void`

Sets your OTP pipeline ID from the Akedly dashboard.

### `createTransaction(email: string, phoneNumber: string): Promise<Object>`

Creates a new OTP transaction and returns the full transaction object.

### `activateTransaction(transactionID: string): Promise<Object>`

Activates (sends) the OTP for the given transaction.

### `verifyOTP(otp: string, transactionObjectID?: string): Promise<Object>`

Verifies the user’s OTP. If no `transactionObjectID` is passed, it will use the last activated one.

---

## 🛡️ Requirements

- Node.js `>=14`
- An account at [Akedly](https://akedly.io)

---

## 📝 License

ISC © [Akedly]

---

## 💡 Tips

- This SDK uses `axios` internally.
- Works in both **Node.js** and frontend frameworks like **React**, **Angular**, or **Vue**.
- Use the returned `_id` from `activateTransaction()` as the identifier when verifying the OTP.
