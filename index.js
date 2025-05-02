import axios from "axios";

class Akedly {
  constructor() {
    this.APIKey = "";
    this.pipelineID = "";
    this.transactionID = "";
    this._id = "";
    this.baseURL = "https://api.akedly.io/api/v1";
  }

  /**
   * Sets the API key for authenticating with Akedly OTP service.
   * @param {string} APIKey - Your Akedly API key.
   */
  setAPIKey(APIKey) {
    this.APIKey = APIKey;
  }

  /**
   * Sets the Pipeline ID used for OTP transactions.
   * @param {string} pipelineID - The pipeline ID provided by Akedly.
   */
  setPipelineID(pipelineID) {
    this.pipelineID = pipelineID;
  }

  /**
   * Initiates a new OTP transaction.
   * @param {string} email - The user's email.
   * @param {string} phoneNumber - The user's phone number.
   * @returns {Promise<Object>} Full transaction response.
   */
  async createTransaction(email, phoneNumber) {
    try {
      const res = await axios.post(`${this.baseURL}/transactions`, {
        APIKey: this.APIKey,
        pipelineID: this.pipelineID,
        verificationAddress: {
          email,
          phoneNumber,
        },
      });

      if (res.status === 200 && res.data.status === "success") {
        this.transactionID = res.data.data.transactionID;
        return res.data;
      }

      throw new Error(
        `Failed to create transaction. API Response: ${JSON.stringify(
          res.data
        )}`
      );
    } catch (error) {
      console.error("Create Transaction Error:", error);
      throw error;
    }
  }

  /**
   * Sends the OTP to the user after a transaction is created.
   * @param {string} transactionID - The transaction ID returned from `createTransaction`.
   * @returns {Promise<Object>} Activation response with delivery status.
   */
  async activateTransaction(transactionID = this.transactionID) {
    try {
      const res = await axios.post(
        `${this.baseURL}/transactions/activate/${transactionID}`,
        {}
      );

      if (res.status === 200 && res.data.status === "success") {
        this._id = res.data.data._id;
        return res.data;
      }

      throw new Error("OTP activation failed");
    } catch (error) {
      console.error("Activate Transaction Error:", error);
      throw error;
    }
  }

  /**
   * Verifies the OTP entered by the user.
   * @param {string} otp - The OTP code entered by the user.
   * @param {string} [transactionObjectID] - Optional ID, defaults to last activated one.
   * @returns {Promise<Object>} Verification result.
   */
  async verifyOTP(otp, transactionObjectID = this._id) {
    try {
      const res = await axios.post(
        `${this.baseURL}/transactions/verify/${transactionObjectID}`,
        { otp }
      );

      if (res.data.status === "success") {
        return res.data;
      }

      throw new Error("OTP verification failed");
    } catch (error) {
      console.error("Verify OTP Error:", error.response?.data || error.message);
      throw error;
    }
  }
}

const akedly = new Akedly();
export default akedly;
