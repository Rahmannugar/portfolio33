import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published portfolio content should be visible immediately after a CMS update.
  useCdn: false,
})
