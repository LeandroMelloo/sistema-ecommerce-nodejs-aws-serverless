#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import { AppProductStack } from "../lib/app-product-stack";
import { ApiEcommerceStack } from "../lib/api-ecommerce-stack";

dotenv.config({ path: __dirname + "/.env" });

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.AWS_ACCOUNT_KEY,
  region: process.env.AWS_REGION_KEY,
};

// controle de custo utilizando tags, APIGatw
const tags = {
  cost: "Ecommerce",
  team: "DeveloperCode",
};

const appProductStack = new AppProductStack(app, "AppProduct", {
  tags: tags,
  env: env,
});

const apiEcommerceStack = new ApiEcommerceStack(app, "ApiEcommerce", {
  productsFetchHandler: appProductStack.productsFetchHandler,
  tags: tags,
  env: env,
});

// deixar explicito a dependência da stack
apiEcommerceStack.addDependency(appProductStack);
