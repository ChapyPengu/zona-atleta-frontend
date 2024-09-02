class Utilities {

  static async sleep(seconds) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(resolve, seconds * 1000)
      } catch (e) {
        reject(e)
      }
    })
  }

  static random(max) {
    return Math.floor(Math.random() * max)
  }

  static createArray(length) {
    return Array.from({ length }, (value, index) => index)
  }

  static stringIsNumber(str) {
    return !isNaN(parseInt(str))
  }

  static randomImg() {
    const imgs = [
      'pelotas.jpg',
      'labtop.jpg',
      'celular.jpg'
    ]
    return `/public/${imgs[Utilities.random(imgs.length)]}`
  }
}

export default Utilities