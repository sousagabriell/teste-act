import { ProductsItemTable } from "../../../../../domain/model/home/products-item-table";

export class ProductsItemTableResponse {
    id!: number;
    item!: string
    price!: number;
    description!: string

static convert(response: ProductsItemTableResponse[]): ProductsItemTable[] {
    const resp: ProductsItemTable[] = response.map(item => {
       return new ProductsItemTable({
        id: item.id,
        item: item.item,
        price: item.price,
        description: item.description,
       })
    });
    return resp;
  }
}
