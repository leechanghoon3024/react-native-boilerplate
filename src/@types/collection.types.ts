import { userTypes } from './userTypes';

export interface bagType {
    type: number;
    value: number;
}

export interface collectionTypes {
    idx: number;

    userIdx: number;

    status: number;

    driverIdx: number | null;

    depotIdx: number | null;

    bag: number | null;

    address: string | null;

    addressMore: string | null;

    addressZip: string | null;

    pickTime: string;

    pickPlace: string | null;

    createdAt: Date | null;

    updatedAt: Date | null;

    deletedAt: Date | null;

    driverTime: Date | null;

    depotTime: Date | null;

    pickImage: string | null;

    depotImage: string | null;

    comment: string | null;

    glass: number | null;

    clearPlastic: number | null;

    aluminium: number | null;

    coloredPlastic: number | null;

    hdpe: number | null;

    lpb: number | null;

    steel: number | null;

    other: number | null;

    bagUse: number | null;

    qrHash: string | null;

    lot: number | null;

    lat: number | null;

    routeIdx: number | null;

    routeOrder: number | null;

    pickDate: string | null;

    needBag: number | null;

    dogCheck: number | null;

    credit: number;

    depotReport: string[];

    depotText: string;

    user?: userTypes;
}
export interface reportTypes extends collectionTypes {
    total: number;
}
export interface codeListTypes {
    idx: number;

    code: string | null;

    createdAt: Date | null;

    pick: number | null;

    updatedAt: Date | null;

    status: number | null;
}

export interface codeDepotTypes {
    idx: number;

    code: string | null;

    createdAt: Date | null;

    pick: collectionTypes;

    updatedAt: Date | null;

    status: number | null;
}
