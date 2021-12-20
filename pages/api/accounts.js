const axios = require('axios');
const { getServerToken } = require('../../utils/basiqTokens');

// Retrieves a list of accounts. Each entry in the array is a separate account object.
// https://api.basiq.io/reference/list-all-accounts

export default async function accounts(req, res) {
  const { userId, institutionId } = req.query;
  try {
    const token = await getServerToken();

    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/accounts?filter=institution.id.eq('${institutionId}')`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(data.data);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
