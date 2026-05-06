export const portfolioData = {
  name: "Kanishka Sharma",
  role: "B.Tech CSE Student | Aspiring AIML Engineer",
  specialization: "Artificial Intelligence and Machine Learning",
  university: "SRM Institute of Science and Technology",
  cgpa: "9.12",
  bio: [
    "Hello! I am Kanishka, a B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology, with a strong academic foundation (CGPA 9.12).",
    "My experience includes building adaptive AI systems, web applications, and analytics-driven solutions, with a focus on creating practical, impactful technology.",
    "Beyond academics, I actively contribute to the tech community as a Campus Lead at Open Source Connect Global and as a member of GSSoC'25 and Google Developer Groups."
  ],
  stats: {
    projects: 2,
    communities: 5,
    skills: 16,
    internships: 2,
  },
  contact: {
    email: "kanishkasharma3125@gmail.com",
    phone: "+91 95483 02781",
    linkedin: "https://www.linkedin.com/in/kanishka-sharma-bb8981350/",
    github: "https://github.com/kanishka3125",
    resume: "https://image2url.com/pdfs/1765900700693-8087f547-d4c1-4029-a1e6-cde68857b6e7.pdf"
  },
  skills: {
    languages: ["Python", "C", "C++", "HTML", "Java", "JavaScript"],
    tools: ["Git & GitHub", "NumPy/Pandas", "VS Code", "Jupyter Notebook", "Google Colab"],
    communities: [
      "GirlScript Summer of Code",
      "Open Source Connect Global",
      "Open Source Connect India",
      "Google Developer Community",
      "Google and NVIDIA Community"
    ]
  },
  experience: [
    {
      year: "2026",
      role: "Campus Lead",
      company: "Open Source Connect Global (OSCG'26)"
    },
    {
      year: "2025",
      role: "Campus Ambassador and Contributor",
      company: "GirlScript Summer of Code (GSSoC'25)"
    },
    {
      year: "2025",
      role: "Contributor",
      company: "Open Source Connect India (OSCI'25)"
    },
    {
      year: "2025",
      role: "Community Member",
      company: "Google Developer Community"
    }
  ],
  internships: [
    {
      role: "Machine Learning Intern",
      company: "System Tron",
      duration: "15|12|2025 - 11|01|2026",
      description: "Applied Machine Learning concepts to real-world problem statements. Built ML pipelines involving data preprocessing, feature selection, and model training. Evaluated model performance using accuracy, precision, and other metrics.",
      skills: ["Machine Learning", "Python", "TensorFlow", "NumPy", "Pandas", "Scikit-learn"],
      logo: "https://image2url.com/images/1765895074258-5ed13062-fcc5-450b-aea0-4fa4e9e43afa.png",
      certificate: "https://image2url.com/images/1765896226429-bbdefc28-1539-425e-9df0-01485f43266d.png",
      projects: [
        {
          title: "Diabetes Prediction with ML",
          description: "Designed and trained an SVM-based Machine Learning model for diabetes prediction using the PIMA Diabetes dataset."
        }
      ]
    }
  ],
  projects: [
    {
      id: "portfolio",
      title: "Personal Portfolio OS",
      domain: "Web",
      type: "Personal",
      difficulty: "Advanced",
      status: "Ongoing",
      shortDescription: "A highly interactive, 3D and OS-style portfolio experience built with React.",
      description: "A modern, responsive portfolio website built with React, Tailwind CSS, and Three.js. Features immersive 3D particle backgrounds, OS-style project modals, and dynamic certificate books.",
      image: "https://image2url.com/images/1765877517101-1e81c332-1265-41f1-a892-c5b87ce9d1b2.png",
      tech: {
        frontend: ["React", "Tailwind CSS v4", "Framer Motion"],
        backend: ["Node.js", "Express"],
        ai: [],
        tools: ["Three.js", "Vite", "Git"]
      },
      features: [
        "OS-Style window management system for project viewing",
        "Interactive 3D certificate book using Framer Motion",
        "Dynamic smart filtering system for projects",
        "Highly responsive glassmorphism UI design"
      ],
      architecture: "The application follows a modular React component architecture. State is managed locally using React Hooks, with Framer Motion handling complex physics-based layout transitions. The UI leverages a custom utility-first design system built on top of Tailwind CSS v4.",
      learnings: {
        challenges: "Balancing the visual complexity of 3D transforms and glassmorphism with mobile rendering performance.",
        takeaways: "Learned advanced Framer Motion techniques for layout animations and state-driven DOM manipulations.",
        future: "Integrate a real-time headless CMS to make content updates seamless without redeploying the app."
      },
      demoLink: "http://localhost:5174",
      github: "https://github.com/kanishka3125/ks_portfolio"
    },
    {
      id: "emotion-recognition",
      title: "Adaptive Real-Time Emotion Recognition",
      domain: "AI/ML",
      type: "Hackathon",
      difficulty: "Advanced",
      status: "Completed",
      shortDescription: "AI-driven application for real-time emotion detection with adaptive user calibration.",
      description: "AI-driven application for real-time emotion detection from video streams with adaptive user calibration. The system uses DeepFace and OpenCV to analyze facial expressions, applying temporal voting for prediction stabilization and low-light enhancement for challenging environments.",
      image: "https://image2url.com/images/1765877608873-49b36c01-941a-4537-8b46-e27aa04f9fef.jpg",
      tech: {
        frontend: ["React", "Tailwind CSS"],
        backend: ["Python", "FastAPI"],
        ai: ["DeepFace", "TensorFlow", "OpenCV"],
        tools: ["Docker", "Git"]
      },
      features: [
        "Real-time emotion detection from live camera feed",
        "Adaptive user calibration to reduce resting-face bias",
        "Prediction stabilization using temporal voting",
        "Low-light image enhancement"
      ],
      architecture: "The backend uses a FastAPI server handling WebSocket video streams. OpenCV pre-processes the frames (lighting enhancement) and passes them to a DeepFace TensorFlow model. A temporal voting algorithm stabilizes the rapid classification changes before sending JSON payloads back to the React frontend.",
      learnings: {
        challenges: "Handling real-time video processing with low latency while maintaining accuracy across diverse lighting conditions.",
        takeaways: "Implemented temporal voting to smooth predictions and built an adaptive calibration system that learns each user's baseline expressions.",
        future: "Deploy the inference model to Edge devices using TensorRT for zero-latency processing."
      },
      demoLink: "",
      github: "https://github.com/kanishka3125/emotion_detector.git"
    }
  ],
  certifications: [
    {
      id: "google-digital-marketing",
      title: "The Fundamentals of Digital Marketing",
      organization: "Google Digital Unlocked",
      orgLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
      image: "https://i.postimg.cc/GhkJv4Bq/Google-Professional-Certification.png",
      verifyLink: "https://image2url.com/pdfs/1765886844676-53f96413-c487-4447-aa35-0475b8c5b716.pdf",
      skills: ["SEO", "Google Ads", "Content Strategy"]
    },
    {
      id: "microsoft-genai",
      title: "Career Essentials in Generative AI",
      organization: "Microsoft and LinkedIn",
      orgLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png",
      image: "https://i.postimg.cc/BnBr7ZzC/Microsoft-and-Linkedin-PROFESSIONAL-CERTIFICATE.png",
      verifyLink: "https://image2url.com/pdfs/1765886917981-81c3d275-8732-472c-b2b6-99295450d656.pdf",
      skills: ["Generative AI", "Microsoft Copilot", "AI Ethics"]
    }
  ]
};
