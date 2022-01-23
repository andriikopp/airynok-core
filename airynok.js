javascript: (() => {
	const RTFIDFKE = (documents) => {
		const termFrequency = {};

		for (let i in documents) {
			const document = documents[i];

			const words = document.split(' ');

			for (let j in words) {
				const word = words[j];

				if (termFrequency[word] === undefined) {
					termFrequency[word] = {
						total: 1,
						documents: [i]
					};
				} else {
					termFrequency[word].total++;

					if (!termFrequency[word].documents.includes(i)) {
						termFrequency[word].documents.push(i);
					}
				}
			}
		}

		const tfIdf = {};

		for (let word in termFrequency) {
			const tf = termFrequency[word].total;
			const idf = Math.log(documents.length / termFrequency[word].documents.length);

			tfIdf[word] = tf * idf;
		}

		const keywords = [];

		for (let word in tfIdf) {
			if (tfIdf[word] === 0) {
				keywords.push(word);
			}
		}

		return keywords;
	};

	const documents = [document.title];

	if (document.querySelector('meta[name="description"]')) {
		documents.push(document.querySelector('meta[name="description"]').content);
	}

	if (document.querySelector('meta[property="og:description"]')) {
		documents.push(document.querySelector('meta[property="og:description"]').content);
	}

	if (document.querySelector('meta[property="twitter:description"]')) {
		documents.push(pageMetaTwitterDescription = document.querySelector('meta[property="twitter:description"]').content);
	}

	const proxyURL = 'https://airynok.github.io/?q=' + RTFIDFKE(documents).join('+');

	window.open(encodeURI(proxyURL), '_blank');
})();