export default class Storage {
  setItem (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(`При записи ${key} в local storage возникла ошибка`, error)
    }
  }

  getItem (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      console.log(`При записи ${key} в local storage возникла ошибка`, error)
    }
  }
}
