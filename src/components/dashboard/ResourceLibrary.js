import React, { useState } from 'react';

// Resource categories and their items
const resources = {
  technical: [
    {
      id: 1,
      title: "LeetCode",
      description: "Practice coding problems and prepare for technical interviews",
      url: "https://leetcode.com",
      type: "Practice Platform",
      difficulty: "All Levels"
    },
    {
      id: 2,
      title: "HackerRank",
      description: "Coding challenges and skill certification",
      url: "https://www.hackerrank.com",
      type: "Practice Platform",
      difficulty: "All Levels"
    },
    {
      id: 3,
      title: "React Official Docs",
      description: "Official React documentation and tutorials",
      url: "https://react.dev",
      type: "Documentation",
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "MDN Web Docs",
      description: "Comprehensive web development documentation",
      url: "https://developer.mozilla.org",
      type: "Documentation",
      difficulty: "All Levels"
    },
    {
      id: 5,
      title: "freeCodeCamp",
      description: "Free coding tutorials and certifications",
      url: "https://www.freecodecamp.org",
      type: "Learning Platform",
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "GitHub Student Pack",
      description: "Free developer tools and resources for students",
      url: "https://education.github.com/pack",
      type: "Resource Collection",
      difficulty: "All Levels"
    },
    {
      id: 7,
      title: "AWS Training",
      description: "Official Amazon Web Services training and certification",
      url: "https://aws.amazon.com/training",
      type: "Certification",
      difficulty: "All Levels"
    },
    {
      id: 8,
      title: "Google Cloud Skills",
      description: "Official Google Cloud training and certification",
      url: "https://cloud.google.com/training",
      type: "Certification",
      difficulty: "All Levels"
    },
    {
      id: 9,
      title: "Microsoft Learn",
      description: "Official Microsoft technology learning platform",
      url: "https://learn.microsoft.com",
      type: "Learning Platform",
      difficulty: "All Levels"
    },
    {
      id: 10,
      title: "CS50x",
      description: "Harvard's introduction to computer science",
      url: "https://cs50.harvard.edu/x",
      type: "Course",
      difficulty: "Beginner"
    }
  ],
  softSkills: [
    {
      id: 1,
      title: "Google Project Management",
      description: "Professional Certificate in Project Management",
      url: "https://www.coursera.org/professional-certificates/google-project-management",
      type: "Certificate Program",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "LinkedIn Learning",
      description: "Professional development and business courses",
      url: "https://www.linkedin.com/learning",
      type: "Course Platform",
      difficulty: "All Levels"
    },
    {
      id: 3,
      title: "Coursera Soft Skills",
      description: "Soft skills specialization by top universities",
      url: "https://www.coursera.org/specializations/soft-skills",
      type: "Specialization",
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "Harvard ManageMentor",
      description: "Leadership and management skills development",
      url: "https://www.harvardbusiness.org/harvard-managementor",
      type: "Learning Platform",
      difficulty: "Advanced"
    },
    {
      id: 5,
      title: "Toastmasters",
      description: "Public speaking and leadership development",
      url: "https://www.toastmasters.org",
      type: "Organization",
      difficulty: "All Levels"
    },
    {
      id: 6,
      title: "PMI Membership",
      description: "Project Management Institute resources",
      url: "https://www.pmi.org",
      type: "Professional Organization",
      difficulty: "All Levels"
    },
    {
      id: 7,
      title: "Agile Certification",
      description: "Official Scrum.org certifications",
      url: "https://www.scrum.org/professional-scrum-certifications",
      type: "Certification",
      difficulty: "Intermediate"
    }
  ],
  interview: [
    {
      id: 1,
      title: "Glassdoor Interviews",
      description: "Company-specific interview questions and reviews",
      url: "https://www.glassdoor.com/Interview",
      type: "Interview Database",
      difficulty: "All Levels"
    },
    {
      id: 2,
      title: "Pramp",
      description: "Free peer-to-peer mock interviews",
      url: "https://www.pramp.com",
      type: "Practice Platform",
      difficulty: "All Levels"
    },
    {
      id: 3,
      title: "Grokking System Design",
      description: "In-depth system design interview preparation",
      url: "https://www.educative.io/courses/grokking-the-system-design-interview",
      type: "Course",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "AlgoExpert",
      description: "Technical interview preparation platform",
      url: "https://www.algoexpert.io",
      type: "Practice Platform",
      difficulty: "All Levels"
    },
    {
      id: 5,
      title: "Big-O Cheat Sheet",
      description: "Time complexity guide for algorithms",
      url: "https://www.bigocheatsheet.com",
      type: "Reference",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "InterviewBit",
      description: "Programming interview questions and courses",
      url: "https://www.interviewbit.com",
      type: "Practice Platform",
      difficulty: "All Levels"
    },
    {
      id: 7,
      title: "Tech Interview Handbook",
      description: "Curated interview preparation materials",
      url: "https://www.techinterviewhandbook.org",
      type: "Guide",
      difficulty: "All Levels"
    },
    {
      id: 8,
      title: "Levels.fyi",
      description: "Salary data and career leveling",
      url: "https://www.levels.fyi",
      type: "Career Data",
      difficulty: "All Levels"
    }
  ]
};

export default function ResourceLibrary() {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredResources = resources[activeCategory].filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">Resource Library</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
        <button
          onClick={() => setActiveCategory('technical')}
          className={"px-4 py-2 rounded w-full sm:w-auto " + (activeCategory === 'technical' ? 'bg-blue-600 text-white' : 'bg-gray-200')}
        >
          Technical Skills
        </button>
        <button
          onClick={() => setActiveCategory('softSkills')}
          className={"px-4 py-2 rounded w-full sm:w-auto " + (activeCategory === 'softSkills' ? 'bg-blue-600 text-white' : 'bg-gray-200')}
        >
          Soft Skills
        </button>
        <button
          onClick={() => setActiveCategory('interview')}
          className={"px-4 py-2 rounded w-full sm:w-auto " + (activeCategory === 'interview' ? 'bg-blue-600 text-white' : 'bg-gray-200')}
        >
          Interview Prep
        </button>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="border rounded-lg p-4 hover:border-blue-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <span className={"px-2 py-1 text-xs rounded whitespace-nowrap " + 
                (resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                 resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                 resource.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                 'bg-gray-100 text-gray-800')}>
                {resource.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <span className="text-sm text-gray-500">{resource.type}</span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Visit Resource
              </a>
            </div>
          </div>
        ))}
        {filteredResources.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No resources found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
