audio = (function() {
  return {
    glass: function() {
      this.playChoice(['glassbreak1', 'glassbreak2']);
    },

    ouch: function() {
      this.playChoice(['ouch']);
    },

    playChoice: function(choices) {
      var choice;
      choice = choices[Math.floor(Math.random() * choices.length)];

      if (!game.muted) {
        this.clear(choices);
        document.getElementById(choice).play();
      }
    },

    clear: function(targets) {
      var i, a;

      for (i in targets) {
        a = document.getElementById(targets[i]);
        a.currentTime = 0;
        a.pause(); // do I need this?
      }
    }
  }
})();