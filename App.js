// Initialize Supabase Client
const supabaseUrl = 'https://ggjnbuzccbzjmglqnogn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdnam5idXpjY2J6am1nbHFub2duIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg3NTMxNiwiZXhwIjoyMDY0NDUxMzE2fQ.6vpbpkVfqHLOP81h6t2wjisbxBltOWXGOYx5GTbnZsk';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log('Supabase:', supabase);


// Application Data
const appData = {
  "allUsersData": [], // Array to hold data for all users
  "currentUser": null, // Object to hold data for the current logged-in user
  "userProfile": {
    "name": "",
    "surname": "",
    "email": "",
    "courseName": "Advanced Prompt Engineering",
    "completionDate": "",
    "totalQuizzes": 0,
    "averageScore": 0,
    "averageTime": "0 minuti"
  },
  "quizQuestions": [
    {
      "id": 1,
      "category": "Fondamenti",
      "question": "Cos'è il few-shot prompting?",
      "options": ["A. Fornire pochi esempi nel prompt", "B. Fornire molti esempi nel prompt", "C. Non fornire esempi", "D. Usare solo comandi vocali"],
      "correct": 0,
      "explanation": "Few-shot prompting consiste nel fornire pochi esempi nel prompt per guidare il modello verso il comportamento desiderato."
    },
    {
      "id": 2,
      "category": "Framework",
      "question": "Quale framework è noto per il design strutturato dei prompt enterprise?",
      "options": ["A. RTF (Role-Task-Format)", "B. CLEAR", "C. CoT", "D. ReAct"],
      "correct": 0,
      "explanation": "RTF (Role-Task-Format) è diventato lo standard de facto per applicazioni enterprise, fornendo struttura chiara con incrementi di accuratezza fino al 40%."
    },
    {
      "id": 3,
      "category": "Tecniche Avanzate",
      "question": "Che cosa significa Chain-of-Thought (CoT) prompting?",
      "options": ["A. Ragionamento passo dopo passo", "B. Pensiero casuale", "C. Pensiero parallelo", "D. Nessuna delle precedenti"],
      "correct": 0,
      "explanation": "Chain-of-Thought è una tecnica sviluppata da Google Brain che guida il modello a ragionare esplicitamente passo dopo passo."
    },
    {
      "id": 4,
      "category": "Tecniche Avanzate",
      "question": "Quale tecnica combina ragionamento e azione in AI agents?",
      "options": ["A. ReAct", "B. CoT", "C. RTF", "D. CLEAR"],
      "correct": 0,
      "explanation": "ReAct (Reasoning + Acting) combina reasoning e action in modo iterativo, diventando standard per AI agents con tool usage."
    },
    {
      "id": 5,
      "category": "Sicurezza",
      "question": "Cos'è il prompt injection?",
      "options": ["A. Un attacco che manipola i prompt", "B. Un tipo di prompt avanzato", "C. Un framework di sicurezza", "D. Un modello LLM"],
      "correct": 0,
      "explanation": "Il prompt injection è un attacco di sicurezza che manipola i prompt per ottenere comportamenti indesiderati dall'AI."
    },
    {
      "id": 6,
      "category": "Modelli LLM",
      "question": "Quale modello LLM ha un context length di 200K tokens?",
      "options": ["A. GPT-4", "B. Claude 3.5 Sonnet", "C. Gemini Pro", "D. Llama 3.1"],
      "correct": 1,
      "explanation": "Claude 3.5 Sonnet di Anthropic ha un context window di 200K tokens, superiore a molti competitors."
    },
    {
      "id": 7,
      "category": "Tecniche Avanzate",
      "question": "Quale tecnica riduce gli errori con multiple generazioni e voting?",
      "options": ["A. Self-Consistency", "B. ReAct", "C. CoT", "D. CLEAR"],
      "correct": 0,
      "explanation": "Self-Consistency genera multiple risposte e usa voting per ridurre errori fino al 30% in task critici."
    },
    {
      "id": 8,
      "category": "Framework",
      "question": "Quale framework enfatizza l'adattabilità cross-domain?",
      "options": ["A. RTF", "B. CLEAR", "C. CoT", "D. ReAct"],
      "correct": 1,
      "explanation": "CLEAR (Concise, Logical, Explicit, Adaptive, Reflective) enfatizza l'adattabilità cross-domain con efficacia superiore del 25%."
    },
    {
      "id": 9,
      "category": "Tecniche Avanzate",
      "question": "Cos'è l'Automated Prompt Optimization (APO)?",
      "options": ["A. Ottimizzazione manuale", "B. Ottimizzazione automatica dei prompt", "C. Un modello LLM", "D. Un framework di sicurezza"],
      "correct": 1,
      "explanation": "APO automatizza il processo di raffinamento dei prompt usando algoritmi evolutivi e meta-prompting."
    },
    {
      "id": 10,
      "category": "Modelli LLM",
      "question": "Quale modello è leader nell'open source AI?",
      "options": ["A. GPT-4", "B. Claude 3.5", "C. Gemini Pro", "D. Llama 3.1"],
      "correct": 3,
      "explanation": "Llama 3.1 (405B parameters) di Meta rappresenta lo stato dell'arte nell'open source con licenza commerciale."
    },
    {
      "id": 11,
      "category": "Sicurezza",
      "question": "Quale tecnica di sicurezza previene prompt injection?",
      "options": ["A. Input validation", "B. Few-shot prompting", "C. Chain-of-Thought", "D. ReAct"],
      "correct": 0,
      "explanation": "Input validation con pattern matching raggiunge 75-80% di efficacia nel bloccare attacchi di prompt injection."
    },
    {
      "id": 12,
      "category": "Applicazioni Pratiche",
      "question": "Quale settore ha il più alto tasso di adozione LLM nel 2024?",
      "options": ["A. Healthcare", "B. Retail", "C. Tecnologia", "D. Finance"],
      "correct": 2,
      "explanation": "Il settore tecnologia guida con 89% adoption rate nel 2024, seguito da retail (85%) e finance (81%)."
    },
    {
      "id": 13,
      "category": "Sicurezza",
      "question": "Cos'è il framework CaMeL per la sicurezza AI?",
      "options": ["A. Framework di mitigazione prompt injection", "B. Un modello LLM", "C. Un tipo di prompt", "D. Un tool di visualizzazione"],
      "correct": 0,
      "explanation": "CaMeL di Google DeepMind rappresenta l'approccio più promettente per mitigazione sistematica di prompt injection."
    },
    {
      "id": 14,
      "category": "Tecniche Avanzate",
      "question": "Quale tecnica è essenziale per task multimodali?",
      "options": ["A. Multimodal Prompting", "B. Few-shot", "C. Zero-shot", "D. ReAct"],
      "correct": 0,
      "explanation": "Multimodal Prompting integra input testuali e visivi, rivoluzionando applicazioni in medicina e creative industries."
    },
    {
      "id": 15,
      "category": "Modelli LLM",
      "question": "Quale modello supporta input video e audio nativamente?",
      "options": ["A. GPT-4", "B. Claude 3.5", "C. Gemini Pro 1.5", "D. Llama 3.1"],
      "correct": 2,
      "explanation": "Gemini Pro 1.5 domina in applicazioni multimodali con capacità di processare testo, immagini, video e audio fino a 2M token."
    },
    {
      "id": 16,
      "category": "Tecniche Avanzate",
      "question": "Quale template usa ReAct per AI agents?",
      "options": ["A. Pensiero-Azione-Osservazione", "B. Input-Output", "C. Question-Answer", "D. Problem-Solution"],
      "correct": 0,
      "explanation": "ReAct usa un template standardizzato con Pensiero (analisi), Azione (esecuzione) e Osservazione (valutazione)."
    },
    {
      "id": 17,
      "category": "Framework",
      "question": "Quale caratteristica rende RTF efficace in contesti enterprise?",
      "options": ["A. Struttura Role-Task-Format", "B. Sintassi semplice", "C. Lunghezza ridotta", "D. Compatibilità universale"],
      "correct": 0,
      "explanation": "RTF definisce esplicitamente ruolo dell'AI, task specifico e formato output, dimostrando incrementi fino al 40%."
    },
    {
      "id": 18,
      "category": "Fondamenti",
      "question": "Chi ha sviluppato la tecnica Chain-of-Thought?",
      "options": ["A. Google Brain", "B. OpenAI", "C. Anthropic", "D. Meta"],
      "correct": 0,
      "explanation": "Google Brain ha sviluppato Chain-of-Thought nel 2022, stabilendo i fondamenti scientifici per il ragionamento negli LLM."
    },
    {
      "id": 19,
      "category": "Modelli LLM",
      "question": "Per cosa è ottimizzato GPT-4/4o?",
      "options": ["A. Coding e mathematical reasoning", "B. Creative writing", "C. Image generation", "D. Voice synthesis"],
      "correct": 0,
      "explanation": "GPT-4 mantiene leadership in complex reasoning, coding e problem solving matematico con prompt seguono strutturati."
    },
    {
      "id": 20,
      "category": "Sicurezza",
      "question": "Quale tecnica migliora la sicurezza dei system prompt?",
      "options": ["A. System prompt immutabili", "B. Prompt più lunghi", "C. Multiple versioni", "D. Prompt pubblici"],
      "correct": 0,
      "explanation": "System prompt immutabili per comportamenti critici rappresentano una best practice fondamentale per la sicurezza."
    },
    {
      "id": 21,
      "category": "Applicazioni Pratiche",
      "question": "Quale incremento di accuracy ha mostrato il settore healthcare?",
      "options": ["A. 125%", "B. 50%", "C. 200%", "D. 75%"],
      "correct": 0,
      "explanation": "Il settore healthcare ha documentato incrementi di accuracy diagnostica fino al 125% con prompt engineering ottimizzato."
    },
    {
      "id": 22,
      "category": "Tecniche Avanzate",
      "question": "Quale approccio usa l'evolutionary optimization?",
      "options": ["A. Mutazione controllata", "B. Copia esatta", "C. Selezione casuale", "D. Ordinamento alfabetico"],
      "correct": 0,
      "explanation": "Evolutionary approaches usano mutazione controllata per exploration e ottimizzazione automatica dei prompt."
    },
    {
      "id": 23,
      "category": "Modelli LLM",
      "question": "Quale record detiene Gemini Pro 1.5?",
      "options": ["A. 2M token context length", "B. Velocità di risposta", "C. Numero di parametri", "D. Efficienza energetica"],
      "correct": 0,
      "explanation": "Gemini Pro 1.5 detiene il record industry con 2M token context length, superando tutti i competitors."
    },
    {
      "id": 24,
      "category": "Applicazioni Pratiche",
      "question": "Quale tecnica riduce il carico cognitivo nell'assessment?",
      "options": ["A. Progressive disclosure", "B. Tutto insieme", "C. Ordine casuale", "D. Ripetizione"],
      "correct": 0,
      "explanation": "Progressive disclosure rivela informazioni gradualmente per evitare overload cognitivo durante assessment complessi."
    },
    {
      "id": 25,
      "category": "Modelli LLM",
      "question": "Per cosa è ideale Llama 3.1?",
      "options": ["A. Deployment privati e fine-tuning", "B. Solo ricerca", "C. Web browsing", "D. Gaming"],
      "correct": 0,
      "explanation": "Llama 3.1 con customizzazione completa è ideale per deployment privati e fine-tuning specializzati."
    },
    {
      "id": 26,
      "category": "Sicurezza",
      "question": "Come si valida la sicurezza dei prompt in produzione?",
      "options": ["A. Pattern matching con librerie di attacchi", "B. Test manuali", "C. Feedback utenti", "D. Analisi casuali"],
      "correct": 0,
      "explanation": "Pattern matching con librerie di attacchi noti raggiunge 75-80% di efficacia nella validazione di sicurezza."
    },
    {
      "id": 27,
      "category": "Framework",
      "question": "Quale elemento distingue il framework CLEAR?",
      "options": ["A. Enfasi su riflessione e adattabilità", "B. Semplicità estrema", "C. Focus su velocità", "D. Orientamento ai costi"],
      "correct": 0,
      "explanation": "CLEAR enfatizza Reflective e Adaptive capabilities per l'adattabilità cross-domain superiore del 25%."
    },
    {
      "id": 28,
      "category": "Tecniche Avanzate",
      "question": "Quale tecnica ottimizza i mega-prompts?",
      "options": ["A. Context Scaling", "B. Compression", "C. Summarization", "D. Fragmentation"],
      "correct": 0,
      "explanation": "Context Scaling bilancia ricchezza informativa e costi computazionali per mega-prompts di 1K+ tokens."
    },
    {
      "id": 29,
      "category": "Applicazioni Pratiche",
      "question": "Quale metrica è fondamentale per valutare prompt quality?",
      "options": ["A. Consistency tra esecuzioni multiple", "B. Solo velocità", "C. Solo costo", "D. Solo lunghezza"],
      "correct": 0,
      "explanation": "Consistency tra esecuzioni multiple è critica per valutare reliability e production-readiness dei prompt."
    },
    {
      "id": 30,
      "category": "Applicazioni Pratiche",
      "question": "Quale approccio strategico domina gli investimenti AI 2025?",
      "options": ["A. Specializzazione verticale (62%)", "B. Approccio orizzontale", "C. Hybrid puro", "D. Generalista"],
      "correct": 0,
      "explanation": "La specializzazione verticale cattura il 62% degli investimenti 2025, riflettendo maturazione del mercato e ricerca di ROI tangibili."
    }
  ],
  "dashboardStats": {
    "totalUsers": 0,
    "avgCompletionTime": "0 minuti",
    "passRate": 0,
    "topCategories": [
      {"name": "Framework", "score": 0},
      {"name": "Best Practices", "score": 0},
      {"name": "Sicurezza", "score": 0},
      {"name": "Modelli LLM", "score": 0}
    ],
    "recentScores": []
  }
};

// Application State
let currentSection = 'login';
let currentQuestionIndex = 0;
let userAnswers = [];
let quizTimer = null;
let timeLeft = 30;
let quizResults = null;

// Chart instances
let performanceChart = null;
let categoryChart = null;
let skillsRadar = null;

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');

// Initialize Application
function initializeApp() {
    // Create login screen content
    const loginSection = document.getElementById('login');
    loginSection.innerHTML = `
        <div class="login-container">
            <div class="login-logo">
                <img src="Logo_Aiutati_Tondo.jpg" alt="Aiutati Logo" class="login-logo__img">
            </div>
            <h2 class="login-title">Prompt Design Quiz</h2>
            <p class="login-subtitle">Accedi o registrati per iniziare</p>
            <form id="authForm" class="login-form">
                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control" required>
                </div>
                 <div class="form-group" id="nameSurnameGroup" style="display: none;">
                    <label for="name" class="form-label">Nome</label>
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="form-group" id="surnameGroup" style="display: none;">
                    <label for="surname" class="form-label">Cognome</label>
                    <input type="text" id="surname" class="form-control">
                </div>
                <button type="submit" class="btn btn--primary btn--lg" id="authButton">Accedi</button>
                <button type="button" class="btn btn--secondary btn--lg mt-8" id="toggleAuthMode">Registrati</button>
            </form>
        </div>
    `;

    // Add form handler
    const authForm = document.getElementById('authForm');
    const authButton = document.getElementById('authButton');
    const toggleAuthModeButton = document.getElementById('toggleAuthMode');
    const nameSurnameGroup = document.getElementById('nameSurnameGroup');
    const surnameGroup = document.getElementById('surnameGroup');
    let isLoginMode = true;

    toggleAuthModeButton.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            authButton.textContent = 'Accedi';
            toggleAuthModeButton.textContent = 'Registrati';
            nameSurnameGroup.style.display = 'none';
            surnameGroup.style.display = 'none';
             document.getElementById('name').required = false;
             document.getElementById('surname').required = false;
        } else {
            authButton.textContent = 'Registrati';
            toggleAuthModeButton.textContent = 'Hai già un account? Accedi';
            nameSurnameGroup.style.display = 'block';
            surnameGroup.style.display = 'block';
             document.getElementById('name').required = true;
             document.getElementById('surname').required = true;
        }
    });


    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (isLoginMode) {
            // Sign In
            const { user, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                showToast(error.message, 'error');
            } else {
                 await handleAuthSuccess(user);
            }
        } else {
            // Sign Up
            const name = document.getElementById('name').value;
            const surname = document.getElementById('surname').value;

            const { user, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                showToast(error.message, 'error');
            } else if (user) {
                // Store name and surname in a profiles table
                 const { data, error: profileError } = await supabase
                    .from('profiles') // Make sure you have a 'profiles' table in Supabase
                    .insert([{ id: user.id, name: name, surname: surname }]);

                if (profileError) {
                    console.error('Error saving profile:', profileError);
                    showToast('Registration successful, but could not save profile info.', 'warning');
                } else {
                     showToast('Registrazione completata con successo! Controlla la tua email per la verifica.', 'success');
                      // Optionally, you might want to redirect or show a message to check email
                       // For now, let's just log them in after successful signup + profile save
                       await handleAuthSuccess(user);
                }

            }
        }
    });

    // Function to handle successful authentication
    async function handleAuthSuccess(user) {
         // Fetch user profile (name and surname)
         const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('name, surname')
            .eq('id', user.id)
            .single();

         if (profileError) {
             console.error('Error fetching profile:', profileError);
             showToast('Could not fetch user profile.', 'error');
             // You might want to handle this error differently, e.g., sign them out
             return;
         }

         appData.currentUser = user; // Store the Supabase user object
         appData.userProfile.name = profileData.name; // Update user profile with fetched data
         appData.userProfile.surname = profileData.surname; // Update user profile with fetched data

        // Update welcome message
        const welcomeTitle = document.querySelector('.welcome__title');
        if (welcomeTitle) {
            welcomeTitle.innerHTML = `Benvenuto, <span class="highlight">${appData.userProfile.name} ${appData.userProfile.surname}</span>`;
        }

        // Show dashboard
        showSection('dashboard');
        showToast('Accesso effettuato con successo!', 'success');
    }

    // Initialize other components
    initializeNavigation();
    initializeDashboard();
    initializeQuiz();
    initializeResults();

     // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
            console.log('Existing session found', session);
            // User is logged in, handle success
             await handleAuthSuccess(session.user);
        } else {
            console.log('No existing session');
            // No session, stay on login page
        }
    }).catch((error) => {
         console.error('Error checking session:', error);
         showToast('Error checking session: ' + error.message, 'error');
    });
}

// Navigation Management
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            updateActiveNav(this);
        });
    });

    // Quick action buttons
    document.getElementById('startQuizBtn').addEventListener('click', () => showSection('quiz'));
    document.getElementById('viewResultsBtn').addEventListener('click', () => showSection('results'));
    document.getElementById('startQuizBtnInQuiz').addEventListener('click', startQuiz);
    document.getElementById('startQuizFromResults').addEventListener('click', () => showSection('quiz'));
    document.getElementById('retakeQuizBtn').addEventListener('click', () => {
        resetQuiz();
        showSection('quiz');
    });
    document.getElementById('backToDashboardBtn').addEventListener('click', () => showSection('dashboard'));
}

function showSection(sectionName) {
    sections.forEach(section => {
        section.classList.remove('section--active');
    });
    
    document.getElementById(sectionName).classList.add('section--active');
    currentSection = sectionName;
    
    // Update navigation
    const targetNav = document.querySelector(`[data-section="${sectionName}"]`);
    if (targetNav) {
        updateActiveNav(targetNav);
    }
}

function updateActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Dashboard Functions
function initializeDashboard() {
    // Add Aiutati logo to the dashboard
    const welcomeSection = document.querySelector('.welcome');
    const logoContainer = document.createElement('div');
    logoContainer.className = 'welcome__logo';
    logoContainer.innerHTML = `
        <img src="Logo_Aiutati_Tondo.jpg" alt="Aiutati Logo" class="welcome__logo__img">
    `;
    welcomeSection.insertBefore(logoContainer, welcomeSection.firstChild);

    // Update welcome message
    const welcomeTitle = document.querySelector('.welcome__title');
    if (welcomeTitle) {
        welcomeTitle.innerHTML = `Benvenuto, <span class="highlight">${appData.userProfile.name} ${appData.userProfile.surname}</span>`;
    }

    // Reset stats display
    document.querySelector('.stat-card:nth-child(1) .stat-card__number').textContent = '0';
    document.querySelector('.stat-card:nth-child(2) .stat-card__number').textContent = '0%';
    document.querySelector('.stat-card:nth-child(3) .stat-card__number').textContent = '0min';
    document.querySelector('.stat-card:nth-child(4) .stat-card__number').textContent = '0';

    // Reset progress circle
    const progressCircle = document.querySelector('.progress-circle__fill');
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = '314';
    }
    document.querySelector('.progress-circle__percentage').textContent = '0%';

    // Reset achievements
    const achievements = document.querySelector('.achievements');
    if (achievements) {
        achievements.innerHTML = `
            <div class="achievement">
                <i class="fas fa-medal"></i>
                <span>Nessun Quiz Completato</span>
            </div>
        `;
    }

    // Initialize empty leaderboard
    renderLeaderboard();
    createPerformanceChart();
}

function renderLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    const scores = appData.dashboardStats.recentScores;
    
    leaderboard.innerHTML = scores.map((item, index) => `
        <div class="leaderboard-item">
            <div class="leaderboard-item__rank">${index + 1}</div>
            <div class="leaderboard-item__info">
                <div class="leaderboard-item__name">${item.name}</div>
                <div class="leaderboard-item__date">${formatDate(item.date)}</div>
            </div>
            <div class="leaderboard-item__score">${item.score}%</div>
        </div>
    `).join('');
}

function createPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const categories = appData.dashboardStats.topCategories;
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories.map(cat => cat.name),
            datasets: [{
                label: 'Punteggio Medio (%)',
                data: categories.map(cat => cat.score),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Quiz Functions
function initializeQuiz() {
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
}

function startQuiz() {
    showLoading();
    
    // Reduced loading time from 1000ms to 300ms for better user experience
    setTimeout(() => {
        hideLoading();
        resetQuiz();
        document.getElementById('quizStart').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
        loadQuestion();
        showToast('Quiz iniziato! Buona fortuna!', 'success');
    }, 300);
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizResults = null;
    document.getElementById('quizStart').style.display = 'block';
    document.getElementById('quizContent').style.display = 'none';
    clearInterval(quizTimer);
}

function loadQuestion() {
    const question = appData.quizQuestions[currentQuestionIndex];
    const totalQuestions = appData.quizQuestions.length;
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Domanda ${currentQuestionIndex + 1} di ${totalQuestions}`;
    
    // Update question content
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionText').textContent = question.question;
    
    // Clear previous feedback
    document.getElementById('questionFeedback').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Render options
    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" data-index="${index}">
            ${option}
        </div>
    `).join('');
    
    // Add click listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(parseInt(this.dataset.index));
        });
    });
    
    // Start timer
    startTimer();
}

function selectOption(selectedIndex) {
    const question = appData.quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Clear previous selections
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Mark selected option
    options[selectedIndex].classList.add('selected');
    
    // Stop timer
    clearInterval(quizTimer);
    
    // Store answer
    userAnswers[currentQuestionIndex] = {
        questionId: question.id,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: selectedIndex === question.correct,
        category: question.category
    };
    
    // Show feedback
    showQuestionFeedback(selectedIndex, question);
    
    // Show next button
    document.getElementById('nextQuestionBtn').style.display = 'inline-flex';
}

function showQuestionFeedback(selectedIndex, question) {
    const options = document.querySelectorAll('.option');
    const feedbackContainer = document.getElementById('questionFeedback');
    const feedbackResult = document.getElementById('feedbackResult');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    
    // Mark correct and incorrect options
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Show feedback
    const isCorrect = selectedIndex === question.correct;
    feedbackResult.className = `feedback-result ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackResult.innerHTML = `
        <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
        ${isCorrect ? 'Risposta Corretta!' : 'Risposta Sbagliata'}
    `;
    
    feedbackExplanation.textContent = question.explanation;
    feedbackContainer.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < appData.quizQuestions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function startTimer() {
    timeLeft = 30;
    document.getElementById('timerText').textContent = timeLeft + 's';
    
    quizTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timerText').textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            // Auto-select wrong answer if time runs out
            selectOption(-1);
        }
    }, 1000);
}

function finishQuiz() {
    showLoading();
    
    // Reduced loading time for better user experience
    setTimeout(() => {
        hideLoading();
        calculateResults();
        showSection('results');
        renderResults();
        showToast('Quiz completato!', 'success');
    }, 500);
}

async function calculateResults() {
    const totalQuestions = appData.quizQuestions.length;
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate category scores
    const categoryScores = {};
    userAnswers.forEach(answer => {
        if (!categoryScores[answer.category]) {
            categoryScores[answer.category] = { correct: 0, total: 0 };
        }
        categoryScores[answer.category].total++;
        if (answer.isCorrect) {
            categoryScores[answer.category].correct++;
        }
    });
    
    // Convert to percentages
    const categoryPercentages = Object.keys(categoryScores).map(category => ({
        category,
        score: Math.round((categoryScores[category].correct / categoryScores[category].total) * 100)
    }));
    
    quizResults = {
        score,
        correctAnswers,
        totalQuestions,
        categoryScores: categoryPercentages,
        passed: score >= 80
    };

    // Save results to Supabase
    try {
        const { data, error } = await supabase
            .from('quiz_results')
            .insert([{
                user_id: appData.currentUser.id,
                score: score,
                correct_answers: correctAnswers,
                total_questions: totalQuestions,
                completion_time: 30 - timeLeft, // Time taken in seconds
                category_scores: categoryPercentages
            }]);

        if (error) {
            console.error('Error saving quiz results:', error);
            showToast('Errore nel salvare i risultati del quiz', 'error');
        } else {
            console.log('Quiz results saved successfully:', data);
            // Update dashboard stats after saving results
            await updateDashboardStats();
        }
    } catch (error) {
        console.error('Error in saving quiz results:', error);
        showToast('Errore nel salvare i risultati del quiz', 'error');
    }
}

// Function to fetch and update dashboard stats
async function updateDashboardStats() {
    try {
        // Fetch user's quiz history
        const { data: quizHistory, error: quizError } = await supabase
            .from('quiz_results')
            .select('*')
            .eq('user_id', appData.currentUser.id)
            .order('completion_date', { ascending: false });

        if (quizError) {
            console.error('Error fetching quiz history:', quizError);
            return;
        }

        // Update user profile stats
        if (quizHistory && quizHistory.length > 0) {
            const totalQuizzes = quizHistory.length;
            const avgScore = Math.round(quizHistory.reduce((acc, quiz) => acc + quiz.score, 0) / totalQuizzes);
            const avgTime = Math.round(quizHistory.reduce((acc, quiz) => acc + quiz.completion_time, 0) / totalQuizzes);

            appData.userProfile.totalQuizzes = totalQuizzes;
            appData.userProfile.averageScore = avgScore;
            appData.userProfile.averageTime = `${avgTime} minuti`;

            // Update dashboard stats
            appData.dashboardStats.totalUsers = totalQuizzes;
            appData.dashboardStats.avgCompletionTime = `${avgTime} minuti`;
            appData.dashboardStats.passRate = Math.round((quizHistory.filter(quiz => quiz.score >= 80).length / totalQuizzes) * 100);

            // Calculate category averages
            const categoryTotals = {};
            quizHistory.forEach(quiz => {
                quiz.category_scores.forEach(cat => {
                    if (!categoryTotals[cat.category]) {
                        categoryTotals[cat.category] = { sum: 0, count: 0 };
                    }
                    categoryTotals[cat.category].sum += cat.score;
                    categoryTotals[cat.category].count++;
                });
            });

            appData.dashboardStats.topCategories = Object.entries(categoryTotals).map(([category, data]) => ({
                name: category,
                score: Math.round(data.sum / data.count)
            }));

            // Update recent scores
            appData.dashboardStats.recentScores = quizHistory.slice(0, 5).map(quiz => ({
                name: `${appData.userProfile.name} ${appData.userProfile.surname}`,
                score: quiz.score,
                date: quiz.completion_date
            }));

            // Update dashboard UI
            updateDashboardUI();
        }
    } catch (error) {
        console.error('Error updating dashboard stats:', error);
    }
}

// Function to update dashboard UI with new stats
function updateDashboardUI() {
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-card__number').textContent = appData.userProfile.totalQuizzes;
    document.querySelector('.stat-card:nth-child(2) .stat-card__number').textContent = appData.dashboardStats.passRate + '%';
    document.querySelector('.stat-card:nth-child(3) .stat-card__number').textContent = appData.dashboardStats.avgCompletionTime;
    document.querySelector('.stat-card:nth-child(4) .stat-card__number').textContent = appData.userProfile.averageScore + '%';

    // Update progress circle
    const progressCircle = document.querySelector('.progress-circle__fill');
    if (progressCircle) {
        const progress = (appData.userProfile.averageScore / 100) * 314; // 314 is the circumference
        progressCircle.style.strokeDashoffset = 314 - progress;
    }
    document.querySelector('.progress-circle__percentage').textContent = appData.userProfile.averageScore + '%';

    // Update leaderboard
    renderLeaderboard();

    // Update performance chart
    if (performanceChart) {
        performanceChart.destroy();
    }
    createPerformanceChart();
}

// Results Functions
function initializeResults() {
    console.log('Initializing results section...');

    // Check if there are existing results to show
    if (!quizResults) {
        console.log('No quiz results available');
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('resultsPlaceholder').style.display = 'block';
    } else {
        // This block is now primarily for initial state if results are loaded from elsewhere (e.g., local storage)
        // The main logic for rendering and attaching listeners for *newly* completed quizzes is in renderResults.
        console.log('Initial results available (likely from previous session or load), showing results container');
        document.getElementById('resultsContainer').style.display = 'block';
        document.getElementById('resultsPlaceholder').style.display = 'none';
        // Note: Attaching listener here is redundant if renderResults is always called after quiz completion,
        // but keeping it for robustness in case results are loaded differently.
        const downloadCertificateBtn = document.getElementById('downloadCertificateBtn');
         if (downloadCertificateBtn) {
            downloadCertificateBtn.addEventListener('click', function(e) {
                console.log('Certificate button clicked (from initializeResults fallback)');
                e.preventDefault();
                generateCertificate();
            });
        }

    }
}

function renderResults() {
    console.log('Rendering results section...');
    if (!quizResults) {
        console.log('Cannot render results, quizResults is null.');
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('resultsPlaceholder').style.display = 'block';
        return; // Exit if no results to render
    }

    console.log('Displaying results container');
    document.getElementById('resultsContainer').style.display = 'block';
    document.getElementById('resultsPlaceholder').style.display = 'none';

    // Update score display
    document.getElementById('scorePercentage').textContent = quizResults.score + '%';

    // Show certificate if passed
    const certificateCard = document.getElementById('certificateCard');
    if (quizResults.passed) {
        console.log('Quiz passed, showing certificate card.');
        certificateCard.style.display = 'block';
        // *** Attach click handler for certificate download HERE ***
        const downloadCertificateBtn = document.getElementById('downloadCertificateBtn');
        console.log('Certificate button found in renderResults:', downloadCertificateBtn);
        if (downloadCertificateBtn) {
             // Remove any existing listener to prevent duplicates
            const oldBtn = downloadCertificateBtn.cloneNode(true);
            downloadCertificateBtn.parentNode.replaceChild(oldBtn, downloadCertificateBtn);
            const newBtn = document.getElementById('downloadCertificateBtn');

            newBtn.addEventListener('click', function(e) {
                console.log('Certificate button clicked (from renderResults)');
                e.preventDefault();
                generateCertificate();
            });
             console.log('Certificate button listener attached in renderResults.');
        } else {
             console.error('Certificate button NOT found in renderResults after quiz passed!');
        }

    } else {
        console.log('Quiz not passed, hiding certificate card.');
        certificateCard.style.display = 'none';
    }

    // Create charts
    createCategoryChart();
    createSkillsRadar();

    // Generate recommendations
    generateRecommendations();
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: quizResults.categoryScores.map(cat => cat.category),
            datasets: [{
                data: quizResults.categoryScores.map(cat => cat.score),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createSkillsRadar() {
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    
    if (skillsRadar) {
        skillsRadar.destroy();
    }
    
    skillsRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: quizResults.categoryScores.map(cat => cat.category),
            datasets: [{
                label: 'Il tuo Punteggio',
                data: quizResults.categoryScores.map(cat => cat.score),
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                borderColor: '#1FB8CD',
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function generateRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    const recommendations = [];
    
    // Generate recommendations based on category scores
    quizResults.categoryScores.forEach(category => {
        if (category.score < 70) {
            recommendations.push({
                icon: 'fas fa-exclamation-triangle',
                text: `Migliora le competenze in ${category.category} - Punteggio: ${category.score}%`
            });
        } else if (category.score >= 90) {
            recommendations.push({
                icon: 'fas fa-star',
                text: `Eccellente padronanza di ${category.category} - Continua così!`
            });
        }
    });
    
    // Add general recommendations
    if (quizResults.score < 60) {
        recommendations.push({
            icon: 'fas fa-book',
            text: 'Studia i fondamenti del prompt engineering con maggiore attenzione'
        });
    } else if (quizResults.score >= 80) {
        recommendations.push({
            icon: 'fas fa-trophy',
            text: 'Ottimi risultati! Considera di approfondire tecniche avanzate'
        });
    }
    
    recommendationsList.innerHTML = recommendations.map(rec => `
        <div class="recommendation">
            <i class="${rec.icon}"></i>
            <span>${rec.text}</span>
        </div>
    `).join('');
}

// Certificate Functions
async function generateCertificate() {
    console.log('Starting certificate generation (PDF with Blob)...');
    try {
        showLoading();
        
        // Get user data
        const { name, surname } = appData.userProfile;
        console.log('User data:', { name, surname });
        
        const fullName = `${name} ${surname}`;
        const date = new Date().toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Create a temporary element to render the certificate content
        const certificateElement = document.createElement('div');
        certificateElement.innerHTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Certificato - ${fullName}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
                        @page {
                            size: A4 landscape;
                            margin: 0; /* Remove margin for full background */
                        }
                        html, body {
                            width: 297mm; /* A4 width landscape */
                            height: 210mm; /* A4 height landscape */
                            margin: 0; /* Ensure no default margin */
                            padding: 0; /* Ensure no default padding */
                            overflow: hidden; /* Prevent scrollbars */
                            font-family: Arial, sans-serif;
                            background: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .certificate-pdf {
                            width: 297mm; /* Match A4 landscape width */
                            height: 210mm; /* Match A4 landscape height */
                            position: relative; /* Needed for absolute positioning of text */
                            background-image: url('Certificato.jpg'); /* Set background image */
                            background-size: contain; /* Cover the entire area */
                            background-repeat: no-repeat;
                            background-position: calc(50% - 60px) 45%; /* Shift background slightly up */
                            box-sizing: border-box;
                            padding: 0 2mm; /* Revert vertical padding, keep horizontal */
                        }
                        
                        .certificate-name {
                            position: absolute;
                            top: 42%; /* Adjusted vertically up further as requested */
                            left: 50%; /* Center horizontally */
                            transform: translate(-50%, -50%); /* Perfect horizontal centering */
                            font-size: 16mm; /* Reduced font size for name */
                            font-weight: bold;
                            color: #FF8C00; /* Orange color */
                            text-align: center;
                            width: 90%; /* Allow more width */
                             line-height: 1.2; /* Adjust line height */
                        }

                        .certificate-score {
                            position: absolute;
                             top: 68%; /* Adjusted vertically slightly up */
                             left: 50%; /* Center horizontally */
                             transform: translate(-50%, -50%); /* Perfect centering */
                             font-size: 8mm; /* Smaller font size for score */
                             color: #007bff; /* Blue color, adjust if needed */
                             text-align: center;
                             width: 90%; /* Allow more width */
                        }

                        /* Remove all other previous certificate styles */
                        .certificate-header, .certificate-body, .certificate-footer, .signature-text {
                            display: none; /* Hide previous elements */
                        }

                    </style>
                </head>
                <body>
                    <div class="certificate-pdf">
                        <div class="certificate-name">${fullName}</div>
                        <div class="certificate-score"></div>
                        <!-- Only name and score will be dynamically inserted over background -->
                    </div>
                </body>
            </html>
        `;

        // Use html2pdf to generate the PDF as a Blob
        const options = {
            margin: 0, // Set margin to 0 to ensure content fits A4 landscape exactly
            filename: `Certificato_${name}_${surname}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        console.log('Generating PDF Blob...');
        const pdfBlob = await html2pdf().set(options).from(certificateElement).output('blob');
        console.log('PDF Blob generated.', pdfBlob);

        // Create a download link
        const downloadUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = options.filename;

        // Trigger the download
        console.log('Triggering download...');
        a.click();

        // Clean up
        URL.revokeObjectURL(downloadUrl);
        console.log('Download triggered and URL revoked.');

        hideLoading();
        showToast('Certificato PDF generato con successo! Il download dovrebbe iniziare a breve.', 'success');

    } catch (error) {
        console.error('Error in generateCertificate (PDF with Blob):', error);
        hideLoading();
        showToast('Errore nella generazione del certificato PDF: ' + error.message, 'error');
    }
}

// Utility Functions
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short'
    });
}

// Animation on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 100);
});

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
