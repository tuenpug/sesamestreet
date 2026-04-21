import https from 'https';

https.get('https://sesameworkshop.org/our-work/shows/sesame-street/sesame-street-characters/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Basic regex to find img tags
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi;
    let match;
    const results = [];
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[2]) { // only if alt text exists
        results.push({ src: match[1], alt: match[2] });
      }
    }
    console.log(JSON.stringify(results.slice(0, 50), null, 2));
  });
}).on('error', (err) => console.error(err));
