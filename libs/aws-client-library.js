import "dotenv/config";
import { EC2Client } from "@aws-sdk/client-ec2";
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

class AwsClient {
  constructor(config = {}) {
    this.config = {
      ...config,
      aws_access_key_id: AWS_ACCESS_KEY_ID,
      aws_secret_access_key: AWS_SECRET_ACCESS_KEY,
    };
  }

  get client() {
    return new EC2Client({ ...this.config });
  }
}

export default AwsClient;
