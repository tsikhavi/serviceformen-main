import bcrypt from 'bcrypt';

const DecryptPassword = async (hashedPassword: string, plainPassword: string): Promise<string | null> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch ? plainPassword : null;
  } catch (error) {
    console.error('Error decrypting password:', error);
    return null;
  }
};

export default DecryptPassword;
