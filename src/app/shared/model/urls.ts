export class Urls {
  private categoryController = "API/categoryApi/";
  category = {
    getAll: `${this.categoryController}get-all-categories`,
    categoryUrlByUserAccess: `${this.categoryController}get-categoryByUserAccess`,
  };

  private invoiceController = "API/InvoiceReportApi/";
  invoice = {
    getAll: `${this.invoiceController}get-all`,
    getTotal: `${this.invoiceController}get-total`,
  };

  private inventoryController = "API/InventoryReportApi/";
  inventory = {
    getAll: `${this.inventoryController}get-all`,
    getTotal: `${this.inventoryController}get-total`,
  };

  private salesController = "API/SalesReportApi/";
  sales = {
    getAll: `${this.salesController}get-all`,
    getTotal: `${this.salesController}get-total`,
  };

  private itemController = "API/ItemApi/";
  item = {
    getAllItemsByCategoryGuid: `${this.itemController}get-category-items`,
    getAll: `${this.itemController}get-all-items`,
    getExtraItems: `${this.itemController}get-extra-items`,
  };

  private cartController = "API/ShoppingCartApi/";
  shoppingCart = {
    saveItems: `${this.cartController}save-cart-request`,
  };

  private loginController = "API/LoginApi/";
  login = {
    loginUrl: `${this.loginController}checklogin`,
  };
}
