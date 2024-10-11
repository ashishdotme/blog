interface Post {
  title: string;
  topic: string;
  description?: string;
  content: string;
  coverImageUrl?: string;
  date: string;
  tags: string[];
  slug: string;
}

export type { Post };
