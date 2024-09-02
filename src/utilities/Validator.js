class Validator {

  static validateUsername(username) {
    return username.length > 4
  }

  static validateEmail(email) {
    return email.length > 6 && email.includes('@') && email.includes('.')
  }

  static validatePasswordForLogin(password) {
    return password.length > 8
  }

  static validatePasswordForRegister(password) {
    let counterNumbers = 0
    for (const char of password) {
      if (!isNaN(char)) {
        counterNumbers++
      }
    }
    return password.length > 8 && counterNumbers > 0
  }

  static validateLogin(email, password) {
    return this.validateEmail(email) && this.validatePasswordForLogin(password)
  }

  static validateRegister(username, email, password, passwordRepeat) {
    return this.validateUsername(username) && this.validateEmail(email) && this.validatePasswordForRegister(password) && password === passwordRepeat
  }
}

export default Validator