var threshold = 100;
var event = new Event('sound');

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia({
    audio: true
  },

  function(stream) {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    canvasContext = document.getElementById("myCanvas").getContext("2d");

    javascriptNode.onaudioprocess = function() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += (array[i]);
      }

      var average = Math.round(values / length);

      // console.log(Math.round(average));

      event.soundLevel = average;

      if (average > threshold) {
        c.dispatchEvent(event);
      }
    };
  },
  function(err) {
    console.log("Microphone error: " + err.name);
  });
} else {
  console.log("getUserMedia not supported");
}
