import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import getPostsByTag from './_config/get-posts-by-tag.js';
import hljs from 'highlight.js';
import mdAnchor from 'markdown-it-anchor';
import mdFootnote from 'markdown-it-footnote';
import mdToc from 'markdown-it-table-of-contents';

export default function (eleventy) {
  eleventy.addBundle('css', {toFileDirectory: 'css'});
  eleventy.addBundle('js', {toFileDirectory: 'js'});

  // Copy public directory to output
  eleventy.addPassthroughCopy({'public': '/'});

  // Copy all image files, keep the same directory structure
  eleventy.addPassthroughCopy('content/**/*.{gif,jpeg,jpg,png,svg,webp}');

  eleventy.addFilter('except', (items, ...excludes) => {
    return (items || []).filter(item => excludes.indexOf(item) === -1);
  });

  eleventy.addCollection('postsByTag', getPostsByTag);

  const metadata = {
    'author': 'Dave Kennedy',
    'baseUrl': 'https://dkennedy.io',
    'description': 'A virtual escape hatch for the stuff in my head.',
    'language': 'en',
    'title': 'dkennedy.io'
  };

  eleventy.addGlobalData('metadata', metadata);

  eleventy.addPlugin(feedPlugin, {
    collection: {
      limit: 10,
      name: 'posts',
    },
    metadata: {
      author: {name: metadata.author},
      base: metadata.baseUrl,
      language: metadata.language,
      subtitle: metadata.description,
      title: metadata.title,
    },
    outputPath: '/feed/atom.xml',
    stylesheet: '/feed/pretty-atom-feed-v3.xsl',
    type: 'atom',
  });

  eleventy.amendLibrary('md', md => {
    md.options.highlight = (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, {language: lang}).value;
      }

      return ''; // use external default escaping
    };

    md.use(mdAnchor);
    md.use(mdFootnote);

    md.use(mdToc, {
      containerClass: 'toc',
      containerHeaderHtml: '<div class="icon icon-right toggle">Contents</div>',
    });
  });

  eleventy.setInputDirectory('content');
  eleventy.setIncludesDirectory('../_includes');
  eleventy.setDataDirectory('../_data');

  // Nunjucks is used by the feed plugin virtual template
  eleventy.setTemplateFormats(['md', 'njk']);
};

