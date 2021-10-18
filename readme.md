# article-crawler

Takes a list of URLs (JSON) and checks each link for specific issues.
The links are all blog articles, and they are each checked for:
- broken links (checks each link in the article)
- missing related articles
- if the article contains a video (will in the future check if the video is broken)

The program then outputs the required data (JSON).
