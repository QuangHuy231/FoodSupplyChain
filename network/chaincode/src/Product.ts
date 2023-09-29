import {Object, Property} from 'fabric-contract-api';

export class Product {
    @Property()
    docType : string;
    @Property()
    productCode : string;

    @Property()
    productName : string;
    @Property()
    famerId: string
    @Property()
    plantDate : string;
    @Property()
    harvestDate : string;
    @Property()
    imageProductInFamers : string;
    @Property()
    status : string;
    @Property()
    producerId: string
    //ngay san xuat
    @Property()
    productionDate: string;


    //Ngay het han
    @Property()     
    expirationDate: string;

    //quy trinh san xuat: say kho;...
    @Property()       
    productionSteps: string;
    //Hinh anh san pham
    @Property()      
    imagesProduct: string;

    //thong tin van chuyen
    @Property()    
    transportationId:  string

    @Property()
    vehicle: string;

    @Property()        
    retailerId : string;

    constructor(productCode: string, productName: string, famerId: string, plantDate: string, harvestDate: string, imageProductInFamer: string){
        this.docType = "Product"
        this.productCode = productCode
        this.productName = productName
        this.famerId = famerId
        this.plantDate = plantDate,
        this.harvestDate = harvestDate,
        this.imageProductInFamers = imageProductInFamer
        this.status = "Created"
        this.producerId =  ""
        this.productionDate =  "";     
        this.expirationDate =  "";  
        this.productionSteps =  "";
        this.imagesProduct =  "";
        this.transportationId =   ""
        this.vehicle =  "";     
        this.retailerId  =  "";
    }
}



