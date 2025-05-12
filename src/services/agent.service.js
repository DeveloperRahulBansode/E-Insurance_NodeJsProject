import { Client } from '../models/client.js';
import bcrypt from 'bcrypt';


//create new user
export const newAgent = async (body) => {
  try {
    const existingAgent = await Client.findOne({ where: { email: body.email } });
    if (existingAgent) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const agentData = {
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      mobileNumber: body.mobileNumber,
    };
    console.log('Creating Agent with data:', agentData);

    const data = await Client.create(agentData);

    return {
      success: true,
      message: 'Agent created successfully...',
      agent: data,
    };
  } catch (error) {
    console.error('Error creating Agent:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};