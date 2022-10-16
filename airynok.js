javascript: (() => {
    /**
     * The custom algorithm for keywords extraction from a product's web page.
     * 
     * @param {*} documents - the list of documents taken from the product's web page;
     * @returns the list of keywords extracted from the product's web page.
     */
    const AIRKE = (documents) => {
        const words = []; /* The bag of unique words that describes the web page. */

        /* Process each document. */
        for (let i in documents) {
            documents[i] = documents[i]
                .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '') /* Remove non-alphabetic characters. */
                .replace(/\s+/g, ' ') /* Remove multiple spaces. */
                .toLowerCase() /* Turn into lower case. */
                .split(' '); /* Tokenize. */
        }

        for (let i in documents) {
            const document = documents[i];

            for (let j in document) {
                const word = document[j];

                /* Check if the word has not been taken yet. */
                if (!words.includes(word)) {
                    words.push(word); /* Add the word to the bag of words. */
                }
            }
        }

        console.log('BOW:', words);

        const vectors = {}; /* Binary vectors built for each word. */

        for (let i in words) {
            const word = words[i];

            vectors[word] = new Array(documents.length);

            for (let j in documents) {
                const document = documents[j];

                /* Check if the j-th document includes the word. */
                if (document.includes(word)) {
                    vectors[word][j] = 1; /* Vector for this word has 1 at the j-th position. */
                } else {
                    vectors[word][j] = 0; /* Otherwise this word has 0 at the j-th position. */
                }
            }
        }

        console.log('Vectors:', vectors);

        const keywords = []; /* The list of extracted keywords. */

        /**
         * Calculates the document's frequency for a given binary vector that describes presence of a word in processed documents.
         * 
         * @param {*} vector - the binary vector that describes presence of a word in processed documents;
         * @returns the document's frequency value.
         */
        const DF = (vector) => {
            const sum = vector.reduce((a, b) => a + b, 0);

            return Math.log(sum / vector.length);
        };

        const documentFrequencies = []; /* The list of document frequency values calculated for all word vectors. */

        for (let word in vectors) {
            const vector = vectors[word];

            documentFrequencies.push(DF(vector)); /* Calculate the document's frequency for each word's vector. */
        }

        const opt = Math.max(...documentFrequencies); /* Get the maximum document's frequency. */

        for (let word in vectors) {
            const vector = vectors[word];

            /* Check if the document's frequency of a word's vector is maximum. */
            if (DF(vector) === opt) {
                keywords.push(word); /* Add the respective word to the list of keywords. */
            }
        }

        console.log('Keywords:', vectors);

        return keywords;
    };

    /* Add a web page's title to the list of documents. */
    const documents = [document.title];

    /* Get the meta description value(s) from the web page. */
    const descriptionTag = document.querySelector('meta[name="description"]');
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    const twitterDescriptionTag = document.querySelector('meta[property="twitter:description"]');

    /* Check if the "description" tag exists and has a value. */
    if (descriptionTag) {
        documents.push(descriptionTag.content); /* Add the taken tag's value to the list of documents. */
    }

    /* Check if the "og:description" tag exists and has a value. */
    if (ogDescriptionTag) {
        documents.push(ogDescriptionTag.content); /* Add the taken tag's value to the list of documents. */
    }

    /* Check if the "twitter:description" tag exists and has a value. */
    if (twitterDescriptionTag) {
        documents.push(twitterDescriptionTag.content); /* Add the taken tag's value to the list of documents. */
    }

    /* Get the keywords from the web page. */
    const keywordsTag = document.querySelector('meta[name="keywords"]');

    /* Check if the "keywords" tag exists and has a value. */
    if (keywordsTag) {
        documents.push(keywordsTag.content); /* Add the taken tag's value to the list of documents. */
    }

    /* Get the H1 tag values from the web page. */
    const h1Tags = document.querySelectorAll('h1');

    for (let tag in h1Tags) {
        const header = h1Tags[tag].innerText;

        /* Check if the obtained "h1" tag exists and has a value. */
        if (header !== undefined && header) {
            documents.push(header); /* Add the taken tag's value to the list of documents. */
        }
    }

    /* Build the URL that points to the homepage with the created search request. */
    const proxyURL = 'https://airynok.github.io/?q=' + AIRKE(documents).join('+');

    window.open(encodeURI(proxyURL), '_blank'); /* Open the homepage with the prepared search request. */
})();