import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// Class que representa uma stack de Produto
export class AppProductStack extends cdk.Stack {
    // readonly é utilizado para tornar uma propriedade somente de leitura
    readonly productsFetchHandler: lambdaNodeJS.NodejsFunction

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        // super é o construtor pai, passando os 3 parâmetros, scope é aonde que a stack está inserida
        super(scope, id, props)

        // this = scope, 'ProductsFetchFunction' = id, props = {}
        this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(this, 'ProductsFetchFunction', {
            functionName: 'ProductsFetchFunction',
            entry: 'lambda/products/productsFetchFunction.ts',
            handler: 'handler',
            memorySize: 128, // 128MB
            timeout: cdk.Duration.seconds(5), // tempo máximo que minha função lambda irá executar
            bundling: {
                minify: true,
                sourceMap: false
            },
        })
    }
}

