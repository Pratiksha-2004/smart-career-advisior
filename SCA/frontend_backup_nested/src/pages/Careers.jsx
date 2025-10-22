import React, { useState, useEffect } from 'react'
import './Careers.css'

function Careers() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCareers, setFilteredCareers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [careersPerPage] = useState(12) // Show 12 careers per page

  const careerCategories = [
    { id: 'all', name: 'All Careers', icon: '🎯' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'healthcare', name: 'Healthcare', icon: '⚕️' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' }
  ]

  const careersData = [
    {
      id: 1,
      title: 'Software Developer',
      category: 'technology',
      salary: '$75,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Design, develop, and maintain software applications and systems.',
      skills: ['Programming', 'Problem Solving', 'Algorithms', 'Debugging'],
      demand: 95,
      satisfaction: 88
    },
    {
      id: 2,
      title: 'Data Scientist',
      category: 'technology',
      salary: '$80,000 - $130,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Extract insights from large datasets to drive business decisions.',
      skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
      demand: 92,
      satisfaction: 85
    },
    {
      id: 3,
      title: 'UX Designer',
      category: 'creative',
      salary: '$65,000 - $110,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create intuitive and engaging user experiences for digital products.',
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Figma/Sketch'],
      demand: 88,
      satisfaction: 90
    },
    {
      id: 4,
      title: 'Product Manager',
      category: 'business',
      salary: '$85,000 - $140,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Guide product development from conception to launch.',
      skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
      demand: 85,
      satisfaction: 87
    },
    {
      id: 5,
      title: 'Nurse Practitioner',
      category: 'healthcare',
      salary: '$90,000 - $125,000',
      growth: 'Very High',
      education: 'Master\'s Degree',
      description: 'Provide advanced nursing care and patient treatment.',
      skills: ['Clinical Skills', 'Patient Care', 'Diagnosis', 'Communication'],
      demand: 98,
      satisfaction: 92
    },
    {
      id: 6,
      title: 'Mechanical Engineer',
      category: 'engineering',
      salary: '$70,000 - $115,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and develop mechanical systems and products.',
      skills: ['CAD Software', 'Physics', 'Mathematics', 'Problem Solving'],
      demand: 78,
      satisfaction: 83
    },
    {
      id: 7,
      title: 'Digital Marketing Manager',
      category: 'business',
      salary: '$60,000 - $100,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Develop and execute digital marketing strategies.',
      skills: ['SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media'],
      demand: 82,
      satisfaction: 81
    },
    {
      id: 8,
      title: 'Elementary Teacher',
      category: 'education',
      salary: '$45,000 - $75,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree + Certification',
      description: 'Educate and nurture young learners in elementary subjects.',
      skills: ['Teaching', 'Patience', 'Communication', 'Creativity'],
      demand: 75,
      satisfaction: 89
    },
    // Technology Careers
    {
      id: 9,
      title: 'Cybersecurity Analyst',
      category: 'technology',
      salary: '$85,000 - $140,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Protect organizations from cyber threats and security breaches.',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
      demand: 96,
      satisfaction: 86
    },
    {
      id: 10,
      title: 'DevOps Engineer',
      category: 'technology',
      salary: '$90,000 - $150,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Bridge development and operations to streamline software delivery.',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
      demand: 94,
      satisfaction: 88
    },
    {
      id: 11,
      title: 'Mobile App Developer',
      category: 'technology',
      salary: '$70,000 - $125,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create mobile applications for iOS and Android platforms.',
      skills: ['Swift/Kotlin', 'React Native', 'UI/UX', 'API Integration'],
      demand: 89,
      satisfaction: 87
    },
    {
      id: 12,
      title: 'Cloud Architect',
      category: 'technology',
      salary: '$120,000 - $180,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Design and implement cloud computing strategies and solutions.',
      skills: ['AWS/Azure', 'System Architecture', 'Security', 'Cost Optimization'],
      demand: 93,
      satisfaction: 90
    },
    {
      id: 13,
      title: 'AI/ML Engineer',
      category: 'technology',
      salary: '$100,000 - $160,000',
      growth: 'Very High',
      education: 'Master\'s Degree',
      description: 'Develop artificial intelligence and machine learning solutions.',
      skills: ['Python', 'TensorFlow', 'Deep Learning', 'Neural Networks'],
      demand: 97,
      satisfaction: 91
    },
    // Healthcare Careers
    {
      id: 14,
      title: 'Physical Therapist',
      category: 'healthcare',
      salary: '$80,000 - $110,000',
      growth: 'High',
      education: 'Doctoral Degree',
      description: 'Help patients recover mobility and manage pain through therapy.',
      skills: ['Anatomy', 'Rehabilitation', 'Patient Care', 'Exercise Therapy'],
      demand: 88,
      satisfaction: 93
    },
    {
      id: 15,
      title: 'Medical Technologist',
      category: 'healthcare',
      salary: '$55,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Perform laboratory tests to help diagnose and treat diseases.',
      skills: ['Laboratory Skills', 'Medical Equipment', 'Quality Control', 'Data Analysis'],
      demand: 85,
      satisfaction: 84
    },
    {
      id: 16,
      title: 'Pharmacist',
      category: 'healthcare',
      salary: '$110,000 - $150,000',
      growth: 'Moderate',
      education: 'Doctoral Degree',
      description: 'Dispense medications and provide pharmaceutical care to patients.',
      skills: ['Pharmacology', 'Patient Counseling', 'Drug Interactions', 'Healthcare Laws'],
      demand: 82,
      satisfaction: 87
    },
    {
      id: 17,
      title: 'Mental Health Counselor',
      category: 'healthcare',
      salary: '$50,000 - $85,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Provide therapy and support to individuals with mental health issues.',
      skills: ['Psychology', 'Active Listening', 'Empathy', 'Treatment Planning'],
      demand: 91,
      satisfaction: 95
    },
    // Business Careers
    {
      id: 18,
      title: 'Business Analyst',
      category: 'business',
      salary: '$65,000 - $105,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Analyze business processes and recommend improvements.',
      skills: ['Data Analysis', 'Process Mapping', 'Requirements Gathering', 'Communication'],
      demand: 86,
      satisfaction: 83
    },
    {
      id: 19,
      title: 'Financial Advisor',
      category: 'business',
      salary: '$60,000 - $120,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Help clients make informed financial and investment decisions.',
      skills: ['Financial Planning', 'Investment Knowledge', 'Client Relations', 'Risk Assessment'],
      demand: 79,
      satisfaction: 85
    },
    {
      id: 20,
      title: 'Human Resources Manager',
      category: 'business',
      salary: '$70,000 - $115,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Oversee employee relations, recruitment, and organizational policies.',
      skills: ['Leadership', 'Employment Law', 'Conflict Resolution', 'Strategic Planning'],
      demand: 77,
      satisfaction: 82
    },
    {
      id: 21,
      title: 'Sales Manager',
      category: 'business',
      salary: '$75,000 - $130,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Lead sales teams and develop strategies to meet revenue targets.',
      skills: ['Sales Strategy', 'Team Leadership', 'Customer Relations', 'Negotiation'],
      demand: 84,
      satisfaction: 81
    },
    // Creative Careers
    {
      id: 22,
      title: 'Graphic Designer',
      category: 'creative',
      salary: '$45,000 - $75,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Create visual concepts and designs for various media platforms.',
      skills: ['Adobe Creative Suite', 'Typography', 'Brand Design', 'Creative Thinking'],
      demand: 73,
      satisfaction: 88
    },
    {
      id: 23,
      title: 'Content Creator',
      category: 'creative',
      salary: '$40,000 - $80,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Produce engaging content for digital platforms and social media.',
      skills: ['Content Strategy', 'Video Editing', 'Social Media', 'Storytelling'],
      demand: 87,
      satisfaction: 92
    },
    {
      id: 24,
      title: 'Web Designer',
      category: 'creative',
      salary: '$50,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Design and create visually appealing and functional websites.',
      skills: ['HTML/CSS', 'Responsive Design', 'UI Design', 'User Experience'],
      demand: 85,
      satisfaction: 86
    },
    {
      id: 25,
      title: 'Video Editor',
      category: 'creative',
      salary: '$45,000 - $80,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Edit and produce video content for various media platforms.',
      skills: ['Video Editing Software', 'Motion Graphics', 'Color Correction', 'Storytelling'],
      demand: 83,
      satisfaction: 89
    },
    // Education Careers
    {
      id: 26,
      title: 'High School Teacher',
      category: 'education',
      salary: '$50,000 - $80,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree + Certification',
      description: 'Educate high school students in specific subject areas.',
      skills: ['Subject Expertise', 'Classroom Management', 'Curriculum Development', 'Assessment'],
      demand: 76,
      satisfaction: 87
    },
    {
      id: 27,
      title: 'Instructional Designer',
      category: 'education',
      salary: '$60,000 - $95,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Design and develop educational programs and training materials.',
      skills: ['Learning Theory', 'E-learning Tools', 'Curriculum Design', 'Assessment Design'],
      demand: 88,
      satisfaction: 86
    },
    {
      id: 28,
      title: 'Special Education Teacher',
      category: 'education',
      salary: '$55,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s/Master\'s Degree + Certification',
      description: 'Work with students who have learning, mental, emotional, or physical disabilities.',
      skills: ['Special Needs Education', 'Patience', 'Individualized Planning', 'Behavioral Management'],
      demand: 89,
      satisfaction: 94
    },
    {
      id: 29,
      title: 'Corporate Trainer',
      category: 'education',
      salary: '$55,000 - $90,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Develop and deliver training programs for employees in organizations.',
      skills: ['Training Development', 'Public Speaking', 'Adult Learning', 'Performance Analysis'],
      demand: 84,
      satisfaction: 85
    },
    // Engineering Careers
    {
      id: 30,
      title: 'Civil Engineer',
      category: 'engineering',
      salary: '$65,000 - $110,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and oversee construction of infrastructure projects.',
      skills: ['AutoCAD', 'Project Management', 'Structural Analysis', 'Building Codes'],
      demand: 80,
      satisfaction: 84
    },
    {
      id: 31,
      title: 'Electrical Engineer',
      category: 'engineering',
      salary: '$70,000 - $120,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and develop electrical systems and equipment.',
      skills: ['Circuit Design', 'Power Systems', 'Electronics', 'MATLAB'],
      demand: 81,
      satisfaction: 82
    },
    {
      id: 32,
      title: 'Software Engineer',
      category: 'engineering',
      salary: '$80,000 - $130,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Apply engineering principles to software development and systems.',
      skills: ['Software Architecture', 'System Design', 'Programming', 'Testing'],
      demand: 95,
      satisfaction: 89
    },
    {
      id: 33,
      title: 'Environmental Engineer',
      category: 'engineering',
      salary: '$65,000 - $105,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Develop solutions to environmental problems and sustainability.',
      skills: ['Environmental Science', 'Water Treatment', 'Pollution Control', 'Sustainability'],
      demand: 87,
      satisfaction: 91
    },
    // Additional Technology Careers
    {
      id: 34,
      title: 'Database Administrator',
      category: 'technology',
      salary: '$75,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Manage and maintain database systems for organizations.',
      skills: ['SQL', 'Database Design', 'Backup & Recovery', 'Performance Tuning'],
      demand: 83,
      satisfaction: 84
    },
    {
      id: 35,
      title: 'IT Support Specialist',
      category: 'technology',
      salary: '$45,000 - $75,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Provide technical support and troubleshooting for computer systems.',
      skills: ['Troubleshooting', 'Hardware', 'Operating Systems', 'Customer Service'],
      demand: 86,
      satisfaction: 79
    },
    // Additional Healthcare Careers
    {
      id: 36,
      title: 'Dental Hygienist',
      category: 'healthcare',
      salary: '$70,000 - $95,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Provide preventive dental care and educate patients on oral health.',
      skills: ['Dental Procedures', 'Patient Education', 'X-ray Technology', 'Infection Control'],
      demand: 88,
      satisfaction: 91
    },
    {
      id: 37,
      title: 'Occupational Therapist',
      category: 'healthcare',
      salary: '$75,000 - $105,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Help patients develop, recover, or maintain daily living skills.',
      skills: ['Therapeutic Techniques', 'Assessment', 'Treatment Planning', 'Patient Care'],
      demand: 89,
      satisfaction: 93
    },
    // Additional Business Careers
    {
      id: 38,
      title: 'Project Manager',
      category: 'business',
      salary: '$70,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Plan, execute, and oversee projects from initiation to completion.',
      skills: ['Project Planning', 'Risk Management', 'Team Leadership', 'Communication'],
      demand: 88,
      satisfaction: 85
    },
    {
      id: 39,
      title: 'Marketing Specialist',
      category: 'business',
      salary: '$50,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Develop and implement marketing campaigns to promote products or services.',
      skills: ['Market Research', 'Campaign Development', 'Brand Management', 'Analytics'],
      demand: 84,
      satisfaction: 83
    },
    // Additional Creative Careers
    {
      id: 40,
      title: 'Photographer',
      category: 'creative',
      salary: '$35,000 - $70,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Capture and edit photographs for various purposes and clients.',
      skills: ['Photography Techniques', 'Photo Editing', 'Lighting', 'Composition'],
      demand: 71,
      satisfaction: 92
    },
    {
      id: 41,
      title: 'Interior Designer',
      category: 'creative',
      salary: '$45,000 - $80,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Plan and design interior spaces for residential and commercial properties.',
      skills: ['Design Software', 'Space Planning', 'Color Theory', 'Client Relations'],
      demand: 74,
      satisfaction: 87
    },
    // Additional Education Careers
    {
      id: 42,
      title: 'School Counselor',
      category: 'education',
      salary: '$50,000 - $80,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Provide academic, career, and social-emotional support to students.',
      skills: ['Counseling', 'Student Development', 'Crisis Intervention', 'Program Planning'],
      demand: 87,
      satisfaction: 90
    },
    {
      id: 43,
      title: 'Librarian',
      category: 'education',
      salary: '$45,000 - $75,000',
      growth: 'Moderate',
      education: 'Master\'s Degree',
      description: 'Organize and provide access to information resources and services.',
      skills: ['Information Management', 'Research Skills', 'Technology', 'Customer Service'],
      demand: 72,
      satisfaction: 88
    },
    // Additional Engineering Careers
    {
      id: 44,
      title: 'Chemical Engineer',
      category: 'engineering',
      salary: '$75,000 - $125,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design processes for manufacturing chemicals, fuels, and materials.',
      skills: ['Process Design', 'Chemistry', 'Safety Protocols', 'Quality Control'],
      demand: 79,
      satisfaction: 85
    },
    {
      id: 45,
      title: 'Biomedical Engineer',
      category: 'engineering',
      salary: '$70,000 - $115,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Combine engineering principles with biological sciences for healthcare solutions.',
      skills: ['Medical Device Design', 'Biology', 'Problem Solving', 'Regulatory Knowledge'],
      demand: 85,
      satisfaction: 88
    },
    // More Technology Careers
    {
      id: 46,
      title: 'Full Stack Developer',
      category: 'technology',
      salary: '$70,000 - $125,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Develop both front-end and back-end components of web applications.',
      skills: ['JavaScript', 'React/Angular', 'Node.js', 'Database Design'],
      demand: 93,
      satisfaction: 89
    },
    {
      id: 47,
      title: 'Blockchain Developer',
      category: 'technology',
      salary: '$90,000 - $160,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Develop blockchain-based applications and smart contracts.',
      skills: ['Solidity', 'Cryptocurrency', 'Distributed Systems', 'Cryptography'],
      demand: 91,
      satisfaction: 87
    },
    {
      id: 48,
      title: 'Game Developer',
      category: 'technology',
      salary: '$65,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Design and develop video games for various platforms.',
      skills: ['Unity/Unreal Engine', 'C#/C++', 'Game Design', '3D Modeling'],
      demand: 84,
      satisfaction: 92
    },
    {
      id: 49,
      title: 'QA Engineer',
      category: 'technology',
      salary: '$60,000 - $100,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Test software applications to ensure quality and functionality.',
      skills: ['Test Automation', 'Bug Tracking', 'Quality Assurance', 'Testing Frameworks'],
      demand: 87,
      satisfaction: 82
    },
    {
      id: 50,
      title: 'Network Administrator',
      category: 'technology',
      salary: '$55,000 - $90,000',
      growth: 'High',
      education: 'Associate/Bachelor\'s Degree',
      description: 'Maintain and configure computer networks for organizations.',
      skills: ['Network Configuration', 'Cisco/Juniper', 'Network Security', 'Troubleshooting'],
      demand: 85,
      satisfaction: 81
    },
    // More Healthcare Careers
    {
      id: 51,
      title: 'Radiologic Technologist',
      category: 'healthcare',
      salary: '$55,000 - $80,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Perform diagnostic imaging examinations on patients.',
      skills: ['Medical Imaging', 'Patient Care', 'Radiation Safety', 'Equipment Operation'],
      demand: 86,
      satisfaction: 85
    },
    {
      id: 52,
      title: 'Respiratory Therapist',
      category: 'healthcare',
      salary: '$60,000 - $85,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Care for patients with breathing disorders and cardiopulmonary conditions.',
      skills: ['Respiratory Care', 'Ventilator Management', 'Patient Assessment', 'Emergency Care'],
      demand: 88,
      satisfaction: 89
    },
    {
      id: 53,
      title: 'Medical Assistant',
      category: 'healthcare',
      salary: '$35,000 - $50,000',
      growth: 'Very High',
      education: 'Certificate/Associate Degree',
      description: 'Perform administrative and clinical tasks in healthcare settings.',
      skills: ['Clinical Procedures', 'Medical Records', 'Patient Communication', 'Medical Terminology'],
      demand: 94,
      satisfaction: 86
    },
    {
      id: 54,
      title: 'Health Information Technician',
      category: 'healthcare',
      salary: '$40,000 - $65,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Organize and manage health information data and medical records.',
      skills: ['Medical Coding', 'Health Records', 'HIPAA Compliance', 'Database Management'],
      demand: 87,
      satisfaction: 83
    },
    {
      id: 55,
      title: 'Veterinarian',
      category: 'healthcare',
      salary: '$80,000 - $140,000',
      growth: 'High',
      education: 'Doctoral Degree',
      description: 'Diagnose and treat diseases and injuries in animals.',
      skills: ['Animal Medicine', 'Surgery', 'Diagnostic Skills', 'Animal Behavior'],
      demand: 85,
      satisfaction: 91
    },
    // More Business Careers
    {
      id: 56,
      title: 'Operations Manager',
      category: 'business',
      salary: '$70,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Oversee daily operations and improve organizational efficiency.',
      skills: ['Operations Management', 'Process Improvement', 'Team Leadership', 'Strategic Planning'],
      demand: 86,
      satisfaction: 84
    },
    {
      id: 57,
      title: 'Account Manager',
      category: 'business',
      salary: '$55,000 - $95,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Manage relationships with key clients and grow business accounts.',
      skills: ['Client Relations', 'Sales', 'Account Growth', 'Communication'],
      demand: 83,
      satisfaction: 82
    },
    {
      id: 58,
      title: 'Supply Chain Manager',
      category: 'business',
      salary: '$75,000 - $125,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Manage the flow of goods and services from suppliers to customers.',
      skills: ['Logistics', 'Inventory Management', 'Vendor Relations', 'Cost Analysis'],
      demand: 88,
      satisfaction: 85
    },
    {
      id: 59,
      title: 'Investment Banker',
      category: 'business',
      salary: '$100,000 - $200,000',
      growth: 'Moderate',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Help companies and governments raise capital through securities.',
      skills: ['Financial Analysis', 'Valuation', 'Deal Structuring', 'Client Relations'],
      demand: 76,
      satisfaction: 79
    },
    {
      id: 60,
      title: 'Management Consultant',
      category: 'business',
      salary: '$80,000 - $150,000',
      growth: 'High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Advise organizations on business strategy and operational improvements.',
      skills: ['Strategic Thinking', 'Problem Solving', 'Presentation Skills', 'Data Analysis'],
      demand: 84,
      satisfaction: 86
    },
    // More Creative Careers
    {
      id: 61,
      title: 'Animation Artist',
      category: 'creative',
      salary: '$50,000 - $90,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create animated content for films, TV shows, games, and digital media.',
      skills: ['2D/3D Animation', 'Character Design', 'Storyboarding', 'Animation Software'],
      demand: 82,
      satisfaction: 90
    },
    {
      id: 62,
      title: 'Fashion Designer',
      category: 'creative',
      salary: '$45,000 - $85,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design clothing, accessories, and footwear for consumers.',
      skills: ['Fashion Design', 'Trend Analysis', 'Sketching', 'Fabric Knowledge'],
      demand: 72,
      satisfaction: 88
    },
    {
      id: 63,
      title: 'Music Producer',
      category: 'creative',
      salary: '$40,000 - $100,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Oversee and manage the recording and production of music.',
      skills: ['Audio Engineering', 'Music Theory', 'Recording Software', 'Creative Direction'],
      demand: 79,
      satisfaction: 93
    },
    {
      id: 64,
      title: 'Copywriter',
      category: 'creative',
      salary: '$45,000 - $80,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Write persuasive content for advertising and marketing campaigns.',
      skills: ['Creative Writing', 'Marketing Strategy', 'Brand Voice', 'Research'],
      demand: 85,
      satisfaction: 87
    },
    {
      id: 65,
      title: 'Art Director',
      category: 'creative',
      salary: '$65,000 - $110,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Oversee visual aspects of creative projects and campaigns.',
      skills: ['Creative Leadership', 'Visual Design', 'Brand Strategy', 'Team Management'],
      demand: 78,
      satisfaction: 89
    },
    // More Education Careers
    {
      id: 66,
      title: 'College Professor',
      category: 'education',
      salary: '$60,000 - $120,000',
      growth: 'High',
      education: 'Doctoral Degree',
      description: 'Teach and conduct research at colleges and universities.',
      skills: ['Subject Expertise', 'Research', 'Public Speaking', 'Academic Writing'],
      demand: 81,
      satisfaction: 88
    },
    {
      id: 67,
      title: 'Educational Administrator',
      category: 'education',
      salary: '$70,000 - $110,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Manage operations and policies in educational institutions.',
      skills: ['Leadership', 'Educational Policy', 'Budget Management', 'Staff Development'],
      demand: 83,
      satisfaction: 85
    },
    {
      id: 68,
      title: 'Curriculum Developer',
      category: 'education',
      salary: '$55,000 - $90,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Design and develop educational curricula and learning materials.',
      skills: ['Curriculum Design', 'Educational Technology', 'Assessment', 'Learning Theory'],
      demand: 86,
      satisfaction: 87
    },
    {
      id: 69,
      title: 'Online Learning Specialist',
      category: 'education',
      salary: '$50,000 - $85,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Develop and manage online educational programs and platforms.',
      skills: ['E-learning Platforms', 'Online Pedagogy', 'Technology Integration', 'Content Development'],
      demand: 92,
      satisfaction: 86
    },
    // More Engineering Careers
    {
      id: 70,
      title: 'Aerospace Engineer',
      category: 'engineering',
      salary: '$85,000 - $140,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and develop aircraft, spacecraft, and related systems.',
      skills: ['Aerodynamics', 'CAD Software', 'Systems Engineering', 'Materials Science'],
      demand: 79,
      satisfaction: 87
    },
    {
      id: 71,
      title: 'Industrial Engineer',
      category: 'engineering',
      salary: '$70,000 - $115,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Optimize processes and systems to improve efficiency and reduce waste.',
      skills: ['Process Optimization', 'Lean Manufacturing', 'Quality Control', 'Data Analysis'],
      demand: 84,
      satisfaction: 83
    },
    {
      id: 72,
      title: 'Petroleum Engineer',
      category: 'engineering',
      salary: '$90,000 - $160,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and develop methods for extracting oil and gas.',
      skills: ['Reservoir Engineering', 'Drilling Technology', 'Production Methods', 'Geology'],
      demand: 73,
      satisfaction: 81
    },
    {
      id: 73,
      title: 'Robotics Engineer',
      category: 'engineering',
      salary: '$75,000 - $130,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Design, build, and maintain robots and robotic systems.',
      skills: ['Robotics Programming', 'Mechanical Design', 'Control Systems', 'AI/ML'],
      demand: 89,
      satisfaction: 90
    },
    {
      id: 74,
      title: 'Materials Engineer',
      category: 'engineering',
      salary: '$70,000 - $120,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Develop and test materials for various applications and industries.',
      skills: ['Materials Science', 'Testing Methods', 'Quality Control', 'Research'],
      demand: 78,
      satisfaction: 84
    },
    // Additional Popular Careers
    {
      id: 75,
      title: 'Social Media Manager',
      category: 'business',
      salary: '$45,000 - $75,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Manage and grow social media presence for brands and organizations.',
      skills: ['Social Media Strategy', 'Content Creation', 'Analytics', 'Community Management'],
      demand: 93,
      satisfaction: 88
    },
    {
      id: 76,
      title: 'Data Analyst',
      category: 'technology',
      salary: '$55,000 - $95,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Analyze data to help organizations make informed business decisions.',
      skills: ['SQL', 'Excel', 'Data Visualization', 'Statistical Analysis'],
      demand: 94,
      satisfaction: 86
    },
    {
      id: 77,
      title: 'Dental Assistant',
      category: 'healthcare',
      salary: '$35,000 - $50,000',
      growth: 'High',
      education: 'Certificate Program',
      description: 'Assist dentists in providing patient care and managing dental offices.',
      skills: ['Dental Procedures', 'Patient Care', 'X-ray Technology', 'Sterilization'],
      demand: 89,
      satisfaction: 87
    },
    {
      id: 78,
      title: 'Preschool Teacher',
      category: 'education',
      salary: '$35,000 - $55,000',
      growth: 'High',
      education: 'Associate/Bachelor\'s Degree',
      description: 'Teach and care for children before they enter kindergarten.',
      skills: ['Child Development', 'Early Childhood Education', 'Patience', 'Creativity'],
      demand: 87,
      satisfaction: 91
    },
    {
      id: 79,
      title: 'Event Planner',
      category: 'creative',
      salary: '$40,000 - $75,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Plan and coordinate events, meetings, and celebrations.',
      skills: ['Event Planning', 'Vendor Management', 'Budget Planning', 'Time Management'],
      demand: 84,
      satisfaction: 89
    },
    {
      id: 80,
      title: 'Construction Manager',
      category: 'engineering',
      salary: '$75,000 - $125,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Oversee construction projects from planning to completion.',
      skills: ['Project Management', 'Construction Knowledge', 'Safety Protocols', 'Team Leadership'],
      demand: 86,
      satisfaction: 84
    },
    // More Technology Careers
    {
      id: 81,
      title: 'Systems Analyst',
      category: 'technology',
      salary: '$65,000 - $105,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Analyze computer systems and recommend improvements for efficiency.',
      skills: ['Systems Analysis', 'Problem Solving', 'Documentation', 'Process Improvement'],
      demand: 87,
      satisfaction: 84
    },
    {
      id: 82,
      title: 'Software Architect',
      category: 'technology',
      salary: '$110,000 - $180,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Design high-level software structure and technical standards.',
      skills: ['System Design', 'Architecture Patterns', 'Technical Leadership', 'Scalability'],
      demand: 91,
      satisfaction: 92
    },
    {
      id: 83,
      title: 'Information Security Analyst',
      category: 'technology',
      salary: '$80,000 - $135,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Plan and implement security measures to protect computer networks.',
      skills: ['Security Protocols', 'Risk Analysis', 'Incident Response', 'Compliance'],
      demand: 95,
      satisfaction: 88
    },
    {
      id: 84,
      title: 'Computer Systems Administrator',
      category: 'technology',
      salary: '$60,000 - $95,000',
      growth: 'High',
      education: 'Bachelor\'s/Associate Degree',
      description: 'Install, configure, and maintain computer systems and servers.',
      skills: ['Server Administration', 'System Maintenance', 'Backup Solutions', 'User Support'],
      demand: 84,
      satisfaction: 81
    },
    {
      id: 85,
      title: 'Technical Writer',
      category: 'technology',
      salary: '$55,000 - $90,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create technical documentation and user manuals for software and systems.',
      skills: ['Technical Writing', 'Documentation Tools', 'Research', 'Communication'],
      demand: 86,
      satisfaction: 85
    },
    // More Healthcare Careers
    {
      id: 86,
      title: 'Physician Assistant',
      category: 'healthcare',
      salary: '$95,000 - $130,000',
      growth: 'Very High',
      education: 'Master\'s Degree',
      description: 'Practice medicine under the supervision of physicians and surgeons.',
      skills: ['Clinical Skills', 'Patient Diagnosis', 'Treatment Planning', 'Medical Procedures'],
      demand: 96,
      satisfaction: 94
    },
    {
      id: 87,
      title: 'Speech-Language Pathologist',
      category: 'healthcare',
      salary: '$70,000 - $100,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Assess and treat speech, language, and swallowing disorders.',
      skills: ['Speech Therapy', 'Assessment', 'Treatment Planning', 'Patient Communication'],
      demand: 88,
      satisfaction: 92
    },
    {
      id: 88,
      title: 'Clinical Laboratory Technician',
      category: 'healthcare',
      salary: '$45,000 - $65,000',
      growth: 'High',
      education: 'Associate Degree',
      description: 'Perform routine laboratory tests and procedures.',
      skills: ['Laboratory Techniques', 'Quality Control', 'Data Recording', 'Equipment Maintenance'],
      demand: 85,
      satisfaction: 83
    },
    {
      id: 89,
      title: 'Dietitian',
      category: 'healthcare',
      salary: '$55,000 - $80,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Plan nutrition programs and supervise meal preparation.',
      skills: ['Nutrition Science', 'Meal Planning', 'Patient Counseling', 'Health Education'],
      demand: 87,
      satisfaction: 89
    },
    {
      id: 90,
      title: 'Emergency Medical Technician',
      category: 'healthcare',
      salary: '$35,000 - $55,000',
      growth: 'High',
      education: 'Certificate Program',
      description: 'Provide emergency medical care and transportation to patients.',
      skills: ['Emergency Care', 'CPR/First Aid', 'Patient Transport', 'Medical Equipment'],
      demand: 89,
      satisfaction: 88
    },
    // More Business Careers
    {
      id: 91,
      title: 'Business Development Manager',
      category: 'business',
      salary: '$70,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Identify growth opportunities and develop strategic partnerships.',
      skills: ['Strategic Planning', 'Relationship Building', 'Market Analysis', 'Negotiation'],
      demand: 85,
      satisfaction: 86
    },
    {
      id: 92,
      title: 'Customer Success Manager',
      category: 'business',
      salary: '$60,000 - $100,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Ensure customer satisfaction and drive product adoption.',
      skills: ['Customer Relations', 'Problem Solving', 'Data Analysis', 'Communication'],
      demand: 92,
      satisfaction: 87
    },
    {
      id: 93,
      title: 'Real Estate Agent',
      category: 'business',
      salary: '$40,000 - $100,000',
      growth: 'High',
      education: 'High School + License',
      description: 'Help clients buy, sell, and rent properties.',
      skills: ['Sales', 'Market Knowledge', 'Negotiation', 'Customer Service'],
      demand: 83,
      satisfaction: 82
    },
    {
      id: 94,
      title: 'Insurance Agent',
      category: 'business',
      salary: '$45,000 - $85,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree + License',
      description: 'Sell insurance policies and provide coverage advice to clients.',
      skills: ['Sales', 'Risk Assessment', 'Product Knowledge', 'Customer Service'],
      demand: 78,
      satisfaction: 80
    },
    {
      id: 95,
      title: 'Logistics Coordinator',
      category: 'business',
      salary: '$45,000 - $70,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Coordinate and monitor supply chain operations.',
      skills: ['Supply Chain Management', 'Coordination', 'Problem Solving', 'Communication'],
      demand: 86,
      satisfaction: 82
    },
    // More Creative Careers
    {
      id: 96,
      title: 'Brand Designer',
      category: 'creative',
      salary: '$55,000 - $95,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create visual identities and brand experiences for companies.',
      skills: ['Brand Strategy', 'Visual Design', 'Typography', 'Creative Thinking'],
      demand: 84,
      satisfaction: 90
    },
    {
      id: 97,
      title: 'Social Media Content Creator',
      category: 'creative',
      salary: '$35,000 - $70,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Create engaging content for social media platforms.',
      skills: ['Content Creation', 'Video Production', 'Social Media Strategy', 'Trend Analysis'],
      demand: 94,
      satisfaction: 91
    },
    {
      id: 98,
      title: 'Film Editor',
      category: 'creative',
      salary: '$50,000 - $90,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Edit and assemble recorded material into finished films.',
      skills: ['Video Editing Software', 'Storytelling', 'Color Correction', 'Sound Design'],
      demand: 81,
      satisfaction: 89
    },
    {
      id: 99,
      title: 'Landscape Architect',
      category: 'creative',
      salary: '$60,000 - $100,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design outdoor spaces including parks, gardens, and recreational areas.',
      skills: ['Landscape Design', 'CAD Software', 'Environmental Planning', 'Project Management'],
      demand: 76,
      satisfaction: 88
    },
    {
      id: 100,
      title: 'Voice Actor',
      category: 'creative',
      salary: '$30,000 - $80,000',
      growth: 'High',
      education: 'No formal requirement',
      description: 'Provide voice-over work for commercials, animations, and media.',
      skills: ['Voice Control', 'Acting', 'Audio Recording', 'Character Development'],
      demand: 82,
      satisfaction: 93
    },
    // More Education Careers
    {
      id: 101,
      title: 'Education Technology Specialist',
      category: 'education',
      salary: '$55,000 - $85,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Integrate technology into educational environments and curricula.',
      skills: ['Educational Technology', 'Training', 'Technical Support', 'Curriculum Integration'],
      demand: 93,
      satisfaction: 87
    },
    {
      id: 102,
      title: 'Academic Advisor',
      category: 'education',
      salary: '$40,000 - $65,000',
      growth: 'High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Help students plan their academic careers and course selections.',
      skills: ['Academic Planning', 'Student Counseling', 'Program Knowledge', 'Communication'],
      demand: 85,
      satisfaction: 86
    },
    {
      id: 103,
      title: 'Reading Specialist',
      category: 'education',
      salary: '$50,000 - $75,000',
      growth: 'High',
      education: 'Master\'s Degree',
      description: 'Help students improve their reading skills and comprehension.',
      skills: ['Reading Instruction', 'Assessment', 'Intervention Strategies', 'Literacy Development'],
      demand: 87,
      satisfaction: 90
    },
    {
      id: 104,
      title: 'Adult Education Instructor',
      category: 'education',
      salary: '$45,000 - $70,000',
      growth: 'High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Teach basic education skills to adult learners.',
      skills: ['Adult Learning Principles', 'Teaching', 'Patience', 'Flexibility'],
      demand: 86,
      satisfaction: 88
    },
    // More Engineering Careers
    {
      id: 105,
      title: 'Quality Engineer',
      category: 'engineering',
      salary: '$65,000 - $105,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Ensure products and processes meet quality standards.',
      skills: ['Quality Control', 'Statistical Analysis', 'Process Improvement', 'Testing'],
      demand: 84,
      satisfaction: 83
    },
    {
      id: 106,
      title: 'Mining Engineer',
      category: 'engineering',
      salary: '$75,000 - $125,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and oversee mining operations for extracting minerals.',
      skills: ['Mining Operations', 'Safety Protocols', 'Geology', 'Equipment Design'],
      demand: 74,
      satisfaction: 82
    },
    {
      id: 107,
      title: 'Nuclear Engineer',
      category: 'engineering',
      salary: '$85,000 - $140,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Research and develop processes for nuclear energy and radiation.',
      skills: ['Nuclear Physics', 'Radiation Safety', 'Reactor Design', 'Risk Analysis'],
      demand: 76,
      satisfaction: 86
    },
    {
      id: 108,
      title: 'Marine Engineer',
      category: 'engineering',
      salary: '$70,000 - $115,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Design and maintain ships, boats, and marine equipment.',
      skills: ['Naval Architecture', 'Marine Systems', 'Mechanical Design', 'Marine Safety'],
      demand: 77,
      satisfaction: 85
    },
    // Additional High-Demand Careers
    {
      id: 109,
      title: 'Fitness Trainer',
      category: 'healthcare',
      salary: '$35,000 - $65,000',
      growth: 'High',
      education: 'Certificate/Associate Degree',
      description: 'Help clients achieve fitness goals through exercise and wellness programs.',
      skills: ['Exercise Science', 'Motivation', 'Program Design', 'Health Assessment'],
      demand: 88,
      satisfaction: 91
    },
    {
      id: 110,
      title: 'Translator',
      category: 'creative',
      salary: '$40,000 - $75,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Convert written or spoken content from one language to another.',
      skills: ['Multilingual', 'Cultural Knowledge', 'Writing', 'Research'],
      demand: 85,
      satisfaction: 87
    },
    {
      id: 111,
      title: 'Paralegal',
      category: 'business',
      salary: '$45,000 - $70,000',
      growth: 'High',
      education: 'Associate Degree/Certificate',
      description: 'Assist lawyers with legal research, documentation, and case preparation.',
      skills: ['Legal Research', 'Documentation', 'Case Management', 'Legal Writing'],
      demand: 87,
      satisfaction: 84
    },
    {
      id: 112,
      title: 'Environmental Scientist',
      category: 'engineering',
      salary: '$60,000 - $95,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Study environmental problems and develop solutions to protect the environment.',
      skills: ['Environmental Science', 'Data Analysis', 'Field Research', 'Report Writing'],
      demand: 86,
      satisfaction: 89
    },
    {
      id: 113,
      title: 'Massage Therapist',
      category: 'healthcare',
      salary: '$35,000 - $60,000',
      growth: 'High',
      education: 'Certificate Program',
      description: 'Provide therapeutic massage treatments to promote health and wellness.',
      skills: ['Massage Techniques', 'Anatomy', 'Customer Service', 'Physical Stamina'],
      demand: 85,
      satisfaction: 92
    },
    {
      id: 114,
      title: 'Computer Programmer',
      category: 'technology',
      salary: '$60,000 - $100,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Write and test code for software applications and systems.',
      skills: ['Programming Languages', 'Code Testing', 'Debugging', 'Software Development'],
      demand: 88,
      satisfaction: 86
    },
    {
      id: 115,
      title: 'Chef',
      category: 'creative',
      salary: '$40,000 - $85,000',
      growth: 'High',
      education: 'Culinary School/Experience',
      description: 'Plan menus, prepare food, and manage kitchen operations.',
      skills: ['Culinary Skills', 'Menu Planning', 'Kitchen Management', 'Creativity'],
      demand: 83,
      satisfaction: 88
    }
  ]

  useEffect(() => {
    let filtered = careersData

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(career => career.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(career => 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredCareers(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchTerm])

  // Calculate pagination
  const indexOfLastCareer = currentPage * careersPerPage
  const indexOfFirstCareer = indexOfLastCareer - careersPerPage
  const currentCareers = filteredCareers.slice(indexOfFirstCareer, indexOfLastCareer)
  const totalPages = Math.ceil(filteredCareers.length / careersPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top when page changes
  }

  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'Very High': return '#4caf50'
      case 'High': return '#8bc34a'
      case 'Moderate': return '#ff9800'
      default: return '#757575'
    }
  }

  return (
    <div className="careers-page">
      <div className="careers-header">
        <div className="container">
          <h1>Explore Career Opportunities</h1>
          <p>Discover hundreds of career paths with detailed insights, salary information, and growth prospects</p>
        </div>
      </div>

      <div className="careers-filters">
        <div className="container">
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search careers, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="category-filters">
            {careerCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="careers-content">
        <div className="container">
          <div className="results-header">
            <h2>
              {filteredCareers.length} Career{filteredCareers.length !== 1 ? 's' : ''} Found
              {selectedCategory !== 'all' && ` in ${careerCategories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            {filteredCareers.length > careersPerPage && (
              <p className="pagination-info">
                Showing {indexOfFirstCareer + 1}-{Math.min(indexOfLastCareer, filteredCareers.length)} of {filteredCareers.length} careers
              </p>
            )}
          </div>

          <div className="careers-grid">
            {currentCareers.map(career => (
              <div key={career.id} className="career-card">
                <div className="career-header">
                  <h3>{career.title}</h3>
                  <div className="career-category">
                    {careerCategories.find(c => c.id === career.category)?.icon}
                    {careerCategories.find(c => c.id === career.category)?.name}
                  </div>
                </div>

                <p className="career-description">{career.description}</p>

                <div className="career-metrics">
                  <div className="metric">
                    <span className="metric-label">Salary Range</span>
                    <span className="metric-value">{career.salary}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Growth</span>
                    <span 
                      className="metric-value growth"
                      style={{ color: getGrowthColor(career.growth) }}
                    >
                      {career.growth}
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Education</span>
                    <span className="metric-value">{career.education}</span>
                  </div>
                </div>

                <div className="career-indicators">
                  <div className="indicator">
                    <span className="indicator-label">Demand</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill demand"
                        style={{ width: `${career.demand}%` }}
                      ></div>
                    </div>
                    <span className="indicator-value">{career.demand}%</span>
                  </div>
                  <div className="indicator">
                    <span className="indicator-label">Satisfaction</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill satisfaction"
                        style={{ width: `${career.satisfaction}%` }}
                      ></div>
                    </div>
                    <span className="indicator-value">{career.satisfaction}%</span>
                  </div>
                </div>

                <div className="career-skills">
                  <span className="skills-label">Key Skills:</span>
                  <div className="skills-list">
                    {career.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <button className="learn-more-btn">
                  Learn More
                  <span className="arrow">→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {filteredCareers.length > careersPerPage && (
            <div className="pagination">
              <button 
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

          {filteredCareers.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No careers found</h3>
              <p>Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Careers