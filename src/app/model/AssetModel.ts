export class AssetModel {
    id?: number;
    employeeRollNumber?: string;
    employeeName?: string;
    employeeEmail?: string;
    employeeContact?: number;
    assetDetails?: {
        id?: number,
        laptop_name: string,
        monitorNumber: number,
        lanIdNumber: string,
        laptopChargerNumber: string,
        mouseStatus: boolean,
        earPhoneStatus: boolean,
        laptopBag: boolean,
        lockerCode: string,
        keyboardNumber: string
    };
    assetLocation?: {
        id: number,
        placeId: string
    };
    status?: string;
    updatedDate?: Date;
    createdDate?: Date;
}
