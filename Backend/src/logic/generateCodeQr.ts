import qrcode from 'qrcode';
import user from '../models/user';

export async function generateAndStoreQRCode(userId: string): Promise<string> 
{
try {
        const user = await UserModel.findById(userId);//check user
        if (!user) {
                   throw new Error('User not found');
                   }

        // Generate QR code
        const qrCodeData = `Your QR Code Data Here: ${user.secret}`;
        const qrCodeBuffer = await qrcode.toBuffer(qrCodeData);

        
        user.qrCode = qrCodeBuffer;
        await user.save(); //save in db

    
        return qrCodeData;
     } 
      catch (error) {
        console.error('Error generating and storing QR code:', error);
        throw error;
}
}