class BgSlider {
  constructor(container, images) {
    this.container = container;
    this.images = images; /* eslint-disable-line */
    setInterval(this.changeBg.bind(this), 30000);
  }

  changeBg() {
    let bg = this.images[Math.floor(Math.random() * this.images.length)];
    this.container.style.backgroundImage = bg;
  }
}
export default BgSlider;
