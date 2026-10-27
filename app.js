const capsules = {
  "1920": {
    era: "1920 / MYSORE", date: "08 NOVEMBER 1920", title: "When the train arrived",
    description: "The station clock is five minutes slow. A whistle travels over the rooftops, and the platform gathers itself: porters, brass trunks, a child holding tight to a red ribbon.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1100&q=85", caption: "A whistle carried news before the postman did", duration: "03:42",
    narrator: 0, narration: "Mysore, nineteen twenty. The station clock is five minutes slow. A whistle travels over the rooftops, and the platform gathers itself: porters, brass trunks, a child holding tight to a red ribbon. The train arrives with a rush of steam and the smell of rain on iron. For a moment, everyone is looking in the same direction."
  },
  "1947": {
    era: "1947 / INDIA", date: "15 AUGUST 1947", title: "India wins freedom", videoDuration: "02:53",
    description: "This 2011 documentary uses archival footage to trace India's independence struggle and the upheaval of 1947. The film is a later historical account, not a 1947 broadcast.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Gandhi_in_Bihar_1947.jpg", caption: "Mahatma Gandhi in Bihar, March 1947", duration: "02:53",
    narrator: 1, narration: "Mysore, the morning of the fifteenth of August, nineteen forty-seven. Before the sun is up, the city is listening. A radio crackles in a front room. Someone has left a window open, and the sound carries into the lane. A kettle begins to sing. Footsteps hurry past. A flag rises above the rooftops, and for a quiet second, even the birds seem to pause. History does not always arrive with a drum. Sometimes it sounds like a city waking up together."
  },
  "1968": {
    era: "1968 / MYSORE", date: "03 MAY 1968", title: "Voices from the courtyard",
    description: "In the shade of a shared courtyard, the day slows down. Grandmothers trade recipes, children invent games, and every open doorway adds another voice to the evening.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=85", caption: "The whole family fit inside one frame", duration: "05:06",
    narrator: 2, narration: "Mysore, nineteen sixty-eight. By late afternoon, the courtyard has found its shade. The brass water pot is cool again. Children have turned a chalk line into a railway, and someone is calling them in for tea. From one doorway comes a recipe, from another a song. Nobody needs to knock. In this house, the evening belongs to everyone."
  },
  "1974": {
    era: "1974 / MYSORE", date: "DASARA · OCTOBER 1974", title: "A night of Dasara lights",
    description: "As evening settles over Mysore, lamps trace the palace outline. Drums carry across the grounds, and families gather to watch a procession pass through the illuminated city.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85", caption: "An evening gathering · illustrative image", duration: "03:42",
    narrator: 3, narration: "Mysore, Dasara, nineteen seventy-four. Evening gathers around the palace grounds. One by one, lamps appear along the rooftops. The first drumbeat carries across the crowd, then another answers it. Families find a place together to watch the procession pass. For a little while, the whole city seems to move to the same rhythm."
  },
  "1980": {
    era: "1980 / KARNATAKA", date: "17 OCTOBER 1980", title: "When the village sang",
    description: "The festival circle grows as a folk tune passes from one voice to the next. Hands find the rhythm, and the evening seems to hold its breath between verses.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1100&q=85", caption: "A folk tune shared beneath the festival lights", duration: "05:42",
    narrator: 4, narration: "Karnataka, nineteen eighty. The festival circle grows as the evening cools. A singer begins a familiar folk tune, and another voice joins from the edge of the crowd. Hands find the rhythm. The song passes from one voice to the next, carrying old words into the night. Between verses, the whole village seems to hold its breath."
  },
  "2000": {
    era: "2000 / MYSORE", date: "01 JANUARY 2000", title: "The turn of time",
    description: "Midnight arrives in a hundred living rooms at once. The television counts down; sparklers hiss in the street. Somewhere, a first text message crosses the new century.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1100&q=85", caption: "A new century, held in a room full of voices", duration: "04:52",
    narrator: 5, narration: "Mysore, the first minute of the year two thousand. The television counts down in a hundred living rooms at once. Three, two, one. Outside, a sparkler hisses and somebody laughs. A phone buzzes with a message that took a whole minute to send. The new century has arrived, and it sounds a little like the old one: family in the next room, voices through an open window, the city awake."
  }
};

const broadcasts = {
  independence: { title: "India wins freedom", year: "1947", duration: "02:53", narrator: 1, text: capsules["1947"].narration },
  procession: { title: "A night of Dasara lights", year: "1974", duration: "03:42", narrator: 3, text: capsules["1974"].narration },
  courtyard: { title: "Voices from the courtyard", year: "1968", duration: "05:06", narrator: 2, text: capsules["1968"].narration },
  train: { title: "When the train arrived", year: "1920", duration: "03:42", narrator: 0, text: capsules["1920"].narration },
  artifact: { title: "A Sunday afternoon", year: "1968", duration: "02:36", narrator: 4, text: "This reconstructed family recollection describes a Sunday lunch outside the family's first home. Everyone had come over, and the father insisted they stand in the shade. The little sister kept looking away because she was listening for the ice cream cart. Remembered now, the afternoon returns through the dishes, the neighbors, and a mother's laughter from inside the house." }
};

const reelSounds = {
  birds: { title: "A song before sunrise", era: "KUOPIO, FINLAND · 2026", year: "1968", duration: "02:52" },
  folk: { title: "When the village sang", era: "KARNATAKA · 1980s", year: "1980", duration: "05:42" },
  concert: { title: "An evening at the concert", era: "MYSORE · 1970s", year: "1974", duration: "08:15" }
};

let soundContext = null;
let soundMaster = null;
let soundNodes = [];
let soundTimers = [];
let soundClock = null;
let activeSoundId = null;
let soundStartedAt = 0;
let soundElapsedBase = 0;
let currentReelIndex = 0;

const player = document.querySelector(".radio-stage");
const playButton = document.querySelector("#play-button");
const playLabel = document.querySelector("#play-label");
const displayTitle = document.querySelector("#display-title");
const displayEra = document.querySelector("#display-era");
const elapsedLabel = document.querySelector("#elapsed");
const durationLabel = document.querySelector("#duration");
const toast = document.querySelector("#player-toast");
const toastTitle = document.querySelector("#toast-title");
let activeStory = broadcasts.independence;
let currentUtterance = null;
let progressTimer = null;
let archiveVideoFallbackTimer = null;
let birdVideoFallbackTimer = null;
let startedAt = 0;
let pausedAt = 0;
let isMuted = false;

function storySeconds(story) {
  const [minutes, seconds] = story.duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, "0")}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

function updateStory(story) {
  const archiveFilm = document.querySelector("#capsule-film");
  if (story.year !== "1947" && !archiveFilm.paused) {
    archiveFilm.pause();
    archiveFilm.currentTime = 0;
  }
  activeStory = story;
  displayTitle.textContent = story.title;
  displayEra.textContent = story.era || `${story.year} / ${story.year === "1947" ? "INDIA" : "MYSORE"}`;
  durationLabel.textContent = story.duration;
  elapsedLabel.textContent = "00:00";
  toastTitle.textContent = story.title;
  if (window.speechSynthesis?.speaking || window.speechSynthesis?.paused) stopStory();
}

function startProgress() {
  clearInterval(progressTimer);
  progressTimer = window.setInterval(() => {
    const elapsed = Math.min(storySeconds(activeStory), Math.floor((Date.now() - startedAt) / 1000));
    elapsedLabel.textContent = formatTime(elapsed);
    if (elapsed >= storySeconds(activeStory)) stopStory();
  }, 250);
}

function playStory(story = activeStory, forceNarration = false) {
  if (story !== activeStory) updateStory(story);
  if (activeStory.year === "1947" && !forceNarration) {
    const film = document.querySelector("#capsule-film");
    film.hidden = false;
    document.querySelector("#capsule-image").hidden = true;
    film.muted = isMuted;
    document.querySelector("#archive-film-credit").hidden = false;
    film.play().catch(() => startArchiveNarrationFallback("The archive film could not stream here. Reconstructed narration is playing; use the source credit to open the original."));
    window.clearTimeout(archiveVideoFallbackTimer);
    archiveVideoFallbackTimer = window.setTimeout(() => {
      if (!film.paused && film.readyState < 2 && activeStory.year === "1947") {
        film.pause();
        film.hidden = true;
        document.querySelector("#capsule-image").hidden = false;
        startArchiveNarrationFallback("The archive film is taking too long to load. Reconstructed narration is playing; use the source credit to open the original.");
      }
    }, 5000);
    return;
  }
  if (!("speechSynthesis" in window)) {
    toastTitle.textContent = "Audio narration is not supported in this browser";
    toast.classList.add("is-visible");
    return;
  }
  if (window.speechSynthesis.paused && currentUtterance) {
    window.speechSynthesis.resume();
    startedAt = Date.now() - pausedAt * 1000;
  } else {
    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(activeStory.text);
    const narratorProfiles = [
      { rate: 0.8, pitch: 0.78, voice: /david|george|male/i },
      { rate: 0.9, pitch: 1.08, voice: /india|ravi|veena/i },
      { rate: 0.86, pitch: 1.15, voice: /zira|female|susan/i },
      { rate: 0.82, pitch: 0.9, voice: /mark|daniel|male/i },
      { rate: 0.94, pitch: 1.2, voice: /india|heera|female/i },
      { rate: 1, pitch: 0.98, voice: /aria|guy|female/i }
    ];
    const profile = narratorProfiles[activeStory.narrator ?? 1];
    const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("en"));
    currentUtterance.voice = voices.find((voice) => profile.voice.test(voice.name)) || voices[(activeStory.narrator ?? 1) % Math.max(voices.length, 1)] || null;
    currentUtterance.rate = profile.rate;
    currentUtterance.pitch = profile.pitch;
    currentUtterance.volume = isMuted ? 0 : 1;
    currentUtterance.onend = stopStory;
    currentUtterance.onerror = stopStory;
    window.speechSynthesis.speak(currentUtterance);
    startedAt = Date.now();
  }
  player.classList.add("is-playing");
  playLabel.textContent = "Pause story";
  playButton.setAttribute("aria-label", "Pause story");
  toastTitle.textContent = activeStory.title;
  toast.classList.add("is-visible");
  startProgress();
}

function startArchiveNarrationFallback(message) {
  window.clearTimeout(archiveVideoFallbackTimer);
  const film = document.querySelector("#capsule-film");
  film.pause();
  film.hidden = true;
  document.querySelector("#capsule-image").hidden = false;
  document.querySelector("#capsule-description").textContent = message;
  playStory(activeStory, true);
}

function pauseStory() {
  const archiveFilm = document.querySelector("#capsule-film");
  if (activeStory.year === "1947" && !archiveFilm.paused) {
    archiveFilm.pause();
    return;
  }
  if (!window.speechSynthesis?.speaking) return;
  window.speechSynthesis.pause();
  pausedAt = Math.floor((Date.now() - startedAt) / 1000);
  clearInterval(progressTimer);
  player.classList.remove("is-playing");
  playLabel.textContent = "Resume story";
  playButton.setAttribute("aria-label", "Resume story");
}

function stopStory() {
  window.clearTimeout(archiveVideoFallbackTimer);
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const archiveFilm = document.querySelector("#capsule-film");
  if (!archiveFilm.paused) archiveFilm.pause();
  archiveFilm.currentTime = 0;
  clearInterval(progressTimer);
  currentUtterance = null;
  player.classList.remove("is-playing");
  playLabel.textContent = "Play story";
  playButton.setAttribute("aria-label", "Play story");
  toast.classList.remove("is-visible");
}

function togglePlayback(story = activeStory) {
  if (story !== activeStory) updateStory(story);
  if (activeStory.year === "1947") {
    if (document.querySelector("#capsule-film").paused) playStory();
    else pauseStory();
    return;
  }
  if (story !== activeStory) {
    updateStory(story);
    playStory();
  } else if (window.speechSynthesis?.speaking) {
    pauseStory();
  } else {
    playStory();
  }
}

function selectCapsule(year) {
  const capsule = capsules[year];
  document.querySelectorAll(".year-stop").forEach((button) => {
    const selected = button.dataset.year === year;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  const index = Object.keys(capsules).indexOf(year);
  document.querySelector("#timeline-progress").style.width = `${(index / (Object.keys(capsules).length - 1)) * 100}%`;
  document.querySelector("#capsule-kicker").innerHTML = `CAPSULE ${String(index + 1).padStart(2, "0")} <span>•</span> ${capsule.date}`;
  document.querySelector("#capsule-title").textContent = capsule.title;
  document.querySelector("#capsule-description").textContent = capsule.description;
  document.querySelector("#capsule-image").src = capsule.image;
  document.querySelector("#capsule-image").alt = capsule.caption;
  document.querySelector("#image-caption").textContent = capsule.caption;
  document.querySelector("#image-year").textContent = year;
  document.querySelector("#capsule-duration").textContent = capsule.videoDuration || capsule.duration;
  document.querySelector("#capsule-index").textContent = `${String(index + 1).padStart(2, "0")} / ${String(Object.keys(capsules).length).padStart(2, "0")}`;
  document.querySelector("#capsule-narrator").textContent = `RECONSTRUCTED NARRATION · VOICE ${String(capsule.narrator + 1).padStart(2, "0")}`;
  document.querySelector("#archive-film-play").hidden = year !== "1947";
  document.querySelector("#archive-film-credit").hidden = year !== "1947";
  if (year !== "1947") {
    const film = document.querySelector("#capsule-film");
    film.pause();
    film.currentTime = 0;
    film.hidden = true;
  }
  document.querySelector("#capsule-image").hidden = false;
  updateStory({ ...capsule, year, duration: capsule.videoDuration || capsule.duration, text: capsule.narration });
}

playButton.addEventListener("click", () => togglePlayback());
document.querySelector("#capsule-play").addEventListener("click", () => togglePlayback(activeStory));
document.querySelector("#rewind-button").addEventListener("click", () => {
  stopStory();
  playStory();
});
document.querySelector("#volume-button").addEventListener("click", (event) => {
  isMuted = !isMuted;
  event.currentTarget.setAttribute("aria-label", isMuted ? "Turn sound on" : "Mute sound");
  event.currentTarget.classList.toggle("is-muted", isMuted);
  document.querySelector("#capsule-film").muted = isMuted;
  if (currentUtterance) currentUtterance.volume = isMuted ? 0 : 1;
});
document.querySelector("#toast-stop").addEventListener("click", stopStory);
document.querySelectorAll(".year-stop").forEach((button) => button.addEventListener("click", () => selectCapsule(button.dataset.year)));
document.querySelector("#artifact-play").addEventListener("click", () => togglePlayback(broadcasts.artifact));
document.querySelectorAll("[data-broadcast]").forEach((button) => button.addEventListener("click", () => togglePlayback(broadcasts[button.dataset.broadcast])));
document.querySelectorAll(".map-pin").forEach((pin) => pin.addEventListener("click", () => {
  document.querySelectorAll(".map-pin").forEach((item) => item.classList.toggle("is-active", item === pin));
  document.querySelector("#map-place").textContent = pin.dataset.place;
  document.querySelector("#map-play").dataset.story = pin.dataset.story;
}));
document.querySelector("#map-play").addEventListener("click", (event) => togglePlayback(broadcasts[event.currentTarget.dataset.story || "procession"]));
document.querySelector("#echo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#echo-input");
  const memory = input.value.trim();
  if (!memory) return;
  const memories = JSON.parse(localStorage.getItem("echoes-of-times-memories") || "[]");
  memories.push({ text: memory, savedAt: new Date().toISOString() });
  localStorage.setItem("echoes-of-times-memories", JSON.stringify(memories));
  document.querySelector("#echo-status").textContent = "Your echo is saved in this browser. Thank you for adding to the archive.";
  input.value = "";
});

const reelViewport = document.querySelector("#reel-viewport");
const reelCards = [...document.querySelectorAll(".sound-reel")];

function setReelIndex(index) {
  currentReelIndex = Math.max(0, Math.min(reelCards.length - 1, index));
  reelCards[currentReelIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  document.querySelector("#reel-count").textContent = `${String(currentReelIndex + 1).padStart(2, "0")} / ${String(reelCards.length).padStart(2, "0")}`;
}

document.querySelector("#reel-previous").addEventListener("click", () => setReelIndex(currentReelIndex - 1));
document.querySelector("#reel-next").addEventListener("click", () => setReelIndex(currentReelIndex + 1));
reelViewport.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") { event.preventDefault(); setReelIndex(currentReelIndex + 1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); setReelIndex(currentReelIndex - 1); }
});
reelViewport.addEventListener("scroll", () => {
  window.requestAnimationFrame(() => {
    const viewportRect = reelViewport.getBoundingClientRect();
    const center = viewportRect.left + 20;
    const nearestIndex = reelCards.reduce((nearest, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - center);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: currentReelIndex, distance: Infinity }).index;
    currentReelIndex = nearestIndex;
    document.querySelector("#reel-count").textContent = `${String(nearestIndex + 1).padStart(2, "0")} / ${String(reelCards.length).padStart(2, "0")}`;
  });
}, { passive: true });

function getSoundContext() {
  if (!soundContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) soundContext = new AudioContextClass();
  }
  return soundContext;
}

function playTone(frequency, start, duration, type = "triangle", volume = 0.12, bend = 0) {
  if (!soundContext || !soundMaster) return;
  const oscillator = soundContext.createOscillator();
  const envelope = soundContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (bend) oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency + bend), start + duration * 0.6);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.linearRampToValueAtTime(volume, start + Math.min(0.035, duration * 0.25));
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(envelope);
  envelope.connect(soundMaster);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
  oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  soundNodes.push(oscillator);
}

function playBirdPhrase() {
  const base = soundContext.currentTime + 0.04;
  [0, 0.23, 0.61, 1.08].forEach((offset, index) => {
    playTone(2100 + index * 170, base + offset, 0.16 + (index % 2) * 0.05, "sine", 0.095, index % 2 ? -500 : 650);
  });
}

function playFolkPhrase() {
  const notes = [293.66, 349.23, 392, 440, 392, 349.23, 293.66, 261.63];
  const base = soundContext.currentTime + 0.04;
  notes.forEach((note, index) => {
    playTone(note, base + index * 0.34, 0.31, "triangle", 0.075);
    if (index === 0 || index === 4) playTone(note / 2, base + index * 0.34, 0.5, "sine", 0.035);
  });
}

function playConcertPhrase() {
  const base = soundContext.currentTime + 0.04;
  [196, 246.94, 293.66, 392].forEach((note, index) => playTone(note, base, 1.65, "sine", 0.04 + index * 0.007));
  [392, 440, 523.25, 493.88, 440, 392].forEach((note, index) => playTone(note, base + 0.45 + index * 0.48, 0.62, "triangle", 0.065));
}

function updateReelClock() {
  if (!activeSoundId) return;
  const elapsed = Math.floor(soundElapsedBase + (Date.now() - soundStartedAt) / 1000);
  const [minutes, seconds] = reelSounds[activeSoundId].duration.split(":").map(Number);
  const total = minutes * 60 + seconds;
  const time = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  document.querySelector(`[data-reel="${activeSoundId}"] .reel-time`).textContent = time;
  if (elapsed >= total) stopReelSound();
}

function stopReelSound() {
  soundTimers.forEach((timer) => window.clearInterval(timer));
  soundTimers = [];
  window.clearInterval(soundClock);
  soundClock = null;
  soundNodes.forEach((node) => { try { node.stop(); } catch { /* Already ended. */ } });
  soundNodes = [];
  const birdVideo = document.querySelector("#bird-video");
  birdVideo.pause();
  birdVideo.currentTime = 0;
  document.querySelectorAll(".sound-reel").forEach((card) => {
    card.classList.remove("is-playing");
    card.querySelector(".reel-play span:last-child").textContent = "Listen";
  });
  activeSoundId = null;
  soundElapsedBase = 0;
  document.body.classList.remove("immersive-open");
  document.querySelector("#immersive-player").classList.remove("is-open");
  document.querySelector("#immersive-player").setAttribute("aria-hidden", "true");
}

async function playReelSound(id) {
  const birdVideo = document.querySelector("#bird-video");
  if (activeSoundId === id) {
    if (id === "birds") {
      if (birdVideo.paused) {
        birdVideo.play().catch(showBirdVideoFallback);
        startBirdVideoFallbackTimer();
      }
      else birdVideo.pause();
      return;
    }
    stopReelSound();
    return;
  }
  stopReelSound();
  stopStory();
  if (id === "birds") {
    activeSoundId = id;
    birdVideo.play().catch(showBirdVideoFallback);
    startBirdVideoFallbackTimer();
    return;
  }
  const context = getSoundContext();
  if (!context) return;
  await context.resume();
  soundMaster = context.createGain();
  soundMaster.gain.value = isMuted ? 0 : 0.72;
  soundMaster.connect(context.destination);
  activeSoundId = id;
  soundElapsedBase = 0;
  soundStartedAt = Date.now();
  const card = document.querySelector(`[data-reel="${id}"]`);
  card.classList.add("is-playing");
  card.querySelector(".reel-play span:last-child").textContent = "Pause";
  const phrase = { birds: playBirdPhrase, folk: playFolkPhrase, concert: playConcertPhrase }[id];
  phrase();
  soundTimers.push(window.setInterval(phrase, id === "birds" ? 1650 : id === "folk" ? 2900 : 3600));
  soundClock = window.setInterval(updateReelClock, 250);
}

function startBirdVideoFallbackTimer() {
  window.clearTimeout(birdVideoFallbackTimer);
  birdVideoFallbackTimer = window.setTimeout(() => {
    const video = document.querySelector("#bird-video");
    if (!video.paused && video.readyState < 2) showBirdVideoFallback();
  }, 6000);
}

function showBirdVideoFallback() {
  window.clearTimeout(birdVideoFallbackTimer);
  const video = document.querySelector("#bird-video");
  video.pause();
  document.querySelector(".reel-birds").classList.remove("is-playing");
  document.querySelector('.reel-birds [data-sound="birds"] span:last-child').textContent = "Open source";
  document.querySelector(".reel-birds .reel-type span:last-child").textContent = "STREAM UNAVAILABLE · USE SOURCE LINK";
  activeSoundId = null;
}

document.querySelectorAll(".reel-play").forEach((button) => button.addEventListener("click", () => playReelSound(button.dataset.sound)));
const birdVideo = document.querySelector("#bird-video");
birdVideo.addEventListener("play", () => {
  if (activeSoundId && activeSoundId !== "birds") stopReelSound();
  stopStory();
  activeSoundId = "birds";
  document.querySelector(".reel-birds").classList.add("is-playing");
  document.querySelector('[data-sound="birds"] .reel-play span:last-child').textContent = "Pause";
});
birdVideo.addEventListener("loadeddata", () => window.clearTimeout(birdVideoFallbackTimer));
birdVideo.addEventListener("pause", () => {
  document.querySelector(".reel-birds").classList.remove("is-playing");
  document.querySelector('[data-sound="birds"] .reel-play span:last-child').textContent = birdVideo.currentTime ? "Resume" : "Listen";
});
birdVideo.addEventListener("timeupdate", () => {
  const current = formatTime(birdVideo.currentTime);
  document.querySelector('.reel-birds .reel-time').textContent = current;
  document.querySelector("#immersive-elapsed").textContent = current;
  document.querySelector("#elapsed").textContent = current;
});
birdVideo.addEventListener("durationchange", () => {
  const duration = formatTime(birdVideo.duration);
  document.querySelector(".reel-birds .reel-duration").textContent = duration;
  document.querySelector("#immersive-duration").textContent = duration;
});
birdVideo.addEventListener("ended", stopReelSound);
birdVideo.addEventListener("error", () => {
  showBirdVideoFallback();
});
const capsuleFilm = document.querySelector("#capsule-film");
capsuleFilm.addEventListener("play", () => {
  window.clearTimeout(archiveVideoFallbackTimer);
  player.classList.add("is-playing");
  playLabel.textContent = "Pause story";
  playButton.setAttribute("aria-label", "Pause story");
  toastTitle.textContent = activeStory.title;
  toast.classList.add("is-visible");
  if (Number.isFinite(capsuleFilm.duration)) durationLabel.textContent = formatTime(capsuleFilm.duration);
});
capsuleFilm.addEventListener("pause", () => {
  window.clearTimeout(archiveVideoFallbackTimer);
  player.classList.remove("is-playing");
  playLabel.textContent = capsuleFilm.currentTime ? "Resume story" : "Play story";
  playButton.setAttribute("aria-label", `${playLabel.textContent} story`);
});
capsuleFilm.addEventListener("timeupdate", (event) => {
  const current = formatTime(event.currentTarget.currentTime);
  elapsedLabel.textContent = current;
  document.querySelector("#immersive-elapsed").textContent = current;
});
capsuleFilm.addEventListener("loadeddata", () => window.clearTimeout(archiveVideoFallbackTimer));
capsuleFilm.addEventListener("error", () => startArchiveNarrationFallback("The archive film could not stream here. Reconstructed narration is playing; use the source credit to open the original."));
capsuleFilm.addEventListener("ended", stopStory);
document.querySelectorAll("[data-immersive]").forEach((button) => button.addEventListener("click", async () => {
  if (activeSoundId !== button.dataset.immersive) await playReelSound(button.dataset.immersive);
  const reel = reelSounds[button.dataset.immersive];
  document.querySelector("#immersive-title").textContent = reel.title;
  document.querySelector("#immersive-era").textContent = reel.era;
  document.querySelector("#immersive-player").classList.add("is-open");
  document.querySelector("#immersive-player").setAttribute("aria-hidden", "false");
  document.body.classList.add("immersive-open");
}));
document.querySelector("#immersive-close").addEventListener("click", () => {
  document.querySelector("#immersive-player").classList.remove("is-open");
  document.querySelector("#immersive-player").setAttribute("aria-hidden", "true");
  document.body.classList.remove("immersive-open");
});
document.querySelector("#immersive-stop").addEventListener("click", stopReelSound);
document.querySelectorAll("[data-open-year]").forEach((link) => link.addEventListener("click", () => selectCapsule(link.dataset.openYear)));

document.querySelectorAll(".archive-filter").forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  document.querySelectorAll(".archive-filter").forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".archive-item").forEach((item) => {
    item.hidden = filter !== "all" && !item.dataset.category.split(" ").includes(filter);
  });
}));

document.querySelectorAll(".reel-waveform").forEach((waveform, waveformIndex) => {
  for (let index = 0; index < 38; index += 1) {
    const bar = document.createElement("i");
    bar.style.setProperty("--bar-height", `${4 + ((index * 13 + waveformIndex * 7) % 17)}px`);
    waveform.append(bar);
  }
});