import React from 'react';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ResumePreviewProps {
  template: string;
  data: any;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ template, data }) => {
  return (
    <div id="resume-preview" className="bg-white text-black p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="space-y-6">
        <header className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-600">{data.title}</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <span>{data.email}</span>
            <span>{data.phone}</span>
            <span>{data.location}</span>
          </div>
        </header>

        <section>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5" />
            Professional Experience
          </h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} • {exp.period}</p>
              <ul className="list-disc list-inside mt-2">
                {exp.achievements.map((achievement: string, i: number) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school} • {edu.year}</p>
              <p>{edu.details}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Award className="w-5 h-5" />
            Skills & Certifications
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <ul className="list-disc list-inside">
                {data.certifications.map((cert: string, index: number) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};