game = (function() {
  return {
    intervalId: null,
    state: 0,
    lane: 0,
    muted: false,
    panes: [],
    clock: 0,

    start: function() {
      var that = this;
      this.intervalId = setInterval(function() { 
        that.loop();
        that.state = (that.state % 10) + 1;
      }, 33);
    },

    pause: function() {
      if (this.intervalId)
        clearInterval(this.intervalId);
    },

    loop: function() {
      var i;

      // clear the canvas
      gfx.clear();

      // draw the panes of glass
      for (i in this.panes) {
        var pane = this.panes[i];

        if (!pane.broken && pane.lane == game.lane && pane.y > 485 && pane.y < 500) {
          pane.broken = true;
          audio.glass();

          if (Math.random() < 0.05) {
            audio.ouch();
          }
        }
        
        gfx.pane(400 + 150*pane.lane - 21, pane.y, pane.broken);
        pane.y += 6;
      }

      // draw the hero
      gfx.hero(400 + 150*this.lane - 28, 500, this.state);

      // add a pane of glass
      // if (Math.random() < 0.05) {
      //   var lane = Math.floor(Math.random() * 3) - 1;
      //   this.panes.push({ lane: lane, y: -20, broken: false });
      // }
      if ((this.clock % 200) == 0)
        this.add_pattern();

      this.clock++;

    },

    add_pattern: function() {
      var lpane = { type: 'pane', lane: -1 },
          mpane = { type: 'pane', lane: 0 },
          rpane = { type: 'pane', lane: 1 },
          i, j, y = -20,
          choice,
          to_add,
          patterns;

      patterns = [
        [],
        [],
        [],
        [lpane, lpane, lpane, lpane, lpane],
        [mpane, mpane, mpane, mpane, mpane],
        [rpane, rpane, rpane, rpane, rpane],
        [lpane, lpane, mpane, mpane, rpane, rpane],
        [rpane, rpane, mpane, mpane, lpane, lpane]
      ];

      to_add = Math.floor(Math.random() * 5) + 1;
      for (i = 0; i < to_add; i++) {
        choice = patterns[Math.floor(Math.random() * patterns.length)];
        for (j in choice) {
          this.panes.push({ broken: false, lane: choice[j].lane, y: y });
          y -= 60;
        }
      }

    }
  }
})();

$(function() {

  $('body').on('keydown', function(e) {
    switch(e.which) {
      case 37:
        if (game.lane != -1) game.lane--;
        break;
      case 39:
        if (game.lane != 1) game.lane++;
        break;
    }
  });

  $('#mute-audio').on('change', function() {
    if ($(this).is(':checked'))
      game.muted = true;
    else
      game.muted = false;
  });

  game.start();
});