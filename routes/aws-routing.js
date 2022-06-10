const express = require("express");

const router = express.Router();

const {
  getIndex,
  getAllAvailbleRegions,
  getAllVpcsInRegion,
  getAllSubnetsInVpc,
} = require("../controllers/aws-detail");

router.get("/", getIndex);
router.get("/regions", getAllAvailbleRegions);
router.get("/:regionId/vpcs", getAllVpcsInRegion);
router.get("/:regionId/:vpcId/subnets", getAllSubnetsInVpc);

module.exports = router;
