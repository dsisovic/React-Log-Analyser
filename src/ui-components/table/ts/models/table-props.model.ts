import { ITableRowItem } from "./table-row-item.model";
import { ITableHeaderItem } from "./table-header-item.model";

export interface ITableProps {
    minWidth: number;
    rows: ITableRowItem[];
    headers: ITableHeaderItem[];
}