const { getClientToken } = require('../../utils/basiqTokens');

export default async function clientToken(req, res) {
  try {
    const token = await getClientToken();
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
