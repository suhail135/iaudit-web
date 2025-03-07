import type { IAuditData } from 'src/sections/audit-ans/api/types';

import * as docx from 'docx';
import { saveAs } from 'file-saver';

function generateDoc(data: IAuditData) {
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
                text: `Audit Report for ${data.name}`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Date: ${data.start_date}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Auditor Signed: ${data.auditor_signed}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Company: ${data.company}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Site: ${data.site}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Status: ${data.status}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Template Information:`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `ID: ${data.templates.id}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Name: ${data.templates.name}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Description: ${data.templates.description}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Is Audit: ${data.templates.is_audit ? 'Yes' : 'No'}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Published: ${data.templates.published ? 'Yes' : 'No'}`,
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Audit Report Template 1`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          ...data.templates.sections
            .map((section) => [
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: `Section: ${section.name}`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new docx.Table({
                width: {
                  size: 100,
                  type: docx.WidthType.PERCENTAGE,
                },
                margins: {
                  top: 100,
                  bottom: 100,
                  left: 100,
                  right: 100,
                  marginUnitType: docx.WidthType.DXA,
                },
                rows: [
                  new docx.TableRow({
                    children: [
                      new docx.TableCell({
                        children: [new docx.Paragraph('Question')],
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                          fill: '0F4761',
                        },
                        width: {
                          size: 40,
                          type: docx.WidthType.PERCENTAGE,
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph('Audit Findings')],
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                          fill: '0F4761',
                        },
                        width: {
                          size: 1800,
                          type: docx.WidthType.DXA,
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph('Audit Evidence')],
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                          fill: '0F4761',
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph('Opportunities')],
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                          fill: '0F4761',
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph('Score')],
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                          fill: '0F4761',
                        },
                      }),
                    ],
                  }),
                  ...section.questions.map(
                    (question) =>
                      new docx.TableRow({
                        children: [
                          new docx.TableCell({
                            children: [
                              new docx.Paragraph(
                                `Question ${question.display_number}: ${question.name}`
                              ),
                            ],
                            verticalAlign: docx.VerticalAlign.CENTER,
                            margins: {
                              top: 100,
                              bottom: 100,
                              left: 100,
                              right: 100,
                              marginUnitType: docx.WidthType.DXA,
                            },
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(question.answer?.audit_findings ?? '')],
                            verticalAlign: docx.VerticalAlign.CENTER,
                            shading: {
                              fill:
                                question.answer?.audit_findings === 'CONFORM'
                                  ? '00FF00'
                                  : question.answer?.audit_findings === 'OFI'
                                    ? 'FFFF00'
                                    : 'FF0000',
                            },
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(question.answer?.audit_evidence ?? '')],
                            verticalAlign: docx.VerticalAlign.CENTER,
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(question.answer?.opportunities ?? '')],
                            verticalAlign: docx.VerticalAlign.CENTER,
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(question.answer?.score ?? '')],
                            verticalAlign: docx.VerticalAlign.CENTER,
                          }),
                        ],
                      })
                  ),
                ],
              }),
            ])
            .flat(),
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, 'example.docx');
    console.log('Document created successfully');
  });
}

export default generateDoc;
