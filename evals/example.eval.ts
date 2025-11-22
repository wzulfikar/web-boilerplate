import { Levenshtein } from 'autoevals'
import { evalite } from 'evalite'

// TODO: fix support for absolute import (e.g. extends from root tsconfig.json)
import { formatAge } from '../shared/lib/date'

evalite('My Eval', {
  // An array of test data
  // - TODO: Replace with your test data
  data: [{ input: 'Hello', expected: 'Hello World!' }],
  // The task to perform
  // - TODO: Replace with your LLM call
  task: async (input) => {
    return input + ' World! ' + formatAge(new Date('2021-02-21'))
  },
  // The scoring methods for the eval
  scorers: [Levenshtein],
})
