const accountDTO = (account) => {
    return {
        name: account.name,
        id: account.id,
        balance: account.balance,
        product: account.class.product,
        accountNumber: account.accountNo,
        type: account.class.type
    }
  }

module.exports = {
    accountDTO
}