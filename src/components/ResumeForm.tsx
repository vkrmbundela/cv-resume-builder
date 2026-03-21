import React from 'react';
import { ResumeData } from '../types';
import { Plus, Trash2, User, GraduationCap, Briefcase, Code, Award, BookOpen, Users } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = (field: keyof ResumeData, emptyItem: any) => {
    const current = data[field] as any[];
    updateField(field, [...current, emptyItem]);
  };

  const removeItem = (field: keyof ResumeData, index: number) => {
    const current = data[field] as any[];
    updateField(field, current.filter((_, i) => i !== index));
  };

  const updateItem = (field: keyof ResumeData, index: number, value: any) => {
    const current = data[field] as any[];
    const updated = [...current];
    updated[index] = value;
    updateField(field, updated);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Basic Info */}
      <Section title="Basic Information" icon={<User className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={data.name} onChange={(v) => updateField('name', v)} />
          <Input label="Degree" value={data.degree} onChange={(v) => updateField('degree', v)} />
          <Input label="Department" value={data.department} onChange={(v) => updateField('department', v)} />
          <Input label="Institute" value={data.institute} onChange={(v) => updateField('institute', v)} />
          <Input label="Phone" value={data.phone} onChange={(v) => updateField('phone', v)} />
          <Input label="Email" value={data.email} onChange={(v) => updateField('email', v)} />
          <Input label="LinkedIn" value={data.linkedin} onChange={(v) => updateField('linkedin', v)} />
          <Input label="GitHub" value={data.github} onChange={(v) => updateField('github', v)} />
        </div>
      </Section>

      {/* Education */}
      <Section title="Education" icon={<GraduationCap className="w-5 h-5" />} onAdd={() => addItem('education', { degree: '', institute: '', cgpa: '', year: '' })}>
        {data.education.map((edu, i) => (
          <div key={i} className="p-4 border border-zinc-200 rounded-lg mb-4 relative group">
            <button onClick={() => removeItem('education', i)} title="Remove education entry" className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Degree/Certificate" value={edu.degree} onChange={(v) => updateItem('education', i, { ...edu, degree: v })} />
              <Input label="Institute/Board" value={edu.institute} onChange={(v) => updateItem('education', i, { ...edu, institute: v })} />
              <Input label="CGPA/Percentage" value={edu.cgpa} onChange={(v) => updateItem('education', i, { ...edu, cgpa: v })} />
              <Input label="Year" value={edu.year} onChange={(v) => updateItem('education', i, { ...edu, year: v })} />
            </div>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience" icon={<Briefcase className="w-5 h-5" />} onAdd={() => addItem('experience', { company: '', role: '', dates: '', location: '', bullets: [''] })}>
        {data.experience.map((exp, i) => (
          <div key={i} className="p-4 border border-zinc-200 rounded-lg mb-4 relative">
            <button onClick={() => removeItem('experience', i)} title="Remove experience entry" className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input label="Company/Lab" value={exp.company} onChange={(v) => updateItem('experience', i, { ...exp, company: v })} />
              <Input label="Role" value={exp.role} onChange={(v) => updateItem('experience', i, { ...exp, role: v })} />
              <Input label="Dates" value={exp.dates} onChange={(v) => updateItem('experience', i, { ...exp, dates: v })} />
              <Input label="Location" value={exp.location} onChange={(v) => updateItem('experience', i, { ...exp, location: v })} />
            </div>
            <BulletList label="Experience Bullets" bullets={exp.bullets} onChange={(v) => updateItem('experience', i, { ...exp, bullets: v })} />
          </div>
        ))}
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={<Code className="w-5 h-5" />} onAdd={() => addItem('projects', { title: '', tech: '', bullets: [''] })}>
        {data.projects.map((proj, i) => (
          <div key={i} className="p-4 border border-zinc-200 rounded-lg mb-4 relative">
            <button onClick={() => removeItem('projects', i)} title="Remove project entry" className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <Input label="Project Title" value={proj.title} onChange={(v) => updateItem('projects', i, { ...proj, title: v })} />
              <Input label="Technology/Tools" value={proj.tech} onChange={(v) => updateItem('projects', i, { ...proj, tech: v })} />
            </div>
            <BulletList label="Project Bullets" bullets={proj.bullets} onChange={(v) => updateItem('projects', i, { ...proj, bullets: v })} />
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={<Award className="w-5 h-5" />} onAdd={() => addItem('skills', { category: '', items: '' })}>
        {data.skills.map((skill, i) => (
          <div key={i} className="p-4 border border-zinc-200 rounded-lg mb-4 relative">
            <button onClick={() => removeItem('skills', i)} title="Remove skill entry" className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Category" value={skill.category} onChange={(v) => updateItem('skills', i, { ...skill, category: v })} />
              <Input label="Items (comma separated)" value={skill.items} onChange={(v) => updateItem('skills', i, { ...skill, items: v })} />
            </div>
          </div>
        ))}
      </Section>

      {/* Achievements */}
      <Section title="Achievements" icon={<BookOpen className="w-5 h-5" />} onAdd={() => updateField('achievements', [...data.achievements, ''])}>
        <BulletList label="Achievements" bullets={data.achievements} onChange={(v) => updateField('achievements', v)} />
      </Section>

      {/* Publications */}
      <Section title="Publications" icon={<BookOpen className="w-5 h-5" />} onAdd={() => updateField('publications', [...data.publications, ''])}>
        <BulletList label="Publications" bullets={data.publications} onChange={(v) => updateField('publications', v)} />
      </Section>

      {/* POR */}
      <Section title="Positions of Responsibility" icon={<Users className="w-5 h-5" />} onAdd={() => updateField('por', [...data.por, ''])}>
        <BulletList label="Positions" bullets={data.por} onChange={(v) => updateField('por', v)} />
      </Section>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; onAdd?: () => void }> = ({ title, icon, children, onAdd }) => (
  <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
    <div className="px-6 py-4 bg-iith-blue/5 border-b border-iith-blue/10 flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold text-iith-blue">
        {icon}
        {title}
      </div>
      {onAdd && (
        <button onClick={onAdd} title={`Add ${title}`} className="p-1.5 bg-iith-blue text-white rounded-md hover:bg-iith-blue/90 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title={label}
      placeholder={label}
      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-iith-blue/10 focus:border-iith-blue transition-all"
    />
  </div>
);

const BulletList: React.FC<{ label: string; bullets: string[]; onChange: (v: string[]) => void }> = ({ label, bullets, onChange }) => {
  const updateBullet = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const removeBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  const addBullet = () => {
    onChange([...bullets, '']);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>
      {bullets.map((bullet, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={bullet}
            onChange={(e) => updateBullet(i, e.target.value)}
            title={`${label} ${i + 1}`}
            placeholder={`${label} ${i + 1}`}
            className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-iith-blue/10 focus:border-iith-blue transition-all"
          />
          <button onClick={() => removeBullet(i)} title={`Remove ${label} ${i + 1}`} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={addBullet} title={`Add ${label}`} className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-iith-blue transition-colors">
        <Plus className="w-4 h-4" /> Add Bullet
      </button>
    </div>
  );
};
