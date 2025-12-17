export class ProductsItemTable {
    id: number;
    item: string;
    description: string;
    price: number;

constructor(data: ProductsItemTable){
    this.id = data.id;
    this.item = data.item;
    this.description = data.description;
    this.price = data.price;
    }
}