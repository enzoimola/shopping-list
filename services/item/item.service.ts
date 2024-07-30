import { ApiUrls } from '@/enums/api/api';
import { createApiMiddleware } from '@/services/createApiMiddleware';
import { CreateItemParams, ItemI, UpdateItemParams } from '@/models/interfaces/item.interface';

export const getItemList = async (): Promise<Array<ItemI>> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.get(ApiUrls.SHOPPING_LIST);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};

export const deleteItem = async (id: number): Promise<boolean> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.delete(ApiUrls.DELETE_ITEM + id);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};

export const addNewItem = async (body: CreateItemParams): Promise<ItemI> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.post(ApiUrls.SHOPPING_LIST, body);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};

export const updateItem = async (id: number, body: UpdateItemParams): Promise<ItemI> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.put(`${ApiUrls.SHOPPING_LIST}/${id}`, body);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};
