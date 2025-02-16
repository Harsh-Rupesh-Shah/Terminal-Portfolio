import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const resumeTemplates = [
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'modern',
    name: 'Modern',
    preview: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200'
  }
];

export const generateResume = async (
  templateId: string,
  data: any,
  elementId: string
): Promise<string> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Resume element not found');

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const pdf = new jsPDF({
      format: 'a4',
      unit: 'px'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Return the PDF as base64
    return pdf.output('datauristring');
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
};