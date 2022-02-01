export const BookStatusCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Booked';
        case 2:
            return 'Assigned';
        case 3:
            return 'Collected';
        case 4:
            return 'Delivered';
        case 5:
            return 'Credited';
        default:
            return '';
    }
};

export const BookDepotStatusCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Continuing';
        case 2:
            return 'Continuing';
        case 3:
            return 'Continuing';
        case 4:
            return 'Continuing';
        case 5:
            return 'Complete';
        default:
            return '';
    }
};

export const TransactionStatusCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Wait';
        case 2:
            return 'Proceed';
        default:
            return '';
    }
};

export const TransactionTypeCase = (status: number) => {
    switch (status) {
        case 0:
            return 'GiftPay';
        case 1:
            return 'Paypal';
        case 2:
            return 'Donate';
        case 3:
            return 'Bank';
        default:
            return '';
    }
};
