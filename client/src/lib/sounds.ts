// Sound System for GEARZ OSINT Detective
// Manages all audio effects and ambient music

export class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private musicVolume: number = 0.3;
  private sfxVolume: number = 0.5;
  private isMuted: boolean = false;
  private currentMusic: HTMLAudioElement | null = null;

  constructor() {
    this.loadPreferences();
  }

  private loadPreferences() {
    const prefs = localStorage.getItem('sound_preferences');
    if (prefs) {
      const { musicVolume, sfxVolume, isMuted } = JSON.parse(prefs);
      this.musicVolume = musicVolume ?? 0.3;
      this.sfxVolume = sfxVolume ?? 0.5;
      this.isMuted = isMuted ?? false;
    }
  }

  private savePreferences() {
    localStorage.setItem('sound_preferences', JSON.stringify({
      musicVolume: this.musicVolume,
      sfxVolume: this.sfxVolume,
      isMuted: this.isMuted
    }));
  }

  // Play typing sound
  playTyping() {
    if (this.isMuted) return;
    
    // Create beep sound programmatically
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = this.sfxVolume * 0.05;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.02);
  }

  // Play mission complete sound
  playMissionComplete(success: boolean) {
    if (this.isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (success) {
      // Success chord progression
      this.playChord(audioContext, [523.25, 659.25, 783.99], 0, 0.4);
      this.playChord(audioContext, [659.25, 783.99, 987.77], 0.2, 0.6);
    } else {
      // Failure descending tones
      this.playTone(audioContext, 400, 0, 0.3);
      this.playTone(audioContext, 300, 0.15, 0.3);
    }
  }

  // Play level up fanfare
  playLevelUp() {
    if (this.isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Ascending fanfare
    this.playTone(audioContext, 523.25, 0, 0.15);
    this.playTone(audioContext, 659.25, 0.15, 0.15);
    this.playTone(audioContext, 783.99, 0.3, 0.15);
    this.playChord(audioContext, [523.25, 659.25, 783.99, 1046.50], 0.5, 0.8);
  }

  // Play achievement unlock
  playAchievement() {
    if (this.isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Sparkle effect
    this.playTone(audioContext, 1046.50, 0, 0.1);
    this.playTone(audioContext, 1318.51, 0.05, 0.1);
    this.playTone(audioContext, 1567.98, 0.1, 0.15);
  }

  // Play UI interaction sound
  playClick() {
    if (this.isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.playTone(audioContext, 1000, 0, 0.03);
  }

  // Play data processing sound
  playDataProcess() {
    if (this.isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Digital processing sound
    for (let i = 0; i < 5; i++) {
      this.playTone(audioContext, 600 + Math.random() * 400, i * 0.05, 0.04);
    }
  }

  // Play ambient cyberpunk music
  playAmbientMusic() {
    if (this.isMuted || this.currentMusic) return;
    
    // Create ambient drone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Low frequency drone
    const bass = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bass.type = 'sawtooth';
    bass.frequency.value = 55; // A1
    bassGain.gain.value = this.musicVolume * 0.1;
    bass.connect(bassGain);
    bassGain.connect(audioContext.destination);
    bass.start();
    
    // Mid frequency pad
    const pad = audioContext.createOscillator();
    const padGain = audioContext.createGain();
    pad.type = 'sine';
    pad.frequency.value = 220; // A3
    padGain.gain.value = this.musicVolume * 0.05;
    pad.connect(padGain);
    padGain.connect(audioContext.destination);
    pad.start();
    
    // Store for cleanup
    setTimeout(() => {
      bass.stop();
      pad.stop();
    }, 300000); // 5 minutes
  }

  // Helper: play single tone
  private playTone(context: AudioContext, frequency: number, startTime: number, duration: number) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = this.sfxVolume * 0.2;
    
    const now = context.currentTime;
    oscillator.start(now + startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + startTime + duration);
    oscillator.stop(now + startTime + duration);
  }

  // Helper: play chord
  private playChord(context: AudioContext, frequencies: number[], startTime: number, duration: number) {
    frequencies.forEach(freq => {
      this.playTone(context, freq, startTime, duration);
    });
  }

  // Volume controls
  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
  }

  setSFXVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.savePreferences();
    return this.isMuted;
  }

  getMusicVolume() { return this.musicVolume; }
  getSFXVolume() { return this.sfxVolume; }
  isMutedState() { return this.isMuted; }
}

// Singleton instance
export const soundManager = new SoundManager();
