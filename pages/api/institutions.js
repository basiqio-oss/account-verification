const axios = require('axios');
const { getServerToken } = require('../../utils/getServerToken');

// Retrieves a list of institutions. Each entry in the array is a separate institution object.
// https://api.basiq.io/reference/list-all-institutions

export default async function institutions(req, res) {
  try {
    const token = await getServerToken();
    const { data } = await axios.get('https://au-api.basiq.io/institutions', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
