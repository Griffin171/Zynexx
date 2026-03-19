/*
    OMORI: WHITE SPACE
    A mysterious puzzle experience
    
    Full i18n support: PT-BR, EN, ES-AR
    All puzzles functional and bug-free
*/

// =====================================================
// TRANSLATIONS / TRADUÇÕES
// =====================================================

const translations = {
    pt: {
        'sketchbook': 'CADERNO',
        'hint-explore': 'Clique nos objetos para explorar',
        'memory-title': 'Você se lembra?',
        'photo1': 'Verão',
        'photo2': 'Recital',
        'photo-click': '[ Clique para virar ]',
        'cipher-hint': 'cifra de césar',
        'memory-placeholder': '...',
        'memory-hint': 'Digite o que você descobriu',
        'stairs-title': 'Qual degrau mudou tudo?',
        'stairs-hint': 'Pense na data da foto anterior... 12.25',
        'piano-hint': 'Toque o último acorde que ela tocou: E - G - B',
        'truth-question': 'Feche seus olhos...',
        'truth-placeholder': '',
        'truth-hint': 'Como você diz "boa noite" em japonês?',
        'word1': 'lembrar',
        'word2': 'escadas',
        'word3': 'dezembro',
        'word4': 'dormir',
        'word5': 'sonho',
        'end-title': 'Você se lembrou.',
        'end-quote': '"Eu preciso te contar algo."',
        'credits1': 'Obrigado por lembrar.',
        'credits2': 'Feche seus olhos, você estará aqui logo.',
    },
    en: {
        'sketchbook': 'SKETCHBOOK',
        'hint-explore': 'Click on objects to explore',
        'memory-title': 'Do you remember?',
        'photo1': 'Summer',
        'photo2': 'Recital',
        'photo-click': '[ Click to flip ]',
        'cipher-hint': 'caesar cipher',
        'memory-placeholder': '...',
        'memory-hint': 'Type what you discovered',
        'stairs-title': 'Which step changed everything?',
        'stairs-hint': 'Think about the date from the previous photo... 12.25',
        'piano-hint': 'Play the last chord she played: E - G - B',
        'truth-question': 'Close your eyes...',
        'truth-placeholder': '',
        'truth-hint': 'How do you say "good night" in Japanese?',
        'word1': 'remember',
        'word2': 'stairs',
        'word3': 'december',
        'word4': 'sleep',
        'word5': 'dream',
        'end-title': 'You remembered.',
        'end-quote': '"I have to tell you something."',
        'credits1': 'Thank you for remembering.',
        'credits2': 'Close your eyes, you\'ll be here soon.',
    },
    es: {
        'sketchbook': 'CUADERNO',
        'hint-explore': 'Hacé clic en los objetos para explorar',
        'memory-title': '¿Te acordás?',
        'photo1': 'Verano',
        'photo2': 'Recital',
        'photo-click': '[ Hacé clic para dar vuelta ]',
        'cipher-hint': 'cifrado césar',
        'memory-placeholder': '...',
        'memory-hint': 'Escribí lo que descubriste',
        'stairs-title': '¿Qué escalón cambió todo?',
        'stairs-hint': 'Pensá en la fecha de la foto anterior... 12.25',
        'piano-hint': 'Tocá el último acorde que ella tocó: E - G - B',
        'truth-question': 'Cerrá tus ojos...',
        'truth-placeholder': '',
        'truth-hint': '¿Cómo se dice "buenas noches" en japonés?',
        'word1': 'recordar',
        'word2': 'escaleras',
        'word3': 'diciembre',
        'word4': 'dormir',
        'word5': 'sueño',
        'end-title': 'Te acordaste.',
        'end-quote': '"Tengo que contarte algo."',
        'credits1': 'Gracias por recordar.',
        'credits2': 'Cerrá tus ojos, estarás acá pronto.',
    }
};

let currentLang = 'pt';

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function t(key) {
    return translations[currentLang][key] || key;
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    updateTranslations();
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    console.log(`Language switched to: ${lang}`);
}

function switchScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    setTimeout(() => {
        document.getElementById(sceneId).classList.add('active');
    }, 300);
}

// =====================================================
// GAME STATE
// =====================================================

const game = {
    stage: 0,
    clickOrder: [],
    correctOrder: ['bulb', 'sketchbook', 'mewo', 'tissues', 'knife'],
    pianoSequence: [],
    correctPiano: ['E', 'G', 'B'],
    interactions: 0,
    photoFlipped: false
};

// =====================================================
// CONSOLE MESSAGES
// =====================================================

console.clear();
console.log('%c WHITE SPACE ', 'background: #000; color: #fff; font-size: 24px; padding: 10px;');
console.log('%c You have been living here for as long as you can remember. ', 'color: #666; font-size: 12px;');
console.log(' ');
console.log('%c Something is different today... ', 'color: #999; font-size: 11px; font-style: italic;');
console.log(' ');
console.log('%c [SOLUTIONS - Don\'t look if you want to solve it yourself!] ', 'color: #ff0000; font-size: 12px; font-weight: bold;');
console.log(' ');
console.log('%c Stage 0: Click LIGHTBULB → SKETCHBOOK → MEWO → TISSUES → KNIFE ', 'color: #333; font-size: 9px;');
console.log('%c Stage 1: Answer "truth", "behind" or "behind you" ', 'color: #333; font-size: 9px;');
console.log('%c Stage 2: Click the 12th stair (date: 12.25) ', 'color: #333; font-size: 9px;');
console.log('%c Stage 3: Play piano keys E, G, B (3rd, 5th, 7th keys) ', 'color: #333; font-size: 9px;');
console.log('%c Stage 4: Type "oyasumi" (goodnight in Japanese) ', 'color: #333; font-size: 9px;');
console.log(' ');
console.log('%c Easter eggs: Type "mari", "basil", "something" anywhere ', 'color: #9370db; font-size: 9px;');

// =====================================================
// STAGE 0: WHITE SPACE
// =====================================================

function initWhiteSpace() {
    const bulb = document.getElementById('bulb');
    const sketchbook = document.getElementById('sketchbook');
    const mewo = document.getElementById('mewo');
    const knife = document.getElementById('knife');
    const tissues = document.getElementById('tissues');
    const door = document.getElementById('white-door');
    const something = document.getElementById('something');

    const items = [
        { el: bulb, id: 'bulb' },
        { el: sketchbook, id: 'sketchbook' },
        { el: mewo, id: 'mewo' },
        { el: knife, id: 'knife' },
        { el: tissues, id: 'tissues' }
    ];

    items.forEach(item => {
        item.el.addEventListener('click', () => {
            game.interactions++;
            game.clickOrder.push(item.id);
            
            // Visual feedback
            item.el.style.transform = item.el.style.transform ? '' : 'scale(1.1)';
            setTimeout(() => item.el.style.transform = '', 300);
            
            // Play subtle sound
            audio.playNote(440 + (game.interactions * 50), 0.2);
            
            // Show Something after some clicks
            if (game.interactions > 3) {
                something.classList.add('watching');
            }
            
            checkWhiteSpaceSequence();
        });
    });

    function checkWhiteSpaceSequence() {
        const correct = game.clickOrder.every((id, i) => id === game.correctOrder[i]);
        
        if (!correct) {
            if (game.clickOrder.length >= 3) {
                console.log('%c Wrong sequence. Try again. ', 'color: #ff4444;');
                audio.error();
                game.clickOrder = [];
            }
            return;
        }
        
        if (game.clickOrder.length === game.correctOrder.length) {
            console.log('%c Sequence complete! The door appears... ', 'color: #4CAF50; font-size: 14px;');
            audio.success();
            
            setTimeout(() => {
                door.classList.remove('hidden');
                door.querySelector('.door-frame').addEventListener('click', () => {
                    audio.playChord([261.63, 329.63, 392.00]);
                    setTimeout(() => {
                        switchScene('memory-lane');
                        game.stage = 1;
                    }, 1000);
                });
            }, 1500);
        }
    }
}

// =====================================================
// STAGE 1: MEMORY LANE
// =====================================================

function initMemoryLane() {
    const input = document.getElementById('memory-answer');
    const photo4 = document.querySelectorAll('.photo')[3];
    
    // Photo flip functionality
    if (photo4) {
        photo4.addEventListener('click', () => {
            if (!game.photoFlipped) {
                photo4.querySelector('.photo-front').classList.add('hidden');
                photo4.querySelector('.photo-image').classList.remove('hidden');
                game.photoFlipped = true;
                audio.playNote(523.25, 0.3);
            }
        });
    }
    
    // Answer check
    input.addEventListener('input', () => {
        const answer = input.value.toLowerCase().trim();
        
        // ROT13 "GEHR VF ORUVAQ LBH" = "TRUTH IS BEHIND YOU"
        const validAnswers = ['truth', 'behind', 'behind you', 'verdade', 'atrás', 'detras'];
        
        if (validAnswers.includes(answer)) {
            console.log('%c Correct! The memories align... ', 'color: #4CAF50;');
            audio.success();
            input.disabled = true;
            input.style.borderColor = '#4CAF50';
            input.style.color = '#4CAF50';
            
            setTimeout(() => {
                switchScene('the-stairs');
                game.stage = 2;
                initStairs();
            }, 2000);
        }
    });
}

// =====================================================
// STAGE 2: THE STAIRS
// =====================================================

function initStairs() {
    const stairs = document.querySelectorAll('.stair');
    
    stairs.forEach(stair => {
        stair.addEventListener('click', (e) => {
            e.stopPropagation();
            const step = stair.dataset.step;
            
            console.log(`Clicked stair: ${step}`);
            
            // The 12th stair (December 25 = 12/25)
            if (step === '12') {
                console.log('%c The 12th step... Everything changed that day. ', 'color: #4CAF50; font-size: 14px;');
                audio.playSequence([392.00, 349.23, 329.63, 293.66], 500);
                
                stair.style.background = 'linear-gradient(to bottom, #ffcdd2 0%, #ef5350 50%, #c62828 100%)';
                stair.style.boxShadow = '0 0 30px rgba(239, 83, 80, 0.8)';
                
                setTimeout(() => {
                    switchScene('black-space');
                    game.stage = 3;
                    initBlackSpace();
                }, 3000);
            } else {
                audio.error();
                stair.style.animation = 'shake 0.4s ease';
                setTimeout(() => stair.style.animation = '', 400);
            }
        });
    });
}

// Add shake keyframes
if (!document.querySelector('#shake-keyframes')) {
    const style = document.createElement('style');
    style.id = 'shake-keyframes';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// STAGE 3: BLACK SPACE (Piano)
// =====================================================

function initBlackSpace() {
    const keys = document.querySelectorAll('.piano-key');
    const handsContainer = document.getElementById('hands-container');
    const sequenceDisplay = document.getElementById('sequence-display');
    
    // Create reaching hands
    for (let i = 0; i < 12; i++) {
        const hand = document.createElement('div');
        hand.className = 'hand';
        hand.style.left = (Math.random() * 90 + 5) + '%';
        hand.style.animationDelay = (Math.random() * 8) + 's';
        hand.style.animationDuration = (8 + Math.random() * 4) + 's';
        handsContainer.appendChild(hand);
    }
    
    // Start ambient drone
    let stopDrone;
    setTimeout(() => {
        stopDrone = audio.startDrone();
    }, 500);
    
    // Piano interaction
    keys.forEach((key, index) => {
        key.addEventListener('click', () => {
            const note = key.dataset.note;
            const freq = parseFloat(key.dataset.freq);
            
            audio.playNote(freq, 0.8);
            key.classList.add('played');
            setTimeout(() => key.classList.remove('played'), 600);
            
            game.pianoSequence.push(note);
            sequenceDisplay.textContent = game.pianoSequence.join(' - ');
            
            // Check if too long
            if (game.pianoSequence.length > game.correctPiano.length) {
                console.log('%c Wrong notes... ', 'color: #ff4444;');
                audio.error();
                game.pianoSequence = [];
                sequenceDisplay.textContent = '';
                return;
            }
            
            // Check if correct so far
            const correct = game.pianoSequence.every((n, i) => n === game.correctPiano[i]);
            
            if (!correct) {
                console.log('%c That doesn\'t sound right... ', 'color: #ff4444;');
                audio.error();
                game.pianoSequence = [];
                sequenceDisplay.textContent = '';
                return;
            }
            
            // Complete
            if (game.pianoSequence.length === game.correctPiano.length) {
                console.log('%c Her last chord... Perfect. ', 'color: #4CAF50; font-size: 14px;');
                
                // Play full chord
                audio.playChord([329.63, 392.00, 493.88], 3);
                
                if (stopDrone) stopDrone();
                
                setTimeout(() => {
                    switchScene('the-truth');
                    game.stage = 4;
                    initTheTruth();
                }, 4000);
            }
        });
    });
}

// =====================================================
// STAGE 4: THE TRUTH
// =====================================================

function initTheTruth() {
    const input = document.getElementById('truth-answer');
    
    input.focus();
    
    input.addEventListener('input', () => {
        const answer = input.value.toLowerCase().trim();
        
        if (answer === 'oyasumi') {
            console.log('%c "Oyasumi, oyasumi..." ', 'color: #fff; background: #000; font-size: 16px; padding: 10px;');
            console.log('%c Close your eyes, you\'ll be here soon. ', 'color: #999; font-size: 12px; font-style: italic;');
            
            audio.playSequence([329.63, 293.66, 261.63, 246.94], 900);
            
            input.disabled = true;
            input.style.borderBottomColor = 'transparent';
            input.style.color = 'transparent';
            
            // Fade to white
            setTimeout(() => {
                document.body.style.transition = 'background 5s ease';
                document.body.style.background = '#ffffff';
                switchScene('finale');
                game.stage = 5;
            }, 3000);
        }
    });
}

// =====================================================
// EASTER EGGS
// =====================================================

let secretBuffer = '';
let lastKeyTime = Date.now();

document.addEventListener('keydown', (e) => {
    const now = Date.now();
    
    if (now - lastKeyTime > 2000) {
        secretBuffer = '';
    }
    
    secretBuffer += e.key.toLowerCase();
    lastKeyTime = now;
    
    // Easter eggs
    if (secretBuffer.includes('mari')) {
        console.log('%c "I have to tell you something." ', 'color: #9370db; font-size: 14px; font-style: italic;');
        audio.playNote(392.00, 2);
        secretBuffer = '';
    }
    
    if (secretBuffer.includes('basil')) {
        console.log('%c "Everything is going to be okay." ', 'color: #81c784; font-size: 14px;');
        audio.playNote(493.88, 1.5);
        secretBuffer = '';
    }
    
    if (secretBuffer.includes('something')) {
        const something = document.getElementById('something');
        something.style.opacity = '0.9';
        something.style.transform = 'scale(2)';
        something.style.transition = 'all 1s ease';
        setTimeout(() => {
            something.style.opacity = '';
            something.style.transform = '';
        }, 2000);
        secretBuffer = '';
    }
    
    if (secretBuffer.includes('omori')) {
        console.log('%c "Sunny..." ', 'color: #000; background: #fff; font-size: 14px; padding: 5px;');
        secretBuffer = '';
    }
    
    if (secretBuffer.includes('blackspace')) {
        document.body.style.background = '#000';
        document.body.style.transition = 'background 2s ease';
        setTimeout(() => {
            document.body.style.background = '';
        }, 3000);
        secretBuffer = '';
    }
});

// =====================================================
// LANGUAGE SELECTOR
// =====================================================

function initLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
            audio.playNote(523.25, 0.15);
        });
    });
}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c Game initialized! ', 'color: #4CAF50; font-size: 12px;');
    
    // Initialize language system
    initLanguageSelector();
    updateTranslations();
    
    // Initialize first stage
    initWhiteSpace();
    
    // Setup other stages
    setTimeout(() => {
        initMemoryLane();
    }, 1000);
});

// Prevent accidental close
window.addEventListener('beforeunload', (e) => {
    if (game.stage > 0 && game.stage < 5) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ASCII Art
console.log(`
    ⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀
    ⠀⢀⣴⠟⠉⠀⠈⠻⣦⡀⠀⠀
    ⠀⣰⠟⠁⠀⠀⠀⠀⠈⠻⣆⠀
    ⠀⣰⠏⠀⠀⠀⠀⠀⠀⠹⣆⠀
    ⢰⡏⠀⣴⣆⠀⣴⣆⠀⢹⡆⠀
    ⣿⠀⠀⠙⠋⠀⠙⠋⠀⠀⣿⠀
    ⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀
    ⠸⣇⠀⠀⣠⣤⣄⠀⠀⣸⠇⠀
    ⠀⠹⣦⠀⠻⠿⠟⠀⣼⠏⠀⠀
    ⠀⠀⠈⠻⣦⣀⣠⡴⠟⠁⠀⠀
    ⠀⠀⠀⠀⠉⠛⠉⠀⠀⠀⠀⠀
    
    OMORI is waiting...
`);