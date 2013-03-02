game = (function() {
  return {
    intervalId: null,
    state: 0,
    lane: 0,
    muted: false,
    objects: [],
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
      for (i in this.objects) {
        var item = this.objects[i];

        if (item.y > gfx.HEIGHT) continue;

        if (item.type == 'pane') {
          if (!item.broken && item.lane == game.lane && item.y > 485 && item.y < 500) {
            item.broken = true;
            audio.glass();

            if (Math.random() < 0.05) {
              audio.ouch();
            }
          }
          
          gfx.pane(400 + 150*item.lane - 21, item.y, item.broken);
        } else if (item.type == 'ladder') {
          if (!item.under && item.lane == game.lane && item.y > 480 && item.y < 500) {
            audio.whoosh();
            item.under = true;
          }

          gfx.ladder(400 + 150*item.lane - 30, item.y)
        }

        item.y += 6;
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
          llad = { type: 'ladder', lane: -1 },
          mlad = { type: 'ladder', lane: 0 },
          rlad = { type: 'ladder', lane: 1 },
          i, j, y = -20,
          choice,
          to_add,
          patterns;

      patterns = [
        [lpane, lpane, lpane, lpane, lpane],
        [mpane, mpane, mpane, mpane, mpane],
        [rpane, rpane, rpane, rpane, rpane],
        [lpane, lpane, mpane, mpane, rpane, rpane],
        [rpane, rpane, mpane, mpane, lpane, lpane],
        [llad, lpane, llad, lpane],
        [mlad, mpane, mlad, mpane],
        [rlad, rpane, rlad, rpane],
        [llad, mlad, rlad]
      ];

      to_add = Math.floor(Math.random() * 5) + 1;
      for (i = 0; i < to_add; i++) {
        choice = patterns[Math.floor(Math.random() * patterns.length)];
        for (j in choice) {
          if (choice[j].type == 'pane')
            this.objects.push({ type: choice[j].type, broken: false, lane: choice[j].lane, y: y });
          else if (choice[j].type == 'ladder')
            this.objects.push({ type: choice[j].type, under: false, lane: choice[j].lane, y: y });
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