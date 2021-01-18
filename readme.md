# spectacular-crawler

This program takes a list of URLs (JSON) on a (currently hardcoded) website, and checks each link for specific issues.
The links are all blog articles, and they are each checked for:
- broken links
- missing related articles
- if the article contains a video (will in the future check if the video is broken) (currently not working for videos imbedded via iframe)

The program then outputs the required data (JSON).
