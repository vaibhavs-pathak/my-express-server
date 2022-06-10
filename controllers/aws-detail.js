import "dotenv/config";
import {
  DescribeRegionsCommand,
  DescribeVpcsCommand,
  DescribeSubnetsCommand,
} from "@aws-sdk/client-ec2";
const { AWS_REGION } = process.env;

import AwsClient from "../libs/aws-client-library";

const getIndex = async (req, res, next) => {
  try {
    res.render("home", {
      pageTitle: "Home",
      path: "/",
    });
  } catch (err) {
    console.log("Error", err);
  }
};

const getAllAvailbleRegions = async (req, res, next) => {
  try {
    const ec2ClientObj = new AwsClient({ region: AWS_REGION });
    const ec2Client = ec2ClientObj.client;
    const data = await ec2Client.send(
      new DescribeRegionsCommand({ AllRegions: true })
    );
    const rows =
      (data &&
        data.Regions.filter((item) => item.OptInStatus !== "not-opted-in")) ||
      [];
    res.render("aws-details/region-details", {
      dataInfo: rows,
      pageTitle: "Available Regions",
      path: "/regions",
    });
  } catch (err) {
    console.log("Error", err);
  }
};

const getAllVpcsInRegion = async (req, res, next) => {
  try {
    const region = req.params.regionId;

    const ec2ClientObj = new AwsClient({ region });
    const ec2Client = ec2ClientObj.client;

    const data = await ec2Client.send(new DescribeVpcsCommand({}));
    const rows = (data && data.Vpcs) || [];
    res.render("aws-details/vpc-details", {
      dataInfo: rows,
      pageTitle: "Available VPCs In Region",
      path: "/regions",
      region: region,
    });
  } catch (err) {
    console.log("Error", err);
  }
};

const getAllSubnetsInVpc = async (req, res, next) => {
  try {
    const vpc = req.params.vpcId;
    const region = req.params.regionId;
    const ec2ClientObj = new AwsClient({ region: region });
    const ec2Client = ec2ClientObj.client;
    const data = await ec2Client.send(
      new DescribeSubnetsCommand({
        Filters: [
          {
            Name: "vpc-id",
            Values: [vpc],
          },
        ],
      })
    );
    const rows = (data && data.Subnets) || [];
    res.render("aws-details/subnet-details", {
      dataInfo: rows,
      pageTitle: "Available Subnets In Vpc",
      path: "/regions",
    });
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = {
  getIndex,
  getAllAvailbleRegions,
  getAllVpcsInRegion,
  getAllSubnetsInVpc,
};
