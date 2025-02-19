import React, { useState, useEffect } from 'react';
import { Command, Project } from '../types';
import { projects } from '../data/projects';
import { useTerminalStore } from '../store/terminalStore';
import { Brain, Code, Download, Mail, Github, Linkedin, MessageSquare, Terminal as TerminalIcon, Palette, Type, Settings } from 'lucide-react';
import { getGeminiResponse } from './gemini';

const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  execute: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-yellow-400 mb-2">
        <TerminalIcon className="w-5 h-5" />
        <h2 className="text-xl font-bold">Available Commands</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <Code className="w-4 h-4" />
            Navigation & Info
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>help - Show this help message</li>
            <li>clear - Clear terminal history</li>
            <li>about - About me</li>
            <li>history - Show command history</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Customization
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>theme [name] - Change theme</li>
            <li className="ml-4 text-sm text-gray-400">Available: matrix, cyberpunk, retro, midnight, synthwave, dracula, nord, solarized</li>
            <li>font [name] - Change font</li>
            <li className="ml-4 text-sm text-gray-400">Options: Fira Code, JetBrains Mono, Source Code Pro, Ubuntu Mono, Cascadia Code</li>
            <li>fontsize [size] - Set font size (12-20)</li>
            <li>opacity [value] - Set terminal opacity (0.1-1.0)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Professional
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>skills - List my technical skills</li>
            <li>education - Show education history</li>
            <li>experience - Show work experience</li>
            <li>achievements - List achievements and certifications</li>
            <li>contact - Show contact information</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Projects & Tools
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>ls projects - List all projects</li>
            <li>open [project_name] - Show project details</li>
            <li>playground - Open JavaScript playground</li>
            <li>tree - View interactive skills tree</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" />
            Resume
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>sudo hire_me - View and download my resume</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Interactive
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>ask [question] - Ask the AI assistant</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <p className="text-gray-400">💡 Tips:</p>
        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400">
          <li>Use arrow keys ↑↓ to navigate command history</li>
          <li>Try finding some hidden easter eggs! 🥚</li>
          <li>Type 'clear' to reset the terminal</li>
        </ul>
      </div>
    </div>
  ),
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear terminal history',
  execute: () => {
    const { clearHistory } = useTerminalStore.getState();
    clearHistory();
    return '';
  },
};

const aboutCommand: Command = {
  name: 'about',
  description: 'About me',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">About Me</h2>
      <p className="leading-relaxed">
        Hi! I'm Harsh Rupesh Shah, a passionate software engineering student with a focus on building 
        exceptional digital experiences. With 1 year of experience in full-stack 
        development, I specialize in creating scalable web applications using modern 
        technologies.
      </p>
      <p className="leading-relaxed">
        When I'm not coding, you can find me learning about new technologies,
        playing sports, or exploring new ways to learn something. I'm particularly
        interested in Web development, CyberSecurity, Blockchain Network, Artificial Intelligence & Machine Learning and building high-performance
        applications.
      </p>
      <div className="text-sm text-gray-400 mt-4">
        Type 'contact' to get in touch or 'skills' to see my technical expertise.
      </div>
    </div>
  ),
};

const contactCommand: Command = {
  name: 'contact',
  description: 'Show contact information',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="mailto:hrsshah04022004@gmail.com"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <Mail className="w-5 h-5" />
          hrsshah04022004@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/harshshah2004/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <Linkedin className="w-5 h-5" />
          LinkedIn Profile
        </a>
        <a
          href="https://github.com/Harsh-Rupesh-Shah"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <Github className="w-5 h-5" />
          GitHub Profile
        </a>
        <a
          href="https://wa.me/9175366700"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <MessageSquare className="w-5 h-5" />
          WhatsApp Chat
        </a>
      </div>
    </div>
  ),
};

const skillsCommand: Command = {
  name: 'skills',
  description: 'List technical skills',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-green-400 font-semibold mb-2">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript'].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-green-500/20 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-green-400 font-semibold mb-2">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {['Node.js', 'Python', 'SQL', 'MongoDB', 'Express'].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-green-500/20 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-green-400 font-semibold mb-2">Languages & Other Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['C/C++', 'Java', 'Git', 'Render & Netlify', 'Amazon Amplify'].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-green-500/20 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

const educationCommand: Command = {
  name: 'education',
  description: 'Show education history',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Education</h2>
      <div className="space-y-6">
        <div className="border-l-2 border-green-500/20 pl-4">
          <h3 className="font-semibold text-green-400">B.Tech In Computer Science & Engineering</h3>
          <p className="text-gray-400">D.J Sanghvi College Of Engineering • 2022-2025</p>
          <p className="mt-2">
            Specialized in CyberSecurity and Blockchain Technology <br />
            Learned Core Computer Technologies like Operating System, Computer Networks, System Design & Testing. <br />
            Minors: Artificial Intelligence & Machine Learning <br />
            CGPA: 8.8/10 <br />
          </p>
        </div>
        <div className="border-l-2 border-green-500/20 pl-4">
          <h3 className="font-semibold text-green-400">Diploma In Computer Engineering</h3>
          <p className="text-gray-400">Shri Bhagubhai Mafatlal Polytechnic • 2016-2020</p>
          <p className="mt-2">
            Percentage: 92.25%
          </p>
        </div>
      </div>
    </div>
  ),
};

const experienceCommand: Command = {
  name: 'experience',
  description: 'Show work experience',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Work Experience</h2>
      <div className="space-y-6">
        <div className="border-l-2 border-green-500/20 pl-4">
          <h3 className="font-semibold text-green-400">Full Stack Developer</h3>
          <p className="text-gray-400">Space Agency • Aug 2024-Present</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Delivered high-impact web development projects using advanced JavaScript, HTML, CSS, and modern frameworks,
            ensuring client satisfaction and project success.</li>
            <li>Designed and implemented a custom flipbook feature using jQuery, eliminating the need for costly third-party
            solutions and saving the client significant expenses.</li>
            <li>Collaborated closely with clients to tailor web applications to their specific needs, ensuring exceptional functionality
            and user experience.</li>
          </ul>
        </div>
        <div className="border-l-2 border-green-500/20 pl-4">
          <h3 className="font-semibold text-green-400">Full Stack Developer (Intern) </h3>
          <p className="text-gray-400">Space Agency • June 2024 - Aug 2024</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Created a highly secure login system using JWT, cookies, encryption, and decryption techniques to safeguard user
            data and authentication processes.</li>
            <li>Developed a comprehensive web application using the MERN stack, incorporating Redux, Redux Toolkit, and
            Redux Saga for efficient state management and seamless data flow</li>
            <li>Built robust backend functionalities with Node.js, ensuring data integrity and secure communication between the
            server and client.</li>
          </ul>
        </div>
        <div className="border-l-2 border-green-500/20 pl-4">
          <h3 className="font-semibold text-green-400">FrontEnd Web Developer (Intern) </h3>
          <p className="text-gray-400">Katapult Technologies Pvt. Ltd • July 2021 - Sep 2021</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Designed and developed the frontend of a Broadband Service website, ensuring a user-friendly and visually appealing
            interface.</li>
            <li>Utilized HTML, CSS, Bootstrap, and JavaScript to implement responsive and modern UI components</li>
            <li>Collaborated with the development team to align the design with project requirements, enhancing usability and
            performance.</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

const achievementsCommand: Command = {
  name: 'achievements',
  description: 'List achievements and certifications',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Achievements & Extra Curricular Activites</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-green-400 font-semibold mb-2">Achievements</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Smart India Hackathon 2024 – National Finalist | India</li>
          </ul>
        </div>
        <div>
          <h3 className="text-green-400 font-semibold mb-2">Extra Curricular Activites</h3>
          <div className="space-y-2">
            <div className="border border-green-500/20 rounded p-2">
              <h4 className="font-medium">Research Publication – IJARSCT Journal</h4>
              <p className="text-sm text-gray-400">Published research paper titled Coded Websites Vs WordPress Websites in IJARSCT (10.48175/IJARSCT-2140).</p>
            </div>
            <div className="border border-green-500/20 rounded p-2">
              <h4 className="font-medium">SBMP Cultural Committee – Event Manager</h4>
              <p className="text-sm text-gray-400">Led and managed various events for the SBMP Cultural Committee, ensuring smooth execution and high participation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

const projectsCommand: Command = {
  name: 'ls',
  description: 'List projects',
  usage: 'ls projects',
  execute: (args) => {
    if (args?.[0] !== 'projects') {
      return 'Usage: ls projects';
    }
    
    return (
      <div className="space-y-2">
        <p className="text-yellow-400">My Projects:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.name} className="border border-green-500/20 rounded p-2">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

const openCommand: Command = {
  name: 'open',
  description: 'Open project details',
  usage: 'open [project_name]',
  execute: (args) => {
    if (!args?.[0]) {
      return 'Usage: open [project_name]';
    }

    const project = projects.find(
      (p) => p.name.toLowerCase() === args[0].toLowerCase()
    );

    if (!project) {
      return `Project "${args[0]}" not found. Use "ls projects" to see available projects.`;
    }

    return (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-yellow-400">{project.name}</h3>
        <p>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-green-500/20 rounded text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="space-x-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
        {project.screenshot && (
          <img 
            src={project.screenshot} 
            alt={project.name} 
            className="mt-4 rounded-lg shadow-lg border border-green-500/20"
          />
        )}
      </div>
    );
  },
};

const themeCommand: Command = {
  name: 'theme',
  description: 'Change terminal theme',
  usage: 'theme [name]',
  execute: (args) => {
    const { setTheme } = useTerminalStore.getState();
    const themes = ['matrix', 'cyberpunk', 'retro', 'midnight', 'synthwave', 'dracula', 'nord', 'solarized'];
    
    if (!args?.[0] || !themes.includes(args[0])) {
      return `Available themes: ${themes.join(', ')}`;
    }
    
    setTheme(args[0] as any);
    return `Theme changed to ${args[0]}`;
  },
};

const fontCommand: Command = {
  name: 'font',
  description: 'Change terminal font',
  usage: 'font [name]',
  execute: (args) => {
    const { setFont } = useTerminalStore.getState();
    const fonts = ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Ubuntu Mono', 'Cascadia Code'];
    
    if (!args?.[0] || !fonts.includes(args[0])) {
      return `Available fonts: ${fonts.join(', ')}`;
    }
    
    setFont(args[0] as any);
    return `Font changed to ${args[0]}`;
  },
};

const fontSizeCommand: Command = {
  name: 'fontsize',
  description: 'Set font size',
  usage: 'fontsize [size]',
  execute: (args) => {
    const { setFontSize } = useTerminalStore.getState();
    const size = parseInt(args?.[0] || '');
    
    if (isNaN(size) || size < 12 || size > 20) {
      return 'Please specify a font size between 12 and 20';
    }
    
    setFontSize(size);
    return `Font size set to ${size}px`;
  },
};

const opacityCommand: Command = {
  name: 'opacity',
  description: 'Set terminal opacity',
  usage: 'opacity [value]',
  execute: (args) => {
    const { setOpacity } = useTerminalStore.getState();
    const opacity = parseFloat(args?.[0] || '');
    
    if (isNaN(opacity) || opacity < 0.1 || opacity > 1) {
      return 'Please specify an opacity value between 0.1 and 1.0';
    }
    
    setOpacity(opacity);
    return `Terminal opacity set to ${opacity}`;
  },
};

const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  execute: () => {
    const { commandHistory } = useTerminalStore.getState();
    return (
      <div className="space-y-2">
        <h3 className="text-yellow-400">Command History:</h3>
        <div className="space-y-1">
          {commandHistory.map((cmd, index) => (
            <div key={index}>
              <span className="text-gray-400">{index + 1}</span> {cmd}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

const askCommand: Command = {
  name: 'ask',
  description: 'Ask the AI assistant',
  usage: 'ask [question]',
  execute: async (args) => {
    if (!args?.length) {
      return 'Usage: ask [your question about my experience or skills]';
    }
    
    const question = args.join(' ');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400">AI Assistant</span>
        </div>
        <div className="border-l-2 border-purple-500/20 pl-4">
          <AskResponse question={question} />
        </div>
      </div>
    );
  },
};

const AskResponse: React.FC<{ question: string }> = ({ question }) => {
  const [response, setResponse] = useState<string>('Thinking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const result = await getGeminiResponse(question);
        setResponse(result);
      } catch (err) {
        setError('Sorry, I encountered an error. Please try again later.');
        console.error('Error getting AI response:', err);
      }
    };

    fetchResponse();
  }, [question]);

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="relative">
      {response === 'Thinking...' && (
        <div className="flex items-center gap-2">
          <div className="animate-pulse">⚡</div>
          <span>{response}</span>
        </div>
      )}
      {response !== 'Thinking...' && (
        <div className="prose prose-invert max-w-none">
          {response}
        </div>
      )}
    </div>
  );
};

const treeCommand: Command = {
  name: 'tree',
  description: 'View interactive skills tree',
  execute: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-yellow-400">Skills Tree</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="text-green-400 font-semibold">Frontend</h3>
          <div className="border-l-2 border-green-500/20 pl-4 space-y-2">
            <div>
              <span className="font-medium">React</span>
              <div className="ml-4 text-sm text-gray-400">
                ├── Redux
                <br />
                ├── Next.js
                <br />
                └── Testing
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-blue-400 font-semibold">Backend</h3>
          <div className="border-l-2 border-blue-500/20 pl-4 space-y-2">
            <div>
              <span className="font-medium">Node.js</span>
              <div className="ml-4 text-sm text-gray-400">
                ├── Express
                <br />
                ├── GraphQL
                <br />
                └── MongoDB
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-purple-400 font-semibold">DevOps</h3>
          <div className="border-l-2 border-purple-500/20 pl-4 space-y-2">
            <div>
              <span className="font-medium">Cloud</span>
              <div className="ml-4 text-sm text-gray-400">
                ├── AWS
                <br />
                ├── Docker
                <br />
                └── Kubernetes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Easter Eggs
const matrixCommand: Command = {
  name: 'matrix',
  description: 'Hidden matrix command',
  execute: () => (
    <div className="animate-pulse text-green-400">
      <pre>
        {`
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.
        `}
      </pre>
    </div>
  ),
};

const hackCommand: Command = {
  name: 'hack',
  description : 'Hidden hack command',
  execute: () => (
    <div className="space-y-2">
      <div className="animate-pulse">
        <span className="text-green-400">Initializing hack sequence...</span>
      </div>
      <pre className="text-xs">
        {Array(10).fill(0).map(() => 
          Math.random().toString(36).substring(2)
        ).join('\n')}
      </pre>
      <div className="text-red-400">ACCESS DENIED</div>
    </div>
  ),
};

const commands: Record<string, Command> = {
  help: helpCommand,
  ls: projectsCommand,
  open: openCommand,
  clear: clearCommand,
  about: aboutCommand,
  contact: contactCommand,
  skills: skillsCommand,
  education: educationCommand,
  experience: experienceCommand,
  achievements: achievementsCommand,
  playground: {
    name: 'playground',
    description: 'Open JavaScript playground',
    execute: () => 'Opening JavaScript playground...',
  },
  theme: themeCommand,
  font: fontCommand,
  fontsize: fontSizeCommand,
  opacity: opacityCommand,
  history: historyCommand,
  ask: askCommand,
  tree: treeCommand,
  matrix: matrixCommand,
  hack: hackCommand,
};

export const executeCommand = (input: string): string | JSX.Element => {
  const [cmd, ...args] = input.split(' ');
  
  if (!commands[cmd]) {
    if (cmd === 'sudo' && args[0] === 'hire_me') {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-green-400" />
            <p className="text-yellow-400 text-xl">🎉 Excellent choice! Here's my resume:</p>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-green-400">Professional Summary</h2>
              <p className="mt-2">
                Senior Software Engineer with [X] years of experience in full-stack development,
                specializing in building scalable web applications and microservices architectures.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-400">Key Achievements</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Led development of enterprise-level applications</li>
                <li>Reduced system latency by 40% through optimization</li>
                <li>Mentored 10+ junior developers</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded hover:bg-green-500/30 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded hover:bg-blue-500/30 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      );
    }
    
    // Easter egg responses for invalid commands
    const easterEggs = [
      "You found a bug? Just kidding, try 'help' instead!",
      "Nice try, hacker! But that's not a valid command.",
      "Error 418: I'm a teapot. Just kidding! Try 'help' for valid commands.",
      "Close, but no cigar! Type 'help' to see what I can do.",
      "Hmm, that's not quite right. Maybe try 'matrix' for something fun?",
    ];
    
    return easterEggs[Math.floor(Math.random() * easterEggs.length)];
  }

  return commands[cmd].execute(args);
};