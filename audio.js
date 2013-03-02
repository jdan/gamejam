audio = (function() {
  return {
    glass: function() {
      this.playChoice(['glassbreak1', 'glassbreak2'], 0.1);
    },

    ouch: function() {
      this.playChoice(['ouch'], 0.05);
    },

    whoosh: function() {
      this.playChoice(['whoosh1', 'whoosh2']);
    },

    playChoice: function(choices, volume) {
      var choice;

      volume = volume || 1;
      choice = choices[Math.floor(Math.random() * choices.length)];

      if (!game.muted) {
        this.clear(choices);
        document.getElementById(choice).volume = volume;
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