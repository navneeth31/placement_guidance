/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/firebase';
import { motion } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

export default function ResumeBuilder() {
  const { currentUser } = useAuth();
  const [resume, setResume] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadResume = useCallback(async () => {
    try {
      const resumeData = await userService.getResume(currentUser.uid);
      setResume(resumeData || {
        personalInfo: {},
        education: [],
        experience: [],
        projects: [],
        skills: []
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading resume:', error);
      setLoading(false);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await userService.saveResume(currentUser.uid, resume);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
    setSaving(false);
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }));
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }));
  };

  const addSkill = () => {
    setResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), '']
    }));
  };

  const handleSkillChange = (index, value) => {
    setResume(prev => ({
      ...prev,
      skills: [...(prev.skills || [])].map((skill, i) => 
        i === index ? value : skill
      )
    }));
  };

  const removeSkill = (index) => {
    setResume(prev => ({
      ...prev,
      skills: [...(prev.skills || [])].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Download PDF Button */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Download Resume</h2>
            <p className="text-slate-600">Generate a professional PDF version of your resume</p>
          </div>
          <PDFDownloadLink
            document={<ResumePDF resume={resume} />}
            fileName={`${resume.personalInfo.name?.split(' ')[0] || 'Resume'}_${new Date().toISOString().split('T')[0]}.pdf`}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {({ blob, url, loading, error }) => {
              if (error) {
                return 'Error generating PDF';
              }
              return loading ? 'Generating PDF...' : 'Download PDF';
            }}
          </PDFDownloadLink>
        </div>
      </motion.section>

      {/* Personal Information */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={resume.personalInfo.name}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, name: e.target.value }
            }))}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={resume.personalInfo.email}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value }
            }))}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={resume.personalInfo.phone}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
          />
          <input
            type="text"
            placeholder="Location"
            className="input-field"
            value={resume.personalInfo.location}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, location: e.target.value }
            }))}
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            className="input-field"
            value={resume.personalInfo.linkedin}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
            }))}
          />
          <input
            type="url"
            placeholder="GitHub URL"
            className="input-field"
            value={resume.personalInfo.github}
            onChange={e => setResume(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, github: e.target.value }
            }))}
          />
        </div>
      </motion.section>

      {/* Education */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Education</h2>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Add Education
          </button>
        </div>
        {resume.education.map((edu, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="School/University"
                className="input-field"
                value={edu.school}
                onChange={e => {
                  const newEducation = [...resume.education];
                  newEducation[index] = { ...edu, school: e.target.value };
                  setResume(prev => ({ ...prev, education: newEducation }));
                }}
              />
              <input
                type="text"
                placeholder="Degree"
                className="input-field"
                value={edu.degree}
                onChange={e => {
                  const newEducation = [...resume.education];
                  newEducation[index] = { ...edu, degree: e.target.value };
                  setResume(prev => ({ ...prev, education: newEducation }));
                }}
              />
              <input
                type="text"
                placeholder="Field of Study"
                className="input-field"
                value={edu.field}
                onChange={e => {
                  const newEducation = [...resume.education];
                  newEducation[index] = { ...edu, field: e.target.value };
                  setResume(prev => ({ ...prev, education: newEducation }));
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="month"
                  placeholder="Start Date"
                  className="input-field"
                  value={edu.startDate}
                  onChange={e => {
                    const newEducation = [...resume.education];
                    newEducation[index] = { ...edu, startDate: e.target.value };
                    setResume(prev => ({ ...prev, education: newEducation }));
                  }}
                />
                <input
                  type="month"
                  placeholder="End Date"
                  className="input-field"
                  value={edu.endDate}
                  onChange={e => {
                    const newEducation = [...resume.education];
                    newEducation[index] = { ...edu, endDate: e.target.value };
                    setResume(prev => ({ ...prev, education: newEducation }));
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Experience */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Experience</h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Add Experience
          </button>
        </div>
        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                className="input-field"
                value={exp.company}
                onChange={e => {
                  const newExperience = [...resume.experience];
                  newExperience[index] = { ...exp, company: e.target.value };
                  setResume(prev => ({ ...prev, experience: newExperience }));
                }}
              />
              <input
                type="text"
                placeholder="Position"
                className="input-field"
                value={exp.position}
                onChange={e => {
                  const newExperience = [...resume.experience];
                  newExperience[index] = { ...exp, position: e.target.value };
                  setResume(prev => ({ ...prev, experience: newExperience }));
                }}
              />
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                value={exp.location}
                onChange={e => {
                  const newExperience = [...resume.experience];
                  newExperience[index] = { ...exp, location: e.target.value };
                  setResume(prev => ({ ...prev, experience: newExperience }));
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="month"
                  placeholder="Start Date"
                  className="input-field"
                  value={exp.startDate}
                  onChange={e => {
                    const newExperience = [...resume.experience];
                    newExperience[index] = { ...exp, startDate: e.target.value };
                    setResume(prev => ({ ...prev, experience: newExperience }));
                  }}
                />
                <input
                  type="month"
                  placeholder="End Date"
                  className="input-field"
                  value={exp.endDate}
                  onChange={e => {
                    const newExperience = [...resume.experience];
                    newExperience[index] = { ...exp, endDate: e.target.value };
                    setResume(prev => ({ ...prev, experience: newExperience }));
                  }}
                />
              </div>
              <textarea
                placeholder="Description"
                className="input-field md:col-span-2"
                rows="3"
                value={exp.description}
                onChange={e => {
                  const newExperience = [...resume.experience];
                  newExperience[index] = { ...exp, description: e.target.value };
                  setResume(prev => ({ ...prev, experience: newExperience }));
                }}
              />
            </div>
          </div>
        ))}
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Skills</h2>
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Add Skill
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {(resume.skills || []).map((skill, index) => (
            <div key={`skill-${index}`} className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter skill (e.g., JavaScript, React, Node.js)"
                className="input-field flex-1"
                value={skill}
                onChange={e => handleSkillChange(index, e.target.value)}
              />
              <button
                onClick={() => removeSkill(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Add Project
          </button>
        </div>
        {resume.projects.map((project, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Name"
                className="input-field"
                value={project.name}
                onChange={e => {
                  const newProjects = [...resume.projects];
                  newProjects[index] = { ...project, name: e.target.value };
                  setResume(prev => ({ ...prev, projects: newProjects }));
                }}
              />
              <input
                type="url"
                placeholder="Project Link"
                className="input-field"
                value={project.link}
                onChange={e => {
                  const newProjects = [...resume.projects];
                  newProjects[index] = { ...project, link: e.target.value };
                  setResume(prev => ({ ...prev, projects: newProjects }));
                }}
              />
              <input
                type="text"
                placeholder="Technologies Used"
                className="input-field md:col-span-2"
                value={project.technologies}
                onChange={e => {
                  const newProjects = [...resume.projects];
                  newProjects[index] = { ...project, technologies: e.target.value };
                  setResume(prev => ({ ...prev, projects: newProjects }));
                }}
              />
              <textarea
                placeholder="Project Description"
                className="input-field md:col-span-2"
                rows="3"
                value={project.description}
                onChange={e => {
                  const newProjects = [...resume.projects];
                  newProjects[index] = { ...project, description: e.target.value };
                  setResume(prev => ({ ...prev, projects: newProjects }));
                }}
              />
            </div>
          </div>
        ))}
      </motion.section>

    </motion.div>
  );
}
