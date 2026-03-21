import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#000',
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerSub: {
    fontSize: 10,
    marginBottom: 2,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    fontSize: 9,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 1,
    letterSpacing: 1,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    minHeight: 18,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f3f3f3',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 3,
    borderRightWidth: 0.5,
    borderRightColor: '#000',
    textAlign: 'center',
    fontSize: 9,
  },
  col1: { width: '25%' },
  col2: { width: '45%' },
  col3: { width: '15%' },
  col4: { width: '15%', borderRightWidth: 0 },
  
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: 4,
  },
  expSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 15,
    flexDirection: 'row',
    marginBottom: 1,
  },
  bulletDot: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  projectTech: {
    fontStyle: 'italic',
    marginBottom: 2,
    marginLeft: 10,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillCategory: {
    fontWeight: 'bold',
    width: 130,
  },
  skillItems: {
    flex: 1,
  },
  link: {
    color: '#0000EE',
    textDecoration: 'none',
  }
});

export const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.headerSub}>{data.degree} | {data.department}</Text>
        <Text style={styles.headerSub}>{data.institute}</Text>
        <View style={styles.contactRow}>
          <Text>{data.phone}</Text>
          <Text>|</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.contactRow}>
          <Text>{data.linkedin}</Text>
          <Text>|</Text>
          <Text>{data.github}</Text>
        </View>
      </View>

      {/* Education */}
      <Text style={styles.sectionTitle}>Education</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.col1]}>Degree/Certificate</Text>
          <Text style={[styles.tableCell, styles.col2]}>Institute/Board</Text>
          <Text style={[styles.tableCell, styles.col3]}>CGPA/Percentage</Text>
          <Text style={[styles.tableCell, styles.col4]}>Year</Text>
        </View>
        {data.education.map((edu, i) => (
          <View key={i} style={[styles.tableRow, i === data.education.length - 1 ? { borderBottomWidth: 0 } : {}]}>
            <Text style={[styles.tableCell, styles.col1]}>{edu.degree}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{edu.institute}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{edu.cgpa}</Text>
            <Text style={[styles.tableCell, styles.col4]}>{edu.year}</Text>
          </View>
        ))}
      </View>

      {/* Experience */}
      {data.experience.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.expHeader}>
                <Text>• {exp.company}</Text>
                <Text>{exp.dates}</Text>
              </View>
              <View style={styles.expSubHeader}>
                <Text>{exp.role}</Text>
                <Text>{exp.location}</Text>
              </View>
              {exp.bullets.map((bullet, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={styles.bulletDot}>◦</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </>
      )}

      {/* Publications */}
      {data.publications.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Publications</Text>
          {data.publications.map((pub, i) => (
            <Text key={i} style={{ marginBottom: 4 }}>{pub}</Text>
          ))}
        </>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.expHeader}>
                <Text>• {proj.title}</Text>
              </View>
              <Text style={styles.projectTech}>Technology/Tools: {proj.tech}</Text>
              {proj.bullets.map((bullet, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={styles.bulletDot}>◦</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, i) => (
            <View key={i} style={styles.skillRow}>
              <Text style={styles.skillCategory}>• {skill.category}:</Text>
              <Text style={styles.skillItems}>{skill.items}</Text>
            </View>
          ))}
        </>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {data.achievements.map((ach, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{ach}</Text>
            </View>
          ))}
        </>
      )}

      {/* Positions of Responsibility */}
      {data.por.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Positions of Responsibility</Text>
          {data.por.map((p, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{p}</Text>
            </View>
          ))}
        </>
      )}
    </Page>
  </Document>
);
