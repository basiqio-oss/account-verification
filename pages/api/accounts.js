const axios = require('axios');
const { getServerToken } = require('../../utils/getServerToken');

// Retrieves a list of institutions. Each entry in the array is a separate institution object.
// https://api.basiq.io/reference/list-all-institutions

export default async function accounts(req, res) {
  try {
    const token = await getServerToken();

    const { data } = await axios.get(
      "https://au-api.basiq.io/users/d0f62e4d-3288-4e6c-9e84-5fe962d2e209/accounts?filter=institution.id.eq('AU00000')",
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
