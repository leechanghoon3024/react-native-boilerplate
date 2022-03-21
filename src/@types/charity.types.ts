export interface CharityListTypes {
    idx: number;

    title: string | null;

    subTitle: string | null;

    content: string | null;

    fund: number;

    userFund: number | null;

    createdAt: Date | null;

    deletedAt: Date | null;

    finishedAt: Date | null;

    mainImage: string;

    logoImage: string;
}
