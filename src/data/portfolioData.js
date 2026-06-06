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
    hackathons: 5,
    events: 12,
    certificates: 8,
    connections: 500,
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
  ],
  techJourney: [
    {
      id: "journey-oscg",
      name: "Open Source Connect Global (OSCG'26)",
      role: "Campus Lead",
      date: "January 2026 - Present",
      location: "SRM University, Chennai",
      description: "Appointed as Campus Lead to foster open-source collaboration, organize hands-on technical workshops, and direct developer hackathons at SRM. Working directly with global project maintainers to construct student open-source pathways.",
      banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Web_development_icon.png",
      verifyLink: "https://image2url.com/pdfs/1765886844676-53f96413-c487-4447-aa35-0475b8c5b716.pdf"
    },
    {
      id: "journey-gssoc",
      name: "GirlScript Summer of Code (GSSoC'25)",
      role: "Campus Ambassador & Contributor",
      date: "May 2025 - August 2025",
      location: "Remote / India",
      description: "Contributed to major open-source web assets, reviewed pull requests, led contributor sessions, and promoted collaborative Git workflows among student teams. Built several interactive custom web layouts.",
      banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      logo: "https://image2url.com/images/1765895074258-5ed13062-fcc5-450b-aea0-4fa4e9e43afa.png",
      verifyLink: "https://image2url.com/pdfs/1765886917981-81c3d275-8732-472c-b2b6-99295450d656.pdf"
    },
    {
      id: "journey-gdg",
      name: "GDG DevFest Meetup Chennai",
      role: "Community Member",
      date: "November 2025",
      location: "Chennai, India",
      description: "Participated in DevFest technical sessions focusing on advanced Web development, Gemini AI integration, and cloud-native solutions. Exchanged software architectural ideas with lead Google engineers.",
      banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
      verifyLink: "https://image2url.com/pdfs/1765886844676-53f96413-c487-4447-aa35-0475b8c5b716.pdf"
    },
    {
      id: "journey-nvidia",
      name: "NVIDIA Generative AI Workshop",
      role: "Attendee",
      date: "February 2026",
      location: "SRM Campus",
      description: "Acquired deep insight into generative modeling, transformer architectures, and CUDA optimizations. Trained custom embeddings and deployed fine-tuned LLM architectures on local inference pipelines.",
      banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Nvidia_logo_%282012%29.svg",
      verifyLink: "https://image2url.com/pdfs/1765886917981-81c3d275-8732-472c-b2b6-99295450d656.pdf"
    }
  ],
  hackathons: [
    {
      id: "hack-hacksrm",
      name: "HackSRM 2025",
      projectName: "Predictive Diabetes Health Engine",
      status: "Winner",
      date: "March 2025",
      banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      description: "Designed a secure ML pipeline using SVM classifiers for predictive diabetes analysis, running on a FastAPI backend and interactive React UI. Ensured strict input validation and accuracy optimizations.",
      techStack: ["React", "FastAPI", "Python", "Scikit-learn", "SVM"],
      achievements: "Secured 1st Place overall in Health Tech Track. Successfully minimized classification baseline bias.",
      learnings: "Mastered hyperparameter tuning for radial basis function (RBF) kernels and high-frequency React form rendering.",
      github: "https://github.com/kanishka3125",
      demoLink: "https://github.com/kanishka3125"
    },
    {
      id: "hack-devfest",
      name: "GDG DevFest Hackathon 2025",
      projectName: "Real-Time Emotion Calibration",
      status: "Finalist",
      date: "October 2025",
      banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      description: "Created a real-time computer vision expression analyzer using DeepFace and OpenCV over high-performance WebSocket channels, with baseline calibration to resolve user resting-face variance.",
      techStack: ["TensorFlow", "DeepFace", "OpenCV", "FastAPI", "WebSockets"],
      achievements: "Nominated in Top 5 overall hacks. Highlighted for architectural elegance in stream handling.",
      learnings: "Gained insights into low-latency frame serialization and multi-threading models in Python server setups.",
      github: "https://github.com/kanishka3125/emotion_detector.git",
      demoLink: "https://github.com/kanishka3125"
    },
    {
      id: "hack-sih",
      name: "Smart India Hackathon (SIH'25)",
      projectName: "Decentralized File Synchronization",
      status: "Qualified",
      date: "September 2025",
      banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      description: "Engineered robust multi-peer synchronization layouts with WebSocket communication, temporal versioning, and auto-conflict resolutions.",
      techStack: ["Node.js", "Express", "WebSockets", "Docker", "Tailwind CSS"],
      achievements: "Successfully qualified for national finals. Rated highly on fault-tolerance testing.",
      learnings: "Mastered conflict resolution strategies in distributed peer systems and virtual network testing under Docker.",
      github: "https://github.com/kanishka3125",
      demoLink: "https://github.com/kanishka3125"
    }
  ]
};
