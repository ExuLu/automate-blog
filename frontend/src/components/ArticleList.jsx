import { useState } from 'react';
import ArticleItem from '../components/ArticleItem';
import mockPosts from '../mockPosts';

const ArticleList = () => {
  const [posts, setPosts] = useState(mockPosts);

  return (
    <div>
      <h1>Automatate Blog</h1>
      <div>
        {posts.map((post) => (
          <ArticleItem post={post} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
