export type userTypes = {
    idx: number;
    userId?: string | null;
    userImage?: string | null;
    userRole: number;
    userEmail: string;
    userName?: string;
    userFirstName?: string;
    userPick?: number;
    userNickName: string;
    userAddress: string;
    userZip: string;
    userAddressMore: string;
    credit: number;
    userStatus: number;
    userBirth: string;
    userPhone: string;
    userWait?: number;
    userType: number;
    profileCheck: number;
    addressCheck: number;
    userGender: number;
    payType: number;
};

export type addressListType = {
    idx: number;
    address: string;
    lat: number;
    lot: number;
    main: number;
    moreText: string;
};
