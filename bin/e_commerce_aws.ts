#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import { ProductsAppStack } from "../lib/productsApp-stack";
import { ECommerceApiStack } from "../lib/ecommerceApi-stack";

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

const productsAppStack = new ProductsAppStack(app, "AppProduct", {
  tags: tags,
  env: env,
});

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags: tags,
  env: env,
});

// deixar explicito a dependência da stack
eCommerceApiStack.addDependency(productsAppStack);
