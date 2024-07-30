export interface ItemI {
    id: number;
    name: string;
    description: string;
    quantity: number | string;
    purchased: boolean;
}

export type CreateItemParams = Omit<ItemI, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateItemParams = Omit<ItemI, 'id' | 'createdAt' | 'updatedAt'>;
