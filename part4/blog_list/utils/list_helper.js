/*
Exercises 4.3. - 4.7.
4.3: helper functions and unit tests, step1
4.4: helper functions and unit tests, step2
4.5*: helper functions and unit tests, step3
4.6*: helper functions and unit tests, step4
4.7*: helper functions and unit tests, step5
*/
const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  let sum = 0;

  blogs.forEach((element) => {
    sum += element.likes;
  });

  return sum;
};
const favoriteBlog = (blogs) => {
  const maxLikedBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });

  return {
    title: maxLikedBlog.title,
    author: maxLikedBlog.author,
    likes: maxLikedBlog.likes,
  };
};

function mostBlogs(blogs) {
  const blogCount = {};
  let topAuthor = "";
  let maxBlogs = 0;

  blogs.forEach((blog) => {
    if (blog.author in blogCount) {
      blogCount[blog.author]++;
    } else {
      blogCount[blog.author] = 1;
    }
  });

  for (const author in blogCount) {
    if (blogCount[author] > maxBlogs) {
      topAuthor = author;
      maxBlogs = blogCount[author];
    }
  }

  return { author: topAuthor, blogs: maxBlogs };
}
function mostLikes(blogs) {
  const likeCounts = {};
  let maxAuthor = "";
  let maxLikes = 0;

  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    if (author in likeCounts) {
      likeCounts[author] += likes;
    } else {
      likeCounts[author] = likes;
    }
  });

  for (const author in likeCounts) {
    if (likeCounts[author] > maxLikes) {
      maxAuthor = author;
      maxLikes = likeCounts[author];
    }
  }
  return { author: maxAuthor, likes: maxLikes };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
