import ArticleListItem from './ArticleListItem';
import useArticles from '../hooks/useArticles';

import styles from './ArticleList.module.css';
import Error from './Error';

const ArticleList = () => {
  const { articles, error, isLoading } = useArticles();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Error message={error} isMainPage={true} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Automated Blog</h1>
      <div className={styles.list}>
        {articles.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
