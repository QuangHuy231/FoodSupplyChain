import { Context, Contract, Info, Returns, Transaction  } from 'fabric-contract-api';
import { Product } from './Product';
import { User } from './User';


@Info({ title: 'SupplyChainContract', description: 'Smart Contract for Supply Chain' })
export class SupplyChainContract extends Contract {
    @Transaction()
    public async createUser(ctx: Context,userID: string, userName: string, email: string, userType: string, address: string, password: string): Promise<string> {
        const user = new User(userID, userName, email, userType, address, password)

        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));

        ctx.stub.setEvent('createUser', Buffer.from(JSON.stringify(user)));
        return "Successfully created"
    }

    @Transaction()
    public async signIn(ctx: Context, userName: string , password: string): Promise<string>{
        const userBytes = await ctx.stub.getState(userName)

        if (!userBytes || userBytes.length === 0) {
            throw new Error('Cannot find user');
        }

        if(userBytes.password !== password) {
            throw new Error("Password is incorrect");
        }

        return userBytes.toString();
    }

    @Transaction()
    public async queryUserInfo(ctx: Context, userId: string): Promise<string> {
        const userJSON = await ctx.stub.getState(userId);
        if (!userJSON || userJSON.length === 0) {
            throw new Error(`The User ${userId} does not exist`);
        }
        return userJSON.toString();
    }

    @Transaction()
    public async queryListUserByUserType(ctx: Context, userType: string): Promise<string> {
        const user = []
        const query = {
            selector:{
                docType: "User",
                UserType: userType
            }
        }
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            user.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(user);
    }

    @Transaction()
    public async CreateProduct(ctx: Context, productCode: string, productName: string, farmerId: string, plantDate: string, harvestDate: string,  images: string): Promise<void> {

        const userBytes = await ctx.stub.getState(farmerId);

        if (!userBytes || userBytes.length === 0) {
            throw new Error('Cannot find user with FamerId');
        }

        const user = JSON.parse(userBytes.toString());

        // Kiểm tra xem người dùng có phải là nong dan không
        if (user.UserType !== 'Famer') {
            throw new Error('User type must be Famer');
        } 
        // Kiểm tra xem sản phẩm đã tồn tại hay chưa
        const productExists = await this.productExists(ctx, productCode);
        if (productExists) {
            throw new Error(`Product with code ${productCode} already exists`);
        }
        const product = new Product(productCode, productName, farmerId, plantDate, harvestDate, images)
        // Lưu sản phẩm vào ledger
        await ctx.stub.putState(productCode, Buffer.from(JSON.stringify(product)));

        // Kích hoạt sự kiện "CreateProduct" để thông báo rằng sản phẩm đã được tạo
        ctx.stub.setEvent('CreateProduct', Buffer.from(JSON.stringify(product)));
    }



    @Transaction()
    public async queryProductsCreatedByFarmerNotTransferred (ctx: Context, famerId: string) : Promise<string> {
        const products = [];

        const query = {
            selector: {
                docType: "Product",
                famerId: famerId,
                status: "Created"
            }
        }

       const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            products.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(products);
    }


    @Transaction()
    public async TransferProductToProducer(ctx: Context, famerId: string, productCode: string, producerId: string): Promise<void> {
       const productString = await this.QueryProduct(ctx, productCode)

        if(!productString)
        {
            throw new Error(`The part ${productCode} does not exist`)
        }

        const producer = await ctx.stub.getState(producerId)

       if (!producer || producer.length === 0) {
            throw new Error('Cannot find Producer');
        }

        const product = JSON.parse(productString)

        if(product.famerId !== famerId){
            throw new Error("User does not have permission")
        }
         
        product.status = 'Producing';
        product.producerId = producerId;

        // Lưu sản phẩm vào ledger
        await ctx.stub.putState(productCode, Buffer.from(JSON.stringify(product)));

        // Kích hoạt sự kiện "TransferProductToProducer" để thông báo rằng sản phẩm đã được chuyển cho bên san xuat
        ctx.stub.setEvent('TransferProductToProducer', Buffer.from(JSON.stringify(product)));

    }


    @Transaction()
    public async queryProductsCreatedByFamerTransferToProducer(ctx: Context, producerId: string){
        const products = [];

        const query = {
            selector: {
                docType: "Product",
                producerId: producerId,
                status: "Producing",
            }
        }

       const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            products.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(products);
    }

    @Transaction()
    public async UpdateProductByProducer(ctx: Context, producerId:string, productCode: string, productionDate: string, expirationDate: string,  productionSteps: string,  images: string): Promise<void> {
        // Kiểm tra xem sản phẩm đã tồn tại hay không
         const productString = await this.QueryProduct(ctx, productCode)

        if(!productString)
        {
            throw new Error(`The part ${productCode} does not exist`)
        }

        const product = JSON.parse(productString)

        if(product.producerId !== producerId){
            throw new Error("User does not have permissions")
        }

        product.productionDate = productionDate;
        product.expirationDate = expirationDate;
        product.productionSteps = productionSteps;
        product.imagesProduct = images;
        product.status = 'Produced';


        // Lưu sản phẩm vào ledger
        await ctx.stub.putState(productCode, Buffer.from(JSON.stringify(product)));

        // Kích hoạt sự kiện "UpdateProductByProducer" để thông báo rằng sản phẩm đã được cập nhật
        ctx.stub.setEvent('UpdateProductByProducer', Buffer.from(JSON.stringify(product)));
    }

    @Transaction()
    public async queryProductsOfProducerNotTransfer(ctx: Context, producerId: string): Promise<string>{
        const products = [];

        const query = {
            selector: {
                docType: "Product",
                producerId: producerId,
                status: "Produced",
            }
        }

       const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            products.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(products);
    }

    @Transaction()
    public async TransferProductToTransporter(ctx: Context, producerId: string, productCode: string, transportationId: string): Promise<void> {
        // Kiểm tra xem sản phẩm đã tồn tại hay không
        const productString = await this.QueryProduct(ctx, productCode)

        if(!productString)
        {
            throw new Error(`The part ${productCode} does not exist`)
        }

        const product = JSON.parse(productString)

        if(product.producerId !== producerId){
            throw new Error("User does not have permissions")
        }

        product.transportationId = transportationId
        product.status = 'Transfer to Transporter';
        // Lưu sản phẩm vào ledger
        await ctx.stub.putState(productCode, Buffer.from(JSON.stringify(product)));

        // Kích hoạt sự kiện "TransferProductToTransporter" để thông báo rằng sản phẩm đã được chuyển cho bên vận chuyển
        ctx.stub.setEvent('TransferProductToTransporter', Buffer.from(JSON.stringify(product)));
    }



    @Transaction()
    public async queryProductsOfTransportionNotTransfer(ctx: Context, transportationId: string): Promise<string>{
        const products = [];

        const query = {
            selector: {
                docType: "Product",
                transportationId: transportationId,
                status: "Transfer to Transporter",
            }
        }

       const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            products.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(products);
    }


    @Transaction()
    public async TransferProductToRetailer(ctx: Context, transportationId: string, productCode: string, retailerId: string, vehicle: string): Promise<void> {
        // Kiểm tra xem sản phẩm đã tồn tại hay không
         const productString = await this.QueryProduct(ctx, productCode)

        if(!productString)
        {
            throw new Error(`The part ${productCode} does not exist`)
        }

        const product = JSON.parse(productString)
        if(product.transportationId !== transportationId){
            throw new Error("User does not have permission")
        }

        // Cập nhật thông tin nhà bán lẻ
        product.retailer = retailerId
        product.vehicle = vehicle

        product.status = "Received"

        // Lưu sản phẩm vào ledger
        await ctx.stub.putState(productCode, Buffer.from(JSON.stringify(product)));

        // Kích hoạt sự kiện "TransferProductToRetailer" để thông báo rằng sản phẩm đã được chuyển cho nhà bán lẻ
        ctx.stub.setEvent('TransferProductToRetailer', Buffer.from(JSON.stringify(product)));
    }

    @Transaction()
    public async queryProductInRetailer(ctx: Context, retailerId: string): Promise<string>{
        const products = [];

        const query = {
            selector: {
                docType: "Product",
                retailerId: retailerId,
                status: "Received",
            }
        }

       const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            products.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(products);
    }

    @Transaction(false)
    @Returns('boolean')
    private async productExists(ctx: Context, productCode: string): Promise<boolean> {
        const productBuffer = await ctx.stub.getState(productCode);
        return !!productBuffer && productBuffer.length > 0;
    }

    @Transaction()
    public async deleteProduct(ctx: Context, productCode: string): Promise<void> {
        const productExists = await this.productExists(ctx, productCode)
        if(!productExists){
            throw new Error(`Product with code ${productCode} does not exist`);
        }

        await ctx.stub.deleteState(productCode);
    }

    @Transaction()
    public async QueryProduct(ctx: Context, productCode: string): Promise<string> {
        const productJSON = await ctx.stub.getState(productCode);
        if (!productJSON || productJSON.length === 0) {
            throw new Error(`The product ${productCode} does not exist`);
        }
        return productJSON.toString();
    }

    @Transaction()
    public async GetAllProducts(ctx: Context): Promise<string[]> {
        const allProducts = [];

        // Lập trình truy vấn tất cả sản phẩm
        const iterator = await ctx.stub.getStateByPartialCompositeKey('Product', []);
        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let product;
            try {
                product = JSON.parse(strValue);
            } catch (err) {
                console.error(err);
                product = strValue;
            }

            allProducts.push(product);
            result = await iterator.next();
        }

        return allProducts;
    }

    @Transaction()
    @Returns('string')
    public async GetProductHistory(ctx: Context, productCode: string): Promise<string> {
        const allHistory = [];

        // Lấy lịch sử cho sản phẩm dựa trên khóa chính (productCode)
        const iterator = await ctx.stub.getHistoryForKey(productCode);
        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let historyRecord;
            try {
                historyRecord = JSON.parse(strValue);
            } catch (err) {
                console.error(err);
                historyRecord = strValue;
            }

            allHistory.push(historyRecord);
            result = await iterator.next();
        }

        return JSON.stringify(allHistory);
    }
}


