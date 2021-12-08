export class ShortItem {
    id: number;
    quantity: number;
    note: string;
    extra: ShortItem [];

    constructor() {
        this.id = 0;
        this.quantity = 0;
        this.note = '';
        this.extra = [];
    }
}
