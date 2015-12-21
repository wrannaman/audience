
export default {
  init() {
  console.log('init!!!!!', PUBNUB);
  console.log('jq', $);
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Generate Random Number if Needed
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  var urlargs         = urlparams();
  var my_number       = PUBNUB.$('my-number');
  var my_link         = PUBNUB.$('my-number-link');
  var number          = urlargs.number || Math.floor(Math.random()*999+1);

  my_number.number    = number;
  my_number.innerHTML = ''+my_number.number;
  my_link.href        = location.href.split('?')[0] + '?call=' + number;
  my_link.innerHTML   = my_link.href;

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Update Location if Not Set
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  if (!('number' in urlargs)) {
      urlargs.number = my_number.number;
      location.href = urlstring(urlargs);
      return;
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Get URL Params
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function urlparams() {
      var params = {};
      if (location.href.indexOf('?') < 0) return params;

      PUBNUB.each(
          location.href.split('?')[1].split('&'),
          function(data) { var d = data.split('='); params[d[0]] = d[1]; }
      );

      return params;
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Construct URL Param String
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function urlstring(params) {
      return location.href.split('?')[0] + '?' + PUBNUB.map(
          params, function( key, val) { return key + '=' + val }
      ).join('&');
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Calling & Answering Service
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  var video_out = PUBNUB.$('video-display');
  var img_out   = PUBNUB.$('video-thumbnail');
  var img_self  = PUBNUB.$('video-self');

  var phone     = window.phone = PHONE({
      number        : my_number.number, // listen on this line
      publish_key   : 'pub-c-09110672-8991-4acc-b052-2596f14edf37',
      subscribe_key : 'sub-c-1b36aec0-49d2-11e5-b018-0619f8945a4f',
      ssl           : true
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Video Session Connected
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function connected(session) {
      video_out.innerHTML = '';
      video_out.appendChild(session.video);

      PUBNUB.$('number').value = ''+session.number;
      sounds.play('sound/hi');
      console.log("Hi!");
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Video Session Ended
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function ended(session) {
      set_icon('facetime-video');
      img_out.innerHTML = '';
      sounds.play('sound/goodbye');
      console.log("Bye!");
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Video Session Ended
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function set_icon(icon) {
      video_out.innerHTML = '<span class="glyphicon glyphicon-' +
          icon + '"></span>';
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Request fresh TURN servers from XirSys
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // AP SECRET 330f332e-49e0-11e5-b367-79c7e5375c3f
  function get_xirsys_servers() {
      var servers;
      $.ajax({
          type: 'POST',
          url: 'https://api.xirsys.com/getIceServers',
          data: {
              room: 'default',
              application: 'default',
              domain: 'www.pubnub-example.com',
              ident: 'pubnub',
              secret: 'dec77661-9b0e-4b19-90d7-3bc3877e64ce',
          },
          success: function(res) {
              res = JSON.parse(res);
              if (!res.e) servers = res.d.iceServers;
          },
          async: false
      });
      return servers;
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Start Phone Call
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function dial(number) {
      // Dial Number
      var session = phone.dial(number, get_xirsys_servers());

      // No Dupelicate Dialing Allowed
      if (!session) return;

      // Show Connecting Status
      set_icon('send');
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Ready to Send or Receive Calls
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  phone.ready(function(){
      // Ready To Call
      set_icon('facetime-video');

      // Auto Call
      if ('call' in urlargs) {
          var number = urlargs['call'];
          PUBNUB.$('number').value = number;
          dial(number);
      }

      // Make a Phone Call
      PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('dial'), function(){
          var number = PUBNUB.$('number').value;
          if (!number) return;
          dial(number);
      } );

      // Hanup Call
      PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('hangup'), function() {
          phone.hangup();
          set_icon('facetime-video');
      } );

      // Take Picture
      PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('snap'), function() {
          var photo = phone.snap();
          img_self.innerHTML = ' ';
          img_self.appendChild(photo.image);
          setTimeout( function() { img_self.innerHTML = ' ' }, 750 );
      } );
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Received Call Thumbnail
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function thumbnail(session) {
      img_out.innerHTML = '';
      img_out.appendChild(session.image);
      img_out.appendChild(phone.snap().image);
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Receiver for Calls
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  phone.receive(function(session){
      session.message(message);
      session.thumbnail(thumbnail);
      session.connected(connected);
      session.ended(ended);
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Chat
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  var chat_in  = PUBNUB.$('pubnub-chat-input');
  var chat_out = PUBNUB.$('pubnub-chat-output');

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Send Chat MSG and update UI for Sending Messages
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  PUBNUB.bind( 'keydown', chat_in, function(e) {
      if ((e.keyCode || e.charCode) !== 13)     return true;
      if (!chat_in.value.replace( /\s+/g, '' )) return true;

      phone.send({ text : chat_in.value });
      add_chat( my_number.number + " (Me)", chat_in.value );
      chat_in.value = '';
  } )

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Update Local GUI
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function add_chat( number, text ) {
      if (!text.replace( /\s+/g, '' )) return true;

      var newchat       = document.createElement('div');
      newchat.innerHTML = PUBNUB.supplant(
          '<strong>{number}: </strong> {message}', {
          message : safetxt(text),
          number  : safetxt(number)
      } );
      chat_out.insertBefore( newchat, chat_out.firstChild );
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // WebRTC Message Callback
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function message( session, message ) {
      add_chat( session.number, message.text );
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // XSS Prevent
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function safetxt(text) {
      return (''+text).replace( /[<>]/g, '' );
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Problem Occured During Init
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  phone.unable(function(details){
      console.log("Alert! - Reload Page.");
      console.log(details);
      set_icon('remove');
  });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // Debug Output
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  phone.debug(function(details){
        console.log('debug',details);
  });

  }
};
