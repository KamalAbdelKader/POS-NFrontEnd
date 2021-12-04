export class Category {
  name: string;
  guid: string;
  guid_User: string;
  parent_Guid: string;
  img: number[];
  is_Sale: string;
  printer: string;
  sort1?: number;
  en_Name: string;
  question_Sandwich: string;
  userAccess: string;

  constructor() {
    this.name = '';
    this.guid = '';
    this.guid_User = '';
    this.parent_Guid = '';
    this.img = [];
    this.is_Sale = '';
    this.printer = '';
    this.sort1 = null;
    this.en_Name = '';
    this.question_Sandwich = '';
  }
}
