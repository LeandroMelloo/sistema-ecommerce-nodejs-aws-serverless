import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cwlogs from 'aws-cdk-lib/aws-logs'; // cw = cloudWatch

interface PropsApiEcommerceStack extends cdk.StackProps {
    productsFetchHandler: lambdaNodeJS.NodejsFunction
}

// Api do meu ecommerce como um todo
export class ApiEcommerceStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: PropsApiEcommerceStack) {
        // super é o construtor pai, passando os 3 parâmetros, scope é aonde que a stack está inserida
        super(scope, id, props)

        // geração de logs
        const logGroup = new cwlogs.LogGroup(this, 'ApiEcommerceLogs')

        // this = scope, 'ApiEcommerce' = id, props = {}
        const api = new apigateway.RestApi(this, 'ApiEcommerce', {
            restApiName: 'ApiEcommerce',      
            //cloudWatchRole: true,
            deployOptions: {
                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true, // utilizar em DEV, em Produção user: false
                    protocol: true,
                    requestTime: true,
                    resourcePath: true,
                    responseLength: true,
                    status: true,
                    caller: true,
                    user: true // utilizar em DEV, em Produção user: false
                })
            }
        })

        const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler)

        const productsResource = api.root.addResource('products') // "/products"
        productsResource.addMethod('GET', productsFetchIntegration)
    }
}