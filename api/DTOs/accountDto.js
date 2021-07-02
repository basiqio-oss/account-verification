const accountDTO = (account) => {
    return {
        name: account.name,
        id: account.id,
        balance: account.balance,
        product: account.class.product,
        accountNumber: account.accountNo
    }
  }

module.exports = {
    accountDTO
}