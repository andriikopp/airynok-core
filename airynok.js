javascript: (() => {

    var extractKeywords = (text, number) => {

        var stopwords = [
            'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
        ];

        var words = text.split(' ');

        var keywords = [];

        words.forEach(word => {

            word = word.toLowerCase();

            if (/^[a-z0-9]+$/i.test(word) && !stopwords.includes(word)) {

                keywords.push(word);
            }
        });

        var keywordFrequency = {};

        keywords.forEach(keyword => {

            if (keywordFrequency[keyword] === undefined) {

                keywordFrequency[keyword] = 1;

            } else {

                keywordFrequency[keyword]++;
            }
        });

        var final = [];

        for (var keyword in keywordFrequency) {

            var weight = keywordFrequency[keyword] * Math.log(number / keywordFrequency[keyword]);

            if (weight <= 0) {

                final.push(keyword);
            }
        }

        return final;
    };

    var pageTitle = document.title;

    var pageMetaDescription = document
        .querySelector('meta[name="description"]')
        .content;

    var productFullInfo = pageTitle + ' ' + pageMetaDescription;

    var keywords = extractKeywords(productFullInfo, 2);

    var searchQuery = keywords.join('+');

    var proxyString = 'https://airynok.github.io/?q=' + searchQuery;

    window.open(encodeURI(proxyString), '_blank');
})();