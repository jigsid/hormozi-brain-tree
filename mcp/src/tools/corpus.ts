import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { corpusStatus, searchEvidence, searchTranscripts, videoEvidence } from '../core/corpus.js';

export function registerCorpusSearchTool(server: McpServer): void {
  server.registerTool(
    'corpus_search',
    {
      title: 'Hormozi Corpus Search',
      description:
        'Search Alex Hormozi\'s actual video transcripts and the structured evidence extracted from them. ' +
        'mode=transcript does full-text search over 516 transcripts (use when you need his own words, a story, or an applied example). ' +
        'mode=evidence searches the extracted numbers, named mechanisms and case studies (use when you need a figure, a threshold, or a named concept). ' +
        'mode=video returns everything extracted from one video. ' +
        'Every hit carries a video id and a youtu.be URL. Numbers come from auto-generated captions: treat figures as reliable and wording as approximate.',
      inputSchema: {
        query: z.string().describe('Search text. Plain phrases are matched as a phrase.'),
        mode: z
          .enum(['transcript', 'evidence', 'video'])
          .default('evidence')
          .describe('transcript = full-text over the corpus; evidence = extracted numbers/mechanisms/case studies; video = all evidence for one video id'),
        kind: z
          .enum(['number', 'mechanism', 'case_study'])
          .optional()
          .describe('For mode=evidence, restrict to one evidence kind'),
        video_id: z
          .string()
          .optional()
          .describe('For mode=transcript, restrict to one video; required for mode=video'),
        limit: z.number().int().min(1).max(50).default(10).describe('Max results'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ query, mode, kind, video_id, limit }) => {
      const status = corpusStatus();

      if (mode === 'video') {
        if (!video_id) {
          return {
            isError: true,
            content: [{ type: 'text', text: 'mode=video requires video_id' }],
          };
        }
        const res = videoEvidence(video_id);
        if (!res.available) {
          return {
            content: [
              {
                type: 'text',
                text: `Corpus not available on this machine. ${res.note ?? ''}\nExpected at ${status.root}. The corpus is deliberately external to the repo - see sources/README.md.`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                { mode, videoId: video_id, url: `https://youtu.be/${video_id}`, count: res.rows.length, rows: res.rows },
                null,
                2,
              ),
            },
          ],
        };
      }

      if (mode === 'transcript') {
        const res = searchTranscripts(query, limit, video_id);
        if (!res.available) {
          return {
            content: [
              {
                type: 'text',
                text: `Transcript search unavailable. ${res.note ?? ''}\nThe corpus is deliberately external to the repo - see sources/README.md.`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ mode, query, count: res.hits.length, note: res.note, hits: res.hits }, null, 2),
            },
          ],
        };
      }

      const res = searchEvidence(query, { kind, limit });
      if (!res.available) {
        return {
          content: [
            {
              type: 'text',
              text: `Evidence search unavailable. ${res.note ?? ''}\nThe extraction is deliberately external to the repo - see sources/README.md.`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { mode, query, kind: kind ?? 'all', totalMatches: res.total, returned: res.rows.length, rows: res.rows },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
