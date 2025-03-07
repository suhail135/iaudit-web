import * as docx from 'docx';
import { saveAs } from 'file-saver';

function generateAuditReportTemplate1(templateName: string = 'Audit_Report_Template_1') {
  const doc = new docx.Document({
    styles: {
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          run: {
            font: 'Aptos',
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: docx.PageOrientation.LANDSCAPE,
              // width: docx.convertMillimetersToTwip(297),
              // height: docx.convertMillimetersToTwip(210),
            },
            margin: {
              top: docx.convertInchesToTwip(0.5),
              right: docx.convertInchesToTwip(0.5),
              bottom: docx.convertInchesToTwip(0.5),
              left: docx.convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Audit Report Template 1',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Date: [Insert Date]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Auditor Signed: [Insert Auditor]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Company: [Insert Company]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Site: [Insert Site]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Status: [Insert Status]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Template Information:',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'ID: [Insert ID]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Name: [Insert Name]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Description: [Insert Description]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Is Audit: [Yes/No]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Published: [Yes/No]',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Sections:',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph('Question')],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    shading: {
                      fill: 'E0E0E0',
                    },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph('Audit Findings')],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    shading: {
                      fill: 'E0E0E0',
                    },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph('Audit Evidence')],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    shading: {
                      fill: 'E0E0E0',
                    },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph('Opportunities')],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    shading: {
                      fill: 'E0E0E0',
                    },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph('Score')],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    shading: {
                      fill: 'E0E0E0',
                    },
                  }),
                ],
              }),
              // Add more rows as needed
            ],
          }),
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, `${templateName}.docx`);
    console.log('Document created successfully');
  });
}

export default generateAuditReportTemplate1;
