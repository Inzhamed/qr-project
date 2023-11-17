import qrcode from 'qrcode';
import UserModel from '../models/user';

export async function generateAndStoreQRCode(userId: string): Promise<void> 
{
try {
        const User = await UserModel.findById(userId);//check user if exist
        if (!User) {
                   throw new Error('User not found');
                   }

        // Generate QR code
        const qrCodeData = `Your QR Code Data Here: ${User.secret}`;
        const qrCodeBuffer = await qrcode.toBuffer(qrCodeData);

        
        User.qrcode = qrCodeBuffer
        await User.save(); //save in db

    
     } 
      catch (error) {
        console.error('Error generating and storing QR code:', error);
        throw error;
}
}