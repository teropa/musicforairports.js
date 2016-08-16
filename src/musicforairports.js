const SAMPLE_LIBRARY = {
  'Grand Piano': [
    { note: 'A',  octave: 4, file: 'Samples/Grand Piano/piano-f-a4.wav' },
    { note: 'A',  octave: 5, file: 'Samples/Grand Piano/piano-f-a5.wav' },
    { note: 'A',  octave: 6, file: 'Samples/Grand Piano/piano-f-a6.wav' },
    { note: 'C',  octave: 4, file: 'Samples/Grand Piano/piano-f-c4.wav' },
    { note: 'C',  octave: 5, file: 'Samples/Grand Piano/piano-f-c5.wav' },
    { note: 'C',  octave: 6, file: 'Samples/Grand Piano/piano-f-c6.wav' },
    { note: 'D#',  octave: 4, file: 'Samples/Grand Piano/piano-f-d#4.wav' },
    { note: 'D#',  octave: 5, file: 'Samples/Grand Piano/piano-f-d#5.wav' },
    { note: 'D#',  octave: 6, file: 'Samples/Grand Piano/piano-f-d#6.wav' },
    { note: 'F#',  octave: 4, file: 'Samples/Grand Piano/piano-f-f#4.wav' },
    { note: 'F#',  octave: 5, file: 'Samples/Grand Piano/piano-f-f#5.wav' },
    { note: 'F#',  octave: 6, file: 'Samples/Grand Piano/piano-f-f#6.wav' }
  ]
};

const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const LOOPS = [
  {instrument: 'Grand Piano', note: 'F4',  duration: 19.7, delay: 4},
  {instrument: 'Grand Piano', note: 'Ab4', duration: 17.8, delay: 8.1},
  {instrument: 'Grand Piano', note: 'C5',  duration: 21.3, delay: 5.6},
  {instrument: 'Grand Piano', note: 'Db5', duration: 18.5, delay: 12.6},
  {instrument: 'Grand Piano', note: 'Eb5', duration: 20.0, delay: 9.2},
  {instrument: 'Grand Piano', note: 'F5',  duration: 20.0, delay: 14.1},
  {instrument: 'Grand Piano', note: 'Ab5', duration: 17.7, delay: 3.1}
];

const LANE_COLOR = 'rgba(220, 220, 220, 0.3)';
const SOUND_COLOR = '#ED146F';

let audioContext = new AudioContext();
let sampleCache = {};

let canvas = document.getElementById('music-for-airports');
let context = canvas.getContext('2d');

// Control variable, set to start time when playing begins
let playingSince = null;

function fetchSample(path) {
  sampleCache[path] = sampleCache[path] || fetch(encodeURIComponent(path))
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
  return sampleCache[path];
}

function noteValue(note, octave) {
  return octave * 12 + OCTAVE.indexOf(note);
}

function getNoteDistance(note1, octave1, note2, octave2) {
  return noteValue(note1, octave1) - noteValue(note2, octave2);
}

function getNearestSample(sampleBank, note, octave) {
  let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
    let distanceToA = Math.abs(getNoteDistance(note, octave, sampleA.note, sampleA.octave));
    let distanceToB = Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
    return distanceToA - distanceToB;
  });
  return sortedBank[0];
}

function flatToSharp(note) {
  switch (note) {
    case 'Bb': return 'A#';
    case 'Db': return 'C#';
    case 'Eb': return 'D#';
    case 'Gb': return 'F#';
    case 'Ab': return 'G#';
    default:   return note;
  }
}

function getSample(instrument, noteAndOctave) {
  let [, requestedNote, requestedOctave] = /^(\w[b\#]?)(\d)$/.exec(noteAndOctave);
  requestedOctave = parseInt(requestedOctave, 10);
  requestedNote = flatToSharp(requestedNote);
  let sampleBank = SAMPLE_LIBRARY[instrument];
  let nearestSample = getNearestSample(sampleBank, requestedNote, requestedOctave);
  return fetchSample(nearestSample.file).then(audioBuffer => ({
    audioBuffer: audioBuffer,
    distance: getNoteDistance(requestedNote, requestedOctave, nearestSample.note, nearestSample.octave)
  }));
}

function playSample(instrument, note, destination, delaySeconds = 0) {
  getSample(instrument, note).then(({audioBuffer, distance}) => {
    let playbackRate = Math.pow(2, distance / 12);
    let bufferSource = audioContext.createBufferSource();

    bufferSource.buffer = audioBuffer;
    bufferSource.playbackRate.value = playbackRate;

    bufferSource.connect(destination);
    bufferSource.start(audioContext.currentTime + delaySeconds);
  });
}

function render() {
  context.clearRect(0, 0, 1000, 1000);

  context.strokeStyle = '#888';
  context.lineWidth = 1;
  context.moveTo(325, 325);
  context.lineTo(650, 325);
  context.stroke();

  context.lineWidth = 30;
  context.lineCap = 'round';
  let radius = 280;
  for (const {duration, delay} of LOOPS) {
    const size = Math.PI * 2 / duration;
    const offset = playingSince ? audioContext.currentTime - playingSince : 0;
    const startAt = (delay - offset) * size;
    const endAt = (delay + 0.01 - offset) * size;

    context.strokeStyle = LANE_COLOR;
    context.beginPath();
    context.arc(325, 325, radius, 0, 2 * Math.PI);
    context.stroke();

    context.strokeStyle = SOUND_COLOR;
    context.beginPath();
    context.arc(325, 325, radius, startAt, endAt);
    context.stroke();

    radius -= 35;
  }
  if (playingSince) {
    requestAnimationFrame(render);
  } else {
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    context.beginPath();
    context.moveTo(235, 170);
    context.lineTo(485, 325);
    context.lineTo(235, 455);
    context.lineTo(235, 170);
    context.fill();
  }
}

function startLoop({instrument, note, duration, delay}, nextNode) {
  playSample(instrument, note, nextNode, delay);
  return setInterval(
    () => playSample(instrument, note, nextNode, delay),
    duration * 1000
  );
}

fetchSample('Samples/AirportTerminal.wav').then(convolverBuffer => {

  let convolver, runningLoops;

  canvas.addEventListener('click', () => {
    if (playingSince) {
      convolver.disconnect();
      runningLoops.forEach(l => clearInterval(l));
      playingSince = null;
    } else {
      convolver = audioContext.createConvolver();
      convolver.buffer = convolverBuffer;
      convolver.connect(audioContext.destination);
      playingSince = audioContext.currentTime;
      runningLoops = LOOPS.map(loop => startLoop(loop, convolver));
    }
    render();
  });

  render();
});
