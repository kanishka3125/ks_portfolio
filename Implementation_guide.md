# 💻 TECHNICAL IMPLEMENTATION GUIDE
**Portfolio Transformation: Code & Execution**

---

## QUICK START: WHAT TO CODE FIRST

If you have limited time (realistic for student), prioritize in this order:

1. **Emotion Detection Demo** (1 weekend, highest impact)
2. **Landing Animations** (3-4 hours, quick polish)
3. **AI Chatbot** (8-10 hours, huge differentiator)
4. **Skill Network Graph** (6-8 hours, looks premium)
5. **Scroll Animations** (4-5 hours, polish)

---

## PHASE 1: QUICK WINS CODE EXAMPLES

### #1: LANDING SECTION ANIMATION

**File: `src/components/Landing.jsx`**

```jsx
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Landing() {
  useEffect(() => {
    // Timeline orchestration
    const tl = gsap.timeline();

    // Particles appear
    tl.fromTo(
      '.particle-background',
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0
    );

    // Name slides in
    tl.fromTo(
      '.hero-name',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.3
    );

    // Tagline fades in
    tl.fromTo(
      '.hero-tagline',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      0.7
    );

    // Description text staggered
    tl.fromTo(
      '.hero-description p',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
      1.0
    );

    // Buttons appear
    tl.fromTo(
      '.cta-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out' },
      1.3
    );

    // Scroll indicator pulse
    tl.fromTo(
      '.scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 },
      1.4
    );

    // Scroll indicator pulse animation (looped)
    gsap.fromTo(
      '.scroll-indicator-arrow',
      { y: 0, opacity: 1 },
      { y: 10, opacity: 0.3, duration: 1.5, repeat: -1, ease: 'sine.inOut' }
    );
  }, []);

  return (
    <section className="landing min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Particle background */}
      <div className="particle-background absolute inset-0 z-0">
        {/* Your particle visualization here */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="hero-name text-6xl md:text-8xl font-bold text-white mb-4">
          Kanishka Sharma
        </h1>

        <div className="hero-tagline text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          B.Tech CSE with AI/ML Specialization | Aspiring AIML Engineer
        </div>

        <div className="hero-description text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          <p>Transforming ideas into impactful software solutions through innovation and continuous learning.</p>
          <p>Welcome to my digital space where I showcase my journey in code and community.</p>
        </div>

        <div className="cta-buttons flex gap-4 justify-center flex-wrap mb-12">
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg">
            Download Resume
          </button>
          <button className="px-8 py-3 border-2 border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg transition-all">
            Explore My Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <div className="scroll-indicator-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}
```

**CSS: `src/styles/landing.css`**

```css
.particle-background {
  background: radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
```

**Result:** Professional entrance animation. Takes ~2 seconds total. No performance hit.

---

### #2: INTERACTIVE SKILL CARDS

**File: `src/components/Skills.jsx`**

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = {
  languages: [
    { name: 'Python', level: 'Expert', projects: ['Emotion Detection', 'Diabetes Prediction'] },
    { name: 'JavaScript', level: 'Intermediate', projects: ['Personal Portfolio'] },
    { name: 'C++', level: 'Intermediate', projects: [] },
    { name: 'Java', level: 'Beginner', projects: [] },
  ],
  frameworks: [
    { name: 'TensorFlow', level: 'Advanced', projects: ['Emotion Detection'] },
    { name: 'React', level: 'Intermediate', projects: ['Personal Portfolio'] },
    { name: 'NumPy/Pandas', level: 'Advanced', projects: ['Diabetes Prediction'] },
  ],
  tools: [
    { name: 'Git & GitHub', level: 'Advanced', projects: ['All projects'] },
    { name: 'Jupyter Notebook', level: 'Advanced', projects: [] },
    { name: 'VS Code', level: 'Advanced', projects: [] },
  ]
};

export default function Skills() {
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('languages');

  const allSkills = skillsData[activeCategory];
  const colors = {
    'Expert': 'border-l-4 border-purple-500',
    'Advanced': 'border-l-4 border-purple-400',
    'Intermediate': 'border-l-4 border-purple-300',
    'Beginner': 'border-l-4 border-purple-200',
  };

  return (
    <section className="skills py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills & Expertise
      </h2>

      {/* Category tabs */}
      <div className="flex gap-4 justify-center mb-12 flex-wrap">
        {Object.keys(skillsData).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {allSkills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer ${colors[skill.level]}`}
            onClick={() => setExpandedSkill(expandedSkill === idx ? null : idx)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              <span className="text-xs px-2 py-1 bg-purple-600/30 text-purple-300 rounded">
                {skill.level}
              </span>
            </div>

            {/* Proficiency bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '85%' : '60%' }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Expandable section */}
            {expandedSkill === idx && skill.projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-gray-700"
              >
                <p className="text-xs text-gray-400 mb-2">Used in projects:</p>
                {skill.projects.map((project, pidx) => (
                  <div key={pidx} className="text-sm text-purple-300 mb-1">
                    • {project}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

**Result:** Interactive skills with hover states, category filtering, proficiency bars. Way better than static cards.

---

### #3: EXPERIENCE TIMELINE ANIMATION

**File: `src/components/Experience.jsx`**

```jsx
import { motion } from 'framer-motion';

const experienceData = [
  {
    year: '2026',
    title: 'Campus Lead',
    organization: 'Open Source Connect Global (OSCG\'26)',
    icon: '🎓'
  },
  {
    year: '2025',
    title: 'Campus Ambassador & Contributor',
    organization: 'GirlScript Summer of Code (GSSoC\'25)',
    icon: '👩‍💻'
  },
  {
    year: '2025',
    title: 'Contributor',
    organization: 'Open Source Connect India (OSCI\'25)',
    icon: '💻'
  },
  {
    year: '2025',
    title: 'Community Member',
    organization: 'Google Developer Community',
    icon: '🌐'
  }
];

export default function Experience() {
  return (
    <section className="experience py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Experience
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1 }}
        />

        {/* Timeline items */}
        <div className="space-y-8">
          {experienceData.map((item, idx) => (
            <motion.div
              key={idx}
              className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-gray-800/50 border border-gray-700 hover:border-purple-500 p-4 rounded-lg transition-all">
                  <span className="text-purple-400 font-bold">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                  <p className="text-gray-400 mt-1">{item.organization}</p>
                </div>
              </div>

              {/* Center dot */}
              <motion.div
                className="w-2/12 flex justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: idx * 0.15 + 0.3, type: 'spring' }}
              >
                <div className="w-5 h-5 bg-purple-500 rounded-full border-4 border-gray-900 flex items-center justify-center text-white text-sm">
                  {item.icon}
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Result:** Beautiful animated timeline. Professional. Takes ~2 hours to implement.

---

## PHASE 2: AI CHATBOT IMPLEMENTATION

### Frontend (React Component)

**File: `src/components/ChatBot.jsx`**

```jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_QUESTIONS = [
  "What are your strongest skills?",
  "Show me your ML projects",
  "Tell me about your internships",
  "How can I reach you?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Kanishka\'s AI assistant. Ask me anything about her projects, skills, or background!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message = input) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1 } : { scale: 1 }}
      >
        <span className="text-2xl">💬</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col max-h-96"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold">Ask Kanishka's AI</h3>
              <button onClick={() => setIsOpen(false)} className="text-xl hover:scale-110">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 space-y-2 border-t border-gray-700">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left text-sm text-purple-300 hover:text-purple-200 py-1 transition-colors"
                  >
                    • {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-700 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-700 text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Backend (Node.js + Express)

**File: `backend/routes/chat.js`**

```javascript
import express from 'express';
import { Anthropic } from '@anthropic-ai/sdk';

const router = express.Router();
const client = new Anthropic();

// Portfolio data context
const portfolioContext = `
You are Kanishka Sharma's AI portfolio assistant. You have access to her profile and answer questions naturally.

Background:
- B.Tech Computer Science with AI/ML specialization
- GPA: 9.12
- From SRM Institute of Science and Technology

Skills:
- Languages: Python, C, C++, JavaScript, Java, HTML
- Frameworks: TensorFlow, React, NumPy, Pandas
- Tools: Git, VS Code, Google Colab, Jupyter

Projects:
1. Emotion Detection System - Real-time emotion detection using deep learning
2. Diabetes Prediction - ML model using SVM
3. Personal Portfolio - React-based portfolio website

Internships:
1. ML Intern at System Tron (Dec 2025 - Jan 2026)
2. Web Dev Intern at SkillCraft Technologies (Dec 2025 - Jan 2026)

Experience:
- Campus Lead, OSCG 2026
- Campus Ambassador, GSSoC 2025
- Contributor, OSCI 2025
- Member, Google Developer Community

Contact:
- Email: kanishkasharma3125@gmail.com
- Phone: +91 95483 02781
- LinkedIn: [link]
- GitHub: [link]
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: portfolioContext,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : 'Sorry, I could not process that.';

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

**Result:** Working AI chatbot in ~10-12 hours. Game changer for portfolio.

---

## PHASE 3: EMOTION DETECTION DEMO

### Option A: TensorFlow.js (Simpler, Client-side Only)

**File: `src/components/EmotionDetector.jsx`**

```jsx
import { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import * as faceapi from '@vladmandic/face-api';
import html2canvas from 'html2canvas';

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const startCamera = async () => {
    try {
      // Load face-api models
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.faceDetectionNet.loadFromUri('/models');

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        detectEmotion();
      }
    } catch (error) {
      console.error('Camera access failed:', error);
      alert('Please allow camera access');
    }
  };

  const detectEmotion = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const detectInterval = setInterval(async () => {
      if (!isActive) {
        clearInterval(detectInterval);
        return;
      }

      try {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          
          // Find dominant emotion
          const dominantEmotion = Object.entries(expressions).sort(
            ([, a], [, b]) => b - a
          )[0];

          setEmotion(dominantEmotion[0]);
          setConfidence((dominantEmotion[1] * 100).toFixed(1));

          // Draw on canvas (optional)
          if (canvas) {
            const displaySize = { 
              width: video.videoWidth, 
              height: video.videoHeight 
            };
            faceapi.matchDimensions(canvas, displaySize);
            
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 100);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsActive(false);
      setEmotion(null);
    }
  };

  const captureScreenshot = async () => {
    const element = document.getElementById('emotion-demo-result');
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = image;
    link.download = `emotion-detection-${new Date().toISOString()}.png`;
    link.click();
  };

  return (
    <div className="emotion-detector max-w-2xl mx-auto p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">Emotion Detection Demo</h3>

      {!isActive ? (
        <button
          onClick={startCamera}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Turn On Camera
        </button>
      ) : (
        <>
          <div className="relative mb-4">
            <video
              ref={videoRef}
              autoPlay
              width={500}
              height={500}
              className="w-full rounded-lg"
            />
            <canvas ref={canvasRef} className="absolute inset-0 rounded-lg" />
          </div>

          {emotion && (
            <div id="emotion-demo-result" className="text-center mb-4 p-4 bg-gray-900 rounded-lg">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                {emotion.toUpperCase()}
              </div>
              <div className="text-3xl text-gray-300 font-bold">{confidence}%</div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={captureScreenshot}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Screenshot
            </button>
            <button
              onClick={stopCamera}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
            >
              Stop Camera
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

**Install dependencies:**
```bash
npm install @tensorflow/tfjs @tensorflow-models/facemesh @vladmandic/face-api html2canvas
```

**Result:** Working emotion detection demo. Wow factor: 10/10.

---

## DEPLOYMENT & PERFORMANCE

### Deployment Checklist

- [ ] **Frontend:** Deploy to Vercel
  ```bash
  npm run build
  vercel deploy
  ```

- [ ] **Backend:** Deploy to Railway or Heroku
  ```bash
  git push heroku main
  ```

- [ ] **Environment Variables:** Set API keys securely
  ```
  CLAUDE_API_KEY=sk_...
  FRONTEND_URL=https://yoursite.com
  ```

- [ ] **Performance:** Use Web Vitals
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Google Analytics Setup

```jsx
// In main layout
useEffect(() => {
  // Track page views
  window.gtag?.('pageview', {
    page_path: window.location.pathname,
  });
}, []);
```

---

## TESTING CHECKLIST

- [ ] Landing animations work smoothly
- [ ] Skills graph renders and interacts
- [ ] Experience timeline animates on scroll
- [ ] Chat API responds < 2 seconds
- [ ] Emotion detection runs at 30+ FPS
- [ ] Mobile responsive (test on phone)
- [ ] Accessibility (test with screen reader)
- [ ] Performance (Lighthouse score > 90)

---

## TIMELINE & EFFORT

| Feature | Time | Difficulty |
|---------|------|-----------|
| Landing animations | 2-3h | Easy |
| Skills redesign | 3-4h | Easy |
| Timeline animation | 2-3h | Easy |
| AI Chatbot | 10-12h | Medium |
| Emotion demo | 12-15h | Hard |
| Skill graph | 6-8h | Medium |
| **TOTAL** | **45-50h** | — |

**Realistic timeline:** 6-8 weeks working 6-8 hours/week.

---

## NEXT STEPS

1. **This weekend:** Start with landing animations + emotion demo setup
2. **Next week:** Get chatbot working
3. **Week 3:** Add skill graph and timeline animations
4. **Week 4:** Polish and optimize
5. **Week 5:** Deploy and gather feedback

Good luck! 🚀
