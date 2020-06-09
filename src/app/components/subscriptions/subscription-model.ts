export class SubscriptionModel {
    min: Min[];
}

export interface Value {
    key: string;
    discount: number;
    amount: number;
    discountPercent: string;
    hourlyPrice: number;
}

export interface Package {
    productId: number;
    month: number;
    values: Value[];
}

export interface Day {
    val: number;
    packages: Package[];
}

export interface Min {
    val: number;
    days: Day[];
}

export interface RootObject {
    min: Min[];
}