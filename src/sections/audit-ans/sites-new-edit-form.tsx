import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Button,
  Divider,
  Collapse,
  MenuItem,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import generateDoc from 'src/components/docx/buildAuditReportv1';

import { useAuthContext } from 'src/auth/hooks';

import { answerQuestion, useGetSingleAudit } from './api/audit';

import type { IAuditData } from './api/types';

// ----------------------------------------------------------------------

type Props = {
  currentAuditTemplate: IAuditData;
};

export function AuditFillPage({ currentAuditTemplate }: Props) {
  const { user } = useAuthContext();

  const { auditMutate } = useGetSingleAudit(currentAuditTemplate.id as string);

  const [openDetails, setOpenDetails] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: any }>({});

  const [isSaveLoadingId, setIsSaveLoadingId] = useState<string | null>(null);

  useEffect(() => {
    // set aswers to the input values state if they exist inside the currentAuditTemplate

    if (currentAuditTemplate) {
      const { templates } = currentAuditTemplate;

      console.log(templates);

      templates.sections.forEach((section) => {
        section.questions.forEach((question) => {
          if (question.answer) {
            const { answer } = question;

            console.log(answer);

            if (answer) {
              setInputValues((prev) => ({
                ...prev,
                [question.id]: {
                  findings: answer.audit_findings,
                  evidence: answer.audit_evidence,
                  ofi: answer.opportunities,
                  score: answer.score,
                },
              }));
            }
          }
        });
      });
    }

    return () => {
      console.log('cleanup');
    };
  }, [currentAuditTemplate]);

  const handleToggleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const handleToggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleToggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleInputChange = (questionId: string, field: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
  };

  const handleDownloadReport = () => {
    console.log('Download report');

    generateDoc(currentAuditTemplate);

    // download the report from CurrentAuditTemplate for whole audit
  };

  const renderDetails = () => (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={1} onClick={handleToggleDetails} sx={{ cursor: 'pointer' }}>
          <Typography variant="h6">Audit Template Details</Typography>
          <Typography variant="body2">View and edit the details of the audit template</Typography>
        </Stack>
        <IconButton onClick={handleToggleDetails}>
          {openDetails ? <Iconify icon="mdi:chevron-up" /> : <Iconify icon="mdi:chevron-down" />}
        </IconButton>
      </Stack>
      <Collapse in={openDetails}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Audit Template Name:</Typography>
            <Typography variant="body2">{currentAuditTemplate.name}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1">Description:</Typography>
            <Typography variant="body2">{currentAuditTemplate.templates.description}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1">Site:</Typography>
            <Typography variant="body2">{currentAuditTemplate.site}</Typography>
            <Typography variant="body2">{currentAuditTemplate.company}</Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Start Date:</Typography>
              <Typography variant="body2">{fDate(currentAuditTemplate.start_date)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Expected End Date:</Typography>
              <Typography variant="body2">
                {fDate(currentAuditTemplate.expected_end_date)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Auditor Signed:</Typography>
              <Typography variant="body2">{currentAuditTemplate.auditor_signed}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Status:</Typography>
              <Typography variant="body2">{currentAuditTemplate.status}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Created At:</Typography>
              <Typography variant="body2">{fDate(currentAuditTemplate.createdAt)}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Collapse>
    </Card>
  );

  const renderSectionsWithQuestionsAndAnswerFields = () => (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1} sx={{ cursor: 'pointer' }}>
            <Typography variant="h6">Sections and Questions</Typography>
            <Typography variant="body2">
              View and edit the sections and questions of the audit template
            </Typography>
          </Stack>
        </Stack>
        <Collapse in>
          <Stack spacing={3}>
            {currentAuditTemplate.templates.sections.map((section) => (
              <Stack key={section.id} spacing={0}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <button
                    type="button"
                    onClick={() => handleToggleSection(section.id)}
                    style={{
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      textAlign: 'left',
                    }}
                    aria-expanded={openSections[section.id]}
                  >
                    <Typography variant="subtitle2">{section.name}</Typography>
                  </button>
                  <IconButton onClick={() => handleToggleSection(section.id)}>
                    {openSections[section.id] ? (
                      <Iconify icon="mdi:chevron-up" />
                    ) : (
                      <Iconify icon="mdi:chevron-down" />
                    )}
                  </IconButton>
                </Stack>
                <Collapse in={openSections[section.id]}>
                  <Stack spacing={3}>
                    <Typography variant="body2">{section.description}</Typography>
                    {section.questions.map((question) => (
                      <Stack key={question.id} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <button
                            type="button"
                            onClick={() => handleToggleQuestion(question.id)}
                            style={{
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              font: 'inherit',
                              textAlign: 'left',
                            }}
                            aria-expanded={openQuestions[question.id]}
                          >
                            <Stack>
                              <Typography variant="caption" component="span">
                                Clause No. {question.display_number}
                              </Typography>

                              <Typography variant="subtitle1">{question.name}</Typography>
                            </Stack>
                          </button>
                          <IconButton onClick={() => handleToggleQuestion(question.id)}>
                            {openQuestions[question.id] ? (
                              <Iconify icon="mdi:chevron-up" />
                            ) : (
                              <Iconify icon="mdi:chevron-down" />
                            )}
                          </IconButton>
                        </Stack>
                        <Collapse in={openQuestions[question.id]}>
                          <Stack spacing={1}>
                            <Typography variant="body2">{question.description}</Typography>

                            <TextField
                              select
                              fullWidth
                              variant="outlined"
                              label="Audit Findings"
                              value={inputValues[question.id]?.findings || ''}
                              onChange={(e) =>
                                handleInputChange(question.id, 'findings', e.target.value)
                              }
                            >
                              {/* 'CONFORM', 'MINOR_NC', 'MAJOR_NC', 'OFI' */}

                              <MenuItem
                                value="CONFORM"
                                sx={{
                                  backgroundColor: '#6EBC6E',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#5AA55A',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#4A8A4A',
                                  },
                                }}
                              >
                                Compliant
                              </MenuItem>
                              <MenuItem
                                value="OFI"
                                sx={{
                                  backgroundColor: '#515100',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#414100',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#313100',
                                  },
                                }}
                              >
                                OFI
                              </MenuItem>
                              <MenuItem
                                value="MINOR_NC"
                                sx={{
                                  backgroundColor: '#F25700',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#D24600',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#B23600',
                                  },
                                }}
                              >
                                Minor N/C
                              </MenuItem>
                              <MenuItem
                                value="MAJOR_NC"
                                sx={{
                                  backgroundColor: '#FF4B4B',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#E43B3B',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#C42B2B',
                                  },
                                }}
                              >
                                Major N/C
                              </MenuItem>
                            </TextField>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Audit Evidence"
                              multiline
                              rows={4}
                              helperText="Provide detailed evidence for the audit findings."
                              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                              value={inputValues[question.id]?.evidence || ''}
                              onChange={(e) =>
                                handleInputChange(question.id, 'evidence', e.target.value)
                              }
                            />

                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Opportunities for Improvement (OFI)"
                              multiline
                              rows={4}
                              helperText="Suggest any opportunities for improvement identified during the audit."
                              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                              value={inputValues[question.id]?.ofi || ''}
                              onChange={(e) =>
                                handleInputChange(question.id, 'ofi', e.target.value)
                              }
                            />

                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Score"
                              type="number"
                              helperText="Provide a score for the audit question."
                              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                              value={inputValues[question.id]?.score || ''}
                              onChange={(e) =>
                                handleInputChange(question.id, 'score', e.target.value)
                              }
                            />

                            <Stack direction="row" spacing={1} justifyContent="space-between">
                              <Stack spacing={1} direction="row">
                                <Button
                                  variant="outlined"
                                  startIcon={<Iconify icon="mdi:camera" />}
                                >
                                  Upload Image
                                </Button>

                                <Button variant="outlined" startIcon={<Iconify icon="mdi:file" />}>
                                  Upload File
                                </Button>
                              </Stack>
                            </Stack>
                            <Stack>
                              <LoadingButton
                                loading={isSaveLoadingId === question.id}
                                onClick={async () => {
                                  setIsSaveLoadingId(question.id);
                                  // Save the answer
                                  const data = {
                                    audit_findings: inputValues[question.id]?.findings,
                                    score: inputValues[question.id]?.score,
                                    userId: user?.id,
                                    questionID: question.id,
                                    audit_evidence: inputValues[question.id]?.evidence,
                                    opportunities: inputValues[question.id]?.ofi,
                                    geo_location: null,
                                    display_no: question.display_number,
                                  };

                                  try {
                                    const results = await answerQuestion(data);
                                    toast.success('Answer saved successfully');
                                    auditMutate();
                                    setIsSaveLoadingId(null);

                                    console.log(results);
                                  } catch (error) {
                                    console.error(error);
                                    toast.error('Failed to save answer');
                                    setIsSaveLoadingId(null);
                                  }
                                }}
                                variant="contained"
                                color="primary"
                              >
                                Save Answer
                              </LoadingButton>
                            </Stack>
                          </Stack>
                        </Collapse>
                      </Stack>
                    ))}
                  </Stack>
                </Collapse>
                <Divider />
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );

  return (
    <Stack spacing={5} sx={{ mx: 'auto' }}>
      {renderDetails()}

      {renderSectionsWithQuestionsAndAnswerFields()}

      <Button onClick={handleDownloadReport} type="button" variant="contained" color="primary">
        Download Audit Report
      </Button>
    </Stack>
  );
}
