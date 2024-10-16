const { chunk } = require('@11ty/lodash-custom');
const slugify = require('@sindresorhus/slugify');

function getPostsByTag(collections) {
  return getUniqueTags(collections)
    .filter(tag => tag != 'posts')
    .flatMap(tag => {
      const tagSlug = slugify(tag);
      const taggedPosts = collections.getFilteredByTag(tag).reverse();
      const pageSize = 10;
      const pages = chunk(taggedPosts, pageSize);
      const totalPages = pages.length;

      return pages.map((posts, pageNumber) => {
        return {
          tag: tag,
          tagSlug: tagSlug,
          posts: posts,
          pageNumber: pageNumber,
          totalPages: totalPages,
          currentHref: getCurrentHref(pageNumber, tagSlug),
          nextHref: getNextHref(pageNumber, totalPages, tagSlug),
          previousHref: getPreviousHref(pageNumber, tagSlug),
        };
      });
    });
}

function getUniqueTags(collections) {
  const allPosts = collections.getFilteredByTag('posts');
  const allTags = allPosts.flatMap(post => post.data.tags);
  return [...new Set(allTags)];
}

function getCurrentHref(pageNumber, tagSlug) {
  if (pageNumber == 0) {
    return `/tags/${tagSlug}/`;
  }

  return `/tags/${tagSlug}/page-${pageNumber + 1}/`;
}

function getNextHref(pageNumber, totalPages, tagSlug) {
  if (pageNumber + 1 == totalPages) {
    return null;
  }

  return `/tags/${tagSlug}/page-${pageNumber + 2}/`;
}

function getPreviousHref(pageNumber, tagSlug) {
  if (pageNumber == 0) {
    return null;
  }

  if (pageNumber == 1) {
    return `/tags/${tagSlug}/`;
  }

  return `/tags/${tagSlug}/page-${pageNumber}/`;
}

module.exports = getPostsByTag;

