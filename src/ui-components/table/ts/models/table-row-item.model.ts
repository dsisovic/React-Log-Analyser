import { TableAlignment } from "../enums/table-alignment.enum";

export interface ITableRowItem {
    data: {[key: string]: any, alignment: TableAlignment; showImage?: boolean}[];
}
