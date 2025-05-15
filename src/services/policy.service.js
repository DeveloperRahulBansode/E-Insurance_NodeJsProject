import { where } from 'sequelize';
import { Policy } from '../models/policy.js';


//create policy
export const createPolicy = async (body) => {
    try {
        const policy = await Policy.create(body);
        return { success: true, Data: policy };
    } catch (error) {
        console.error('Error in creating Policy', error);
        return { success: false, messege: error.messege };
    }
};
