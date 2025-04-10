import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    color: '#333333',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
    color: '#1a5d1a', // Green color from template
  },
  contact: {
    fontSize: 10,
    marginBottom: 3,
    color: '#666666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    color: '#1a5d1a',
    paddingBottom: 2,
    borderBottom: '1 solid #1a5d1a',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 10,
    fontWeight: 400,
    marginBottom: 2,
    color: '#666666',
  },
  itemDuration: {
    fontSize: 10,
    color: '#1a5d1a',
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e8f5e8',
    padding: '4 10',
    borderRadius: 4,
    color: '#1a5d1a',
    marginRight: 5,
    marginBottom: 5,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: '#1a5d1a',
    borderRadius: 2,
    marginRight: 5,
    marginTop: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
});

const ResumePDF = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.personalInfo.name}</Text>
        <Text style={styles.contact}>{resume.personalInfo.email} • {resume.personalInfo.phone}</Text>
        <Text style={styles.contact}>{resume.personalInfo.location}</Text>
        {resume.personalInfo.linkedin && (
          <Text style={styles.contact}>LinkedIn: {resume.personalInfo.linkedin}</Text>
        )}
        {resume.personalInfo.github && (
          <Text style={styles.contact}>GitHub: {resume.personalInfo.github}</Text>
        )}
      </View>

      {/* Education */}
      {resume.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemSubtitle}>{edu.school}</Text>
              <Text style={styles.itemDuration}>{edu.startDate} - {edu.endDate}</Text>
              <Text style={styles.description}>GPA: {edu.gpa}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {resume.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.itemTitle}>{exp.title}</Text>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={styles.itemDuration}>{exp.startDate} - {exp.endDate}</Text>
              {exp.description.split('\n').map((point, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text style={styles.description}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.itemTitle}>{project.name}</Text>
              <Text style={styles.itemDuration}>{project.startDate} - {project.endDate}</Text>
              {project.description.split('\n').map((point, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text style={styles.description}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {(resume.skills || []).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {(resume.skills || []).map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
