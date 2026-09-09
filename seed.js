// Seed data based on Lalith Kumar S's updated resume
require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');

// Ensure SRV DNS lookup succeeds on networks with restricted ISP DNS
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported in environment
}

const Profile = require('./models/profile.model');
const Skill = require('./models/skill.model');
const Education = require('./models/education.model');
const Experience = require('./models/experience.model');
const Project = require('./models/project.model');
const Contact = require('./models/contact.model');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Education.deleteMany();
    await Experience.deleteMany();
    await Project.deleteMany();
    await Contact.deleteMany();

    // Seed Profile
    const profile = new Profile({
      name: 'Lalith Kumar S',
      title: 'Frontend MEAN Stack Developer',
      summary: 'Dedicated and detail-oriented B.Com (Computer Applications) graduate seeking an entry-level opportunity in Software Development, Frontend Development, IT Support, or Technical Support. Possess practical knowledge of HTML, CSS, JavaScript, React.js, Angular, Node.js, Express.js, MongoDB, and REST APIs, with hands-on experience developing web applications. Strong problem-solving and troubleshooting abilities with a willingness to learn new technologies and contribute effectively to a collaborative team.',
      location: 'Ramanathapuram, Tamil Nadu',
      email: 'snslalith@gmail.com',
      phone: '+91 6380929051'
    });
    await profile.save();

    // Seed Skills
    const skills = [
      { title: 'HTML', level: 'intermediate', category: 'frontend' },
      { title: 'CSS', level: 'intermediate', category: 'frontend' },
      { title: 'JavaScript (ES6+)', level: 'intermediate', category: 'frontend' },
      { title: 'React.js', level: 'intermediate', category: 'frontend' },
      { title: 'Angular', level: 'intermediate', category: 'frontend' },
      { title: 'Node.js', level: 'intermediate', category: 'backend' },
      { title: 'Express.js', level: 'intermediate', category: 'backend' },
      { title: 'MongoDB', level: 'intermediate', category: 'backend' },
      { title: 'REST API Basics', level: 'intermediate', category: 'backend' },
      { title: 'API Testing', level: 'intermediate', category: 'backend' },
      { title: 'Technical Troubleshooting', level: 'advanced', category: 'tools' },
      { title: 'Problem Solving', level: 'advanced', category: 'tools' }
    ];
    await Skill.insertMany(skills);

    // Seed Education
    const education = [
      {
        institution: 'Sri Ramakrishna College of Arts and Science, Coimbatore',
        degree: 'Bachelor of Commerce (Computer Applications)',
        graduationYear: 2024,
        period: '2021 – 2024',
        percentage: 'CGPA: 7.0',
        score: 'CGPA: 7.0',
        highlights: ['Major in Computer Applications & Business Information Systems']
      },
      {
        institution: 'Krishana International School, Ramanathapuram',
        degree: 'Higher Secondary Certificate (HSC)',
        graduationYear: 2023,
        period: '2022 – 2023',
        percentage: 'Percentage: 85%',
        score: 'Percentage: 85%',
        highlights: ['High academic performance in Commerce and Computer Science stream']
      },
      {
        institution: 'Krishana International School, Ramanathapuram',
        degree: 'Secondary School Leaving Certificate (SSLC)',
        graduationYear: 2021,
        period: '2020 – 2021',
        percentage: 'Percentage: 81.4%',
        score: 'Percentage: 81.4%',
        highlights: ['Strong foundation in mathematics, science, and computer fundamentals']
      }
    ];
    await Education.insertMany(education);

    // Seed Experience
    const experience = [
      {
        company: 'BLP Industry.ai, Bangalore',
        position: 'Intern',
        duration: 'August 2026 – Present',
        description: 'Currently working as an intern in a professional software development environment. Contributing to assigned technical and development tasks. Gaining practical experience with software development workflows, teamwork, and industry practices.',
        highlights: [
          'Currently working as an intern in a professional software development environment.',
          'Contributing to assigned technical and development tasks.',
          'Gaining practical experience with software development workflows, teamwork, and industry practices.'
        ],
        technologies: ['Software development', 'Development workflows', 'Teamwork', 'Industry practices']
      },
      {
        company: 'QCerebrum Software Solutions, Bangalore',
        position: 'Frontend Developer Intern',
        duration: 'May 2026 – July 2026',
        description: 'Worked as a Frontend Developer Intern in a remote working environment. Developed and improved responsive web interfaces using frontend technologies. Worked on assigned frontend development tasks and implemented user interface features. Gained practical experience in frontend development, debugging, and troubleshooting.',
        highlights: [
          'Worked as a Frontend Developer Intern in a remote working environment.',
          'Developed and improved responsive web interfaces using frontend technologies.',
          'Worked on assigned frontend development tasks and implemented user interface features.',
          'Gained practical experience in frontend development, debugging, and troubleshooting.'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Frontend Debugging', 'Troubleshooting']
      },
      {
        company: 'Blinking Soft Pvt. Ltd.',
        position: 'Intern',
        duration: '1 Month | During College',
        description: 'Gained practical exposure to software development and web-related technologies. Worked collaboratively with experienced professionals on assigned tasks and projects. Developed an understanding of software development workflows and industry practices.',
        highlights: [
          'Gained practical exposure to software development and web-related technologies.',
          'Worked collaboratively with experienced professionals on assigned tasks and projects.',
          'Developed an understanding of software development workflows and industry practices.'
        ],
        technologies: ['Software development', 'Web technologies', 'Collaboration']
      }
    ];
    await Experience.insertMany(experience);

    // Seed Projects
    const projects = [
      {
        title: 'Task Flow',
        tagline: 'Intern Task Assignment & Management System',
        description: 'A web-based task management application designed to help managers assign, track, and manage tasks while enabling interns to monitor their work and update task progress.',
        category: 'Full-Stack Project',
        highlights: [
          'Developed a role-based task management system for managers and interns.',
          'Implemented task creation, assignment, tracking, and status updates.',
          'Built responsive dashboards for managing and monitoring tasks.',
          'Integrated real-time notifications using Socket.IO.',
          'Connected Angular frontend with Node.js backend using REST APIs.',
          'Used MongoDB for storing users, tasks, and application data.',
          'Tested APIs using Postman and resolved development issues.',
          'Deployed the application using Vercel.'
        ],
        technologies: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Socket.IO', 'Postman', 'Vercel'],
        githubLink: 'https://github.com/Lalith313618',
        demoLink: 'https://task-flow-lalith10.vercel.app/login'
      },
      {
        title: 'MediConnect',
        tagline: 'Web-Based Healthcare Application',
        description: 'Developed a web-based healthcare application with a user-friendly interface. Built responsive web interfaces using modern web development technologies. Integrated frontend functionality with backend services and APIs. Used MongoDB for managing application data. Tested functionality and resolved technical issues through debugging and troubleshooting. Deployed the application using Vercel.',
        category: 'Full-Stack Project',
        highlights: [
          'Developed a web-based healthcare application with a user-friendly interface.',
          'Built responsive web interfaces using modern web development technologies.',
          'Integrated frontend functionality with backend services and APIs.',
          'Used MongoDB for managing application data.',
          'Tested functionality and resolved technical issues through debugging and troubleshooting.',
          'Deployed the application using Vercel.'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Vercel'],
        githubLink: 'https://github.com/Lalith313618',
        demoLink: 'https://medi-connect-6c7c.vercel.app/'
      },
      {
        title: 'Student Management System',
        tagline: 'Web-Based Student Records System',
        description: 'Developed a web-based system for managing student information and records. Implemented features for adding, viewing, updating, and managing student data. Connected the frontend with backend services and a database using APIs. Tested application functionality and resolved development issues.',
        category: 'Full-Stack Project',
        highlights: [
          'Developed a web-based system for managing student information and records.',
          'Implemented features for adding, viewing, updating, and managing student data.',
          'Connected the frontend with backend services and a database using APIs.',
          'Tested application functionality and resolved development issues.'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        githubLink: 'https://github.com/Lalith313618',
        demoLink: 'https://student-management-system-5we6.vercel.app/'
      },
      {
        title: 'Web Development Projects',
        tagline: 'Responsive UI Design & Component Engineering',
        description: 'Developed dynamic and responsive web interfaces using HTML, CSS, JavaScript, and React.js, focusing on high-quality user experience and clean code.',
        category: 'Frontend Project',
        highlights: [
          'Developed responsive web interfaces using HTML, CSS, JavaScript, and React.js.',
          'Created clean, user-friendly layouts optimized for varied screen sizes.',
          'Ensured cross-browser rendering consistency and performance.'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Responsive Web Design'],
        githubLink: 'https://github.com/Lalith313618'
      }
    ];
    await Project.insertMany(projects);

    // Seed Contact
    const contact = new Contact({
      email: 'snslalith@gmail.com',
      phone: '+91 6380929051',
      address: 'Ramanathapuram, Tamil Nadu',
      linkedin: 'https://www.linkedin.com/in/lalith-kumar-9034a4292/',
      github: 'https://github.com/Lalith313618'
    });
    await contact.save();

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();