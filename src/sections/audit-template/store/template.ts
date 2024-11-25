import { create } from 'zustand';

interface templateState {
  sections: any;
}

export const useTemplateStore = create<templateState>()((set) => ({
  sections: {
    'section-1': {
      title: 'Section 1',
      id: 'section-1',
      description: 'This is section 1',
      questions: {
        'question-1': {
          title: 'Question 1',
          description: 'This is question 1',
          options: [
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
            { value: 'option-3', label: 'Option 3' },
          ],
        },
        'question-2': {
          title: 'Question 2',
          description: 'This is question 2',
          options: [
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
            { value: 'option-3', label: 'Option 3' },
          ],
        },
      },
    },
    'section-2': {
      title: 'Section 2',
      id: 'section-2',
      description: 'This is section 2',
      questions: {
        'question-1': {
          title: 'Question 1',
          description: 'This is question 1',
          options: [
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
            { value: 'option-3', label: 'Option 3' },
          ],
        },
        'question-2': {
          title: 'Question 2',
          description: 'This is question 2',
          options: [
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
            { value: 'option-3', label: 'Option 3' },
          ],
        },
      },
    },
  },
}));
