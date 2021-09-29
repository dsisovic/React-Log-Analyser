import { UserType } from "../enums/user-type.enum";

export interface IOverviewVisitor {
    datetime: string;
    value: UserType;
}