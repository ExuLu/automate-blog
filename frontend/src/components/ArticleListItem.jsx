import { Link } from 'react-router-dom';

import styles from './ArticleListItem.module.css';

const ArticleListItem = ({ post }) => {
  const shortText = post.text.substring(0, 99);

  return (
    <Link to={`/articles/${post.id}`} className={styles.card}>
      <h2 className={styles.title}>{post.name}</h2>
      <p className={styles.text}>{`${shortText}...`}</p>
      <span className={styles.linkText}>Read more →</span>
    </Link>
  );
};

export default ArticleListItem;
