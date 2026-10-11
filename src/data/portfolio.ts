import type { Portfolio } from "./types";

/**
 * All site content lives here. `satisfies Portfolio` makes a typo or a missing
 * field fail `npm run typecheck` instead of shipping a broken page.
 */
export const portfolio = {
  person: {
    name: "Mahmoud Essam",
    role: "AI Engineer",
    company: "eSpace",
    email: "umahmoudessamu@gmail.com",
    location: "Alexandria, Egypt",
    timeZone: "Africa/Cairo",
    cv: "https://drive.google.com/file/d/1epQFI1O36eSC0BaDiZbNu5IvdpRXHh3q/view?usp=sharing",
    photo: {
      // Re-fetched from GitHub on every build (scripts/prerender.mjs);
      // public/photo.jpg is the fallback if GitHub can't be reached.
      src: "/photo.jpg",
      github: "MahmoudEssam707",
      size: 500,
    },
  },

  hero: {
    intro:
      "AI engineer at eSpace in Alexandria. I train models, then do the less glamorous part: wiring them into real workflows and keeping them running in production.",
  },

  about: {
    paragraphs: [
      "I studied Data Science at Alexandria University and graduated in 2025. Most of my work sits between research and production: medical imaging, content moderation, and now multi-agent systems, RAG search and MCP tooling running in production at eSpace.",
      "I care about the parts that make a model useful after the notebook: reproducible training, tracked experiments, models small enough to deploy, and APIs someone can actually call.",
    ],
    facts: [
      { key: "role", value: "AI Engineer @ eSpace" },
      { key: "education", value: "BSc Data Science, Alexandria University (2025)" },
      { key: "cgpa", value: "3.82 / 4.00" },
      { key: "publications", value: "2" },
      { key: "location", value: "Alexandria, Egypt" },
    ],
  },

  experience: [
    {
      role: "AI Engineer",
      company: "eSpace",
      start: "Nov 2025",
      end: null,
      summary:
        "End-to-end AI solutions in the ATSO team, from multi-agent systems and RAG search to internal AI tooling and fine-tuned models.",
      highlights: [
        "Developed an AI Quality Control assistant that automated the lifecycle process by 86% and saved 96+, decreasing its weight from 30% to 10%.",
        "Designed a parallel multi-agent document-generation system with output guardrails, enabling bilingual (Arabic/English) report generation 70% faster.",
        "Engineered enterprise-grade hybrid RAG search pipelines across 8,600+ documents, using pgvector, vector embeddings and re-ranking.",
        "Created an internal AI marketplace for our Agentic SDLC, where 6 tools and 2 MCP servers were deployed to give agents secure access to internal platforms.",
        "Implemented an AI-powered anomaly detection system that analyzes 18 months of timesheet data to flag suspicious activity in real time during logging.",
        "Benchmarked 14 token-optimization tools and 6 AI coding agents to shape the team's AI stack.",
        "Fine-tuned specialized LLMs, computer vision and video generation models with LoRA and QLoRA.",
        "Mentored 7 engineering interns through the end-to-end development and deployment of the Executive Hub project.",
      ],
      tags: ["LangGraph", "Multi-Agent", "RAG", "pgvector", "qdrant", "MCP", "LoRA / QLoRA", "Guardrails", "AWS Bedrock"],
    },
    {
      role: "AI Trainee",
      company: "eSpace",
      start: "Jul 2025",
      end: "Aug 2025",
      summary:
        "Built an end-to-end AI application with the ATSO team: a Bayesian model that detects bots and frustrated users, an LLM-based recommender, and n8n automations for the API integrations, all containerised with Docker.",
      tags: ["Bayesian ML", "LLM", "n8n", "Docker"],
    },
    {
      role: "R&D Engineer",
      company: "Smart Technology",
      start: "Aug 2024",
      end: "Oct 2024",
      summary:
        "Designed PCBs (Arduino shield, ESP32-based) with LCDs, RFID, fingerprint readers and sensors. Built a mini CNC plotter and a 4-axis robotic arm driven by NEMA17 steppers and TMC drivers.",
      tags: ["PCB", "ESP32", "Robotics"],
    },
    {
      role: "ML Engineer Trainee",
      company: "Alexandria University, FOE",
      start: "Jul 2024",
      end: "Sep 2024",
      summary:
        "Led research on Alzheimer's detection from MRI, classifying dementia stages with CNNs, VGG16 and Vision Transformers. ViT reached 95.10% accuracy.",
      tags: ["PyTorch", "ViT", "Medical Imaging"],
    },
  ],

  projects: [
    {
      slug: "cdib",
      name: "CDIB",
      subtitle: "Leukemia detection from blood-cell images",
      description:
        "A CNN that detects leukemia in blood-cell images. Quantization cut the model size by 83% without losing accuracy, which makes it realistic for edge devices. Experiments are tracked in MLflow and the model is served through FastAPI in Docker.",
      metrics: [
        { label: "test accuracy", display: "98.53%", value: 98.53 },
        { label: "myeloblast recall", display: "100%", value: 100 },
        { label: "model size reduction", display: "83%", value: 83 },
      ],
      stack: ["PyTorch", "CNN", "Quantization", "MLflow", "FastAPI", "Docker"],
      repo: "https://github.com/MahmoudEssam707/portfolio-projects/tree/main/Data-Science/CDB%20-%20Cancer%20Detction%20in%20Blood",
      live: "https://portfolio-projects-production-5f4a.up.railway.app/",
    },
    {
      slug: "parkinsons-speech",
      name: "Parkinson's",
      subtitle: "Severity prediction from speech",
      description:
        "Predicts Parkinson's severity scores from speech features. Combining clustering-based feature selection with an Extra Trees regressor gave state-of-the-art R² on both targets. Published in Scientific Reports (2026).",
      metrics: [
        { label: "R² motor UPDRS", display: "0.999", value: 99.9 },
        { label: "R² total UPDRS", display: "0.997", value: 99.7 },
      ],
      stack: ["Scikit-Learn", "Clustering", "Extra Trees", "Feature Selection"],
      repo: "https://github.com/MahmoudEssam707",
    },
    {
      slug: "alzheimers-mri",
      name: "Alzheimer's",
      subtitle: "Dementia staging from MRI",
      description:
        "Classifies dementia stages from MRI scans. I compared CNNs, VGG16 and Vision Transformers; the ViT performed best.",
      metrics: [{ label: "ViT accuracy", display: "95.10%", value: 95.1 }],
      stack: ["PyTorch", "Vision Transformer", "VGG16", "CNN"],
      repo: "https://github.com/MahmoudEssam707",
    },
    {
      slug: "eeg-eye-state",
      name: "EEG Eye State",
      subtitle: "Open or closed, from brain signals",
      description:
        "Classifies whether eyes are open or closed from Emotiv EEG headset data. EDA, correlation analysis and outlier handling first, then a comparison of models. KNN won and now runs behind FastAPI with Prometheus monitoring.",
      metrics: [{ label: "KNN accuracy", display: "96.26%", value: 96.26 }],
      stack: ["Scikit-Learn", "KNN", "FastAPI", "Prometheus"],
      repo: "https://github.com/MahmoudEssam707/portfolio-projects/tree/main/Data-Science/ElectroEncePhalogram",
    },
    {
      slug: "tikguard",
      name: "TikGuard",
      subtitle: "Flagging TikTok videos unsuitable for kids",
      description:
        "A transformer-based model that flags short videos unsuitable for children, using text, audio transcripts and metadata. Trained and evaluated on the custom TikHarm dataset.",
      metrics: [{ label: "accuracy on TikHarm", display: "86.7%", value: 86.7 }],
      stack: ["Transformers", "NLP", "Video Analysis"],
      repo: "https://github.com/MahmoudEssam707",
    },
    {
      slug: "ecofarm",
      name: "EcoFarm",
      subtitle: "IoT farming with online learning",
      description:
        "Led a team building an IoT smart-farming system. I designed the custom PCB, then a crop-prediction model that learns incrementally so it keeps improving without taking the system down. A chatbot gives farmers advice on top of it.",
      metrics: [
        { label: "sensor readings validated", display: "10,000+" },
        { label: "downtime for model updates", display: "0" },
      ],
      stack: ["IoT", "Incremental Learning", "PCB Design", "LLM Chatbot"],
      repo: "https://github.com/MahmoudEssam707/EcoFarm",
    },
  ],

  skills: [
    {
      area: "AI Engineering",
      tools: ["LangChain", "LangGraph", "MCP (FastMCP)", "RAG", "Multi-Agent Systems", "Claude Code Plugins & Skills", "Prompt Engineering", "Guardrails"],
    },
    {
      area: "LLMs & APIs",
      tools: ["OpenAI API", "Gemini API", "AWS Bedrock", "LiteLLM", "LLM Evaluation", "LLM Observability", "LLMOps", "Token & Cost Optimization"],
    },
    {
      area: "ML & NLP",
      tools: ["PyTorch", "Hugging Face Transformers", "NLP", "LLM Fine-Tuning (LoRA / QLoRA / Unsloth)", "Knowledge Distillation", "Vision-Language Models", "Reinforcement Learning"],
    },
    {
      area: "AI Tooling",
      tools: ["Claude Code", "Agentic SDLC", "Spec-Driven Development", "Dify", "n8n"],
    },
    {
      area: "Languages",
      tools: ["Python", "TypeScript", "JavaScript", "Java"],
    },
    {
      area: "Frontend",
      tools: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "NextAuth"],
    },
    {
      area: "Backend",
      tools: ["FastAPI", "Flask", "Django", "Node.js", "Express", "GraphQL"],
    },
    {
      area: "Data",
      tools: ["PostgreSQL", "pgvector", "qdrant", "Weaviate", "S3 Object Storage"],
    },
    {
      area: "Cloud & DevOps",
      tools: ["AWS (S3, Bedrock)", "Docker", "CI/CD (GitHub Actions, Jenkins)", "Linux", "Git"],
    },
  ],

  papers: [
    {
      year: "2026",
      title:
        "Adaptive regression model for Parkinson's disease diagnosis from speech signals using Box-Cox-based clustering and extremely randomization",
      venue: "Scientific Reports",
      abstract:
        "Predicts Motor- and Total-UPDRS scores from voice measurements: Box-Cox normalisation, K-Means clustering-based feature selection, and an Extra Trees regressor, evaluated with subject-independent splits and k-fold cross-validation.",
      highlight: "R² 0.999 motor, 0.997 total",
      url: "https://www.nature.com/articles/s41598-026-49065-2",
    },
    {
      year: "2024",
      title: "TikGuard: Transformer-Based Deep Learning for Unsuitable TikTok Content Detection",
      venue: "IEEE Xplore",
      abstract:
        "A transformer approach to classifying unsuitable short-form video content using text, audio transcripts and metadata.",
      highlight: "multilingual transformer",
      url: "https://ieeexplore.ieee.org/document/10753192",
    },
  ],

  contact: {
    blurb: "Email is the fastest way to reach me. I'm open to AI/ML engineering roles, research and collaborations.",
    socials: [
      { label: "GitHub", handle: "MahmoudEssam707", url: "https://github.com/MahmoudEssam707", icon: "github" },
      { label: "LinkedIn", handle: "mahmoudessam7", url: "https://linkedin.com/in/mahmoudessam7", icon: "linkedin" },
      { label: "Kaggle", handle: "mahmoudessamgabr", url: "https://kaggle.com/mahmoudessamgabr", icon: "kaggle" },
    ],
  },

  site: {
    // TODO: set to your production domain (used by canonical, OG and sitemap).
    url: "https://mahmoud-essam.vercel.app",
    title: "Mahmoud Essam, AI Engineer",
    description:
      "AI engineer in Alexandria building agentic workflows, computer vision and production ML systems. Projects, papers and experience.",
    year: 2026,
  },
} satisfies Portfolio;
