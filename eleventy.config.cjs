module.exports = eleventy => {

  // Copy public directory to output
  eleventy.addPassthroughCopy({
    'public': '/'
  });

  // Copy all jpg files, keep the same directory structure
  eleventy.addPassthroughCopy('content/**/*.{gif,jpg,png}');

  eleventy.addFilter('filterTags', tags => {
    return tags.filter(tag => tag != 'posts');
  });

  eleventy.addCollection('postsByTag', require('./_config/get-posts-by-tag.cjs'));

  return {
    dir: {
      input: 'content',
      includes: '../_includes',
      data: '../_data'
    }
  };
};

