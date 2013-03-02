var gfx;

$(function() {
  gfx = (function() {
    return {
      // the canvas DOM element
      canvas: $('#canvas'),

      // the 2d context of the canvas
      ctx: this.canvas.getContext('2d'),

      // bounds of the canvas
      WIDTH: 800,
      HEIGHT: 800,

      // some sample colors
      colors: {
        BLACK:  'rgb(0, 0, 0)',
        WHITE:  'rgb(255, 255, 255)',
        BLUE:   'rgb(80, 110, 190)',
        LBLUE:  'rgb(150, 150, 250)',
        RED:    'rgb(180, 30, 35)',
        LRED:   'rgb(250, 100, 110)',
        SKIN:   'rgb(255, 245, 200)'
      },

      clear: function() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      },

      // fill a rectangle
      rect: function(x, y, width, height, color) {
        color = color || this.colors.BLACK;

        // preserve the context
        this.ctx.save();

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

        return this.ctx.restore();
      },

      // draw the hero
      hero: function(x, y, state) {
        state = (state || 1) % 10;

        var dx, dy;

        // a sine oscillator with period 10
        var osc = Math.sin((2 * Math.PI) / 10 * state);

        // left arm - oscillates between y = 0 and 12
        dx = 0;
        dy = 6 * osc + 6
        this.rect(x+dx, y+dy, 4, 8, this.colors.RED);

        // right arm - oscillates between y = 6 and 0
        dx = 24;
        dy = -6 * osc + 6;
        this.rect(x+dx, y+dy, 4, 8, this.colors.RED);

        // head
        return this.rect(x+4, y, 20, 20);
      },

      // draw a pane of glass
      pane: function(x, y, state) {
        state = (state || false);

        if (state) {
          this.rect(x, y, 15, 15, this.colors.RED);
          this.rect(x+2, y+2, 11, 11, this.colors.LRED);
        } else {
          this.rect(x, y, 15, 15, this.colors.BLUE);
          this.rect(x+2, y+2, 11, 11, this.colors.LBLUE);
        }
      }

    }
  })();

});
