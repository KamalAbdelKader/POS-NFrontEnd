import { Item } from './item';
import { UserInfo } from './userInfo';
export class ShoppingCartDeliveryModel {
    Items: Item[];
    OrderTypeId: number;
    UserInfo: UserInfo;

    constructor() {
        this.Items = [];
        this.OrderTypeId = 0;
        this.UserInfo = null;
    }
}
