#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppProductStack } from '../lib/app-product-stack';
import { ApiEcommerceStack } from '../lib/api-ecommerce-stack';

const app = new cdk.App();

const env: cdk.Environment = {
    account: '789254738812',
    region: 'us-east-1'
}

// controle de custo utilizando tags, APIGatw
const tags = {
    cost: 'Ecommerce',
    team: 'DeveloperCode'
}

const appProductStack = new AppProductStack(app, 'AppProduct', {
    tags: tags,
    env: env
})

const apiEcommerceStack = new ApiEcommerceStack(app, 'ApiEcommerce', {
    productsFetchHandler: appProductStack.productsFetchHandler,
    tags: tags,
    env: env
});

// deixar explicito a dependência da stack
apiEcommerceStack.addDependency(appProductStack)