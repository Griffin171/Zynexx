// Web Audio API - Piano Synth
class AudioEngine {
    constructor() {
        this.context = null;
        this.initialized = false;
    }

    init() {
        if (!this.initialized) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        }
    }

    playNote(frequency, duration = 0.6) {
        this.init();
        
        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        // Piano-like waveform
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequency, now);
        
        // ADSR Envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02); // Attack
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);  // Decay
        gainNode.gain.setValueAtTime(0.2, now + duration - 0.2); // Sustain
        gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release
        
        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    playSequence(frequencies, interval = 400) {
        frequencies.forEach((freq, i) => {
            setTimeout(() => this.playNote(freq), i * interval);
        });
    }

    playChord(frequencies, duration = 1) {
        this.init();
        
        const now = this.context.currentTime;
        
        frequencies.forEach(freq => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
        });
    }

    // Success sound
    success() {
        this.playSequence([523.25, 659.25, 783.99], 200);
    }

    // Error sound
    error() {
        this.init();
        
        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.linearRampToValueAtTime(100, now + 0.4);
        
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
        
        oscillator.start(now);
        oscillator.stop(now + 0.4);
    }

    // Ambient drone
    startDrone() {
        this.init();
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(55, this.context.currentTime); // Low A
        
        gainNode.gain.setValueAtTime(0.05, this.context.currentTime);
        
        oscillator.start();
        
        return () => {
            gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 2);
            oscillator.stop(this.context.currentTime + 2);
        };
    }
}

const audio = new AudioEngine();