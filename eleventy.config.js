import getPostsByTag from './_config/get-posts-by-tag.js';
import mdFootnote from 'markdown-it-footnote';

export default function (eleventy) {

  // Copy public directory to output
  eleventy.addPassthroughCopy({'public': '/'});

  // Copy all image files, keep the same directory structure
  eleventy.addPassthroughCopy('content/**/*.{gif,jpeg,jpg,png,svg,webp}');

  eleventy.addFilter('filterTags', tags => {
    return tags.filter(tag => tag != 'posts');
  });

  eleventy.addCollection('postsByTag', getPostsByTag);

  eleventy.amendLibrary('md', md => md.use(mdFootnote));

  eleventy.setInputDirectory('content');
  eleventy.setIncludesDirectory('../_includes');
  eleventy.setDataDirectory('../_data');
  eleventy.setTemplateFormats('md');
};

