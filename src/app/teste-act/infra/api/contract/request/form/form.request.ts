export class FormItemRequest {
    item!: string
    price!: number;
    description!: string
    constructor(data?:{
        item: string,
        price: number,
        description: string
    }) {
        this.item = data?.item ?? '';
        this.price = data?.price ?? 0;
        this.description = data?.description ?? '';
    }
}