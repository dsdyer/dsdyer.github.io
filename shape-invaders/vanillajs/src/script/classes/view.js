export default class View {
  constructor(options) {
    this.invaders = options.invaders;
    this.player = options.player;
    this.pellets = options.pellets;
  }
  
  explosionEffect(obj, options) {
    return new Promise((resolve, reject) => {
      obj.distance = 0;
      obj.elem.classList.add('hit');

      function animation(x, count) {
        x.positionVertical += x.elem.offsetHeight / 6;
        x.positionLeft += x.elem.offsetWidth / 6;

        x.height = x.elem.offsetHeight * 2 / 3;
        x.width = x.elem.offsetWidth * 2 / 3;
        x.render();

        if (count < 3) {
          window.setTimeout(animation, 50, x, count + 1);
          return;
        }
        resolve();
      }

      animation(obj, 0);
    });
  }

  render(obj) {
    obj.elem.style.width = obj.width;
    obj.elem.style.height = obj.height;
    obj.elem.style.left = obj.posX;
    obj.elem.style.top = obj.posY;
  }
}

