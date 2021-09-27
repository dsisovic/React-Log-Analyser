import { UserLogFileType } from "../enums/user-log-file-type.enum";
import { UserLogDeviceType } from "../enums/user-log-device-type.enum";

export interface IUserLog {
    country: string;
    duration: string;
    datetime: string;
    filetTypeUI: string;
    fileType: UserLogFileType;
    deviceType: UserLogDeviceType;
}
