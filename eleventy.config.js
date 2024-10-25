import getPostsByTag from './_config/get-posts-by-tag.js';
import hljs from 'highlight.js';
import mdFootnote from 'markdown-it-footnote';

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

  eleventy.amendLibrary('md', md => {
    md.options.highlight = (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, {language: lang}).value;
      }

      return ''; // use external default escaping
    };

    md.use(mdFootnote);
  });

  eleventy.setInputDirectory('content');
  eleventy.setIncludesDirectory('../_includes');
  eleventy.setDataDirectory('../_data');
  eleventy.setTemplateFormats('md');
};

