const { getClientToken } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a Basiq API token with the scope of `CLIENT_ACCESS`
 *
 * https://api.basiq.io/reference/authentication
 */

export default async function clientToken(req, res) {
  try {
    const clientToken = await getClientToken();
    res.status(200).json(clientToken);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
