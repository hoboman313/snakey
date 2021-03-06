import Em from 'ember';

// represents the controls display on the page
export default Em.Component.extend({

  actions: {
    newGame: function(){
      this.sendAction('newGameClick');
    },

    toggleSound: function(){
      var soundOff = !this.get('soundOff');

      this.set('soundOff', soundOff);

      if(soundOff){
        Em.$('#game-song').trigger('pause');
      } else {
        Em.$('#game-song').trigger('play');
      }

      if(typeof(Storage) !== "undefined"){
        localStorage.setItem('snakey.soundOff', soundOff);
      }
    }
  },

  didInsertElement: function() {
    if(typeof(Storage) !== "undefined") {
      var soundOff = JSON.parse(localStorage.getItem('snakey.soundOff')) || true;

      // JSON.parse because localStorage only stores as String...weird
      if(soundOff){
        Em.$('#game-song').trigger('pause');
      } else {
        Em.$('#game-song').trigger('play');
      }

      this.set('soundOff', soundOff);
    }
  },

  score: null,

  highScore: null,

  soundOff: true,

  speedUp: false,

  infScrolling: false,

  soundClass: function(){
    if(this.get('soundOff')){
      return 'sound-off';
    } else {
      return 'sound-on';
    }
  }.property('soundOff')
});
