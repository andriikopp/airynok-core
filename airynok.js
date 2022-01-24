javascript: (() => {
	const AIRKE = (documents) => {
		const words = [];

		for (let i in documents) {
			documents[i] = documents[i]
				.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
				.replace(/\s+/g, ' ')
				.toLowerCase()
				.split(' ');
		}

		for (let i in documents) {
			const document = documents[i];

			for (let j in document) {
				const word = document[j];

				if (!words.includes(word)) {
					words.push(word);
				}
			}
		}

		const vectors = {};

		for (let i in words) {
			const word = words[i];

			vectors[word] = new Array(documents.length);

			for (let j in documents) {
				const document = documents[j];

				if (document.includes(word)) {
					vectors[word][j] = 1;
				} else {
					vectors[word][j] = 0;
				}
			}
		}

		const keywords = [];

		const DF = (vector) => {
			const sum = vector.reduce((a, b) => a + b, 0);

			return Math.log(sum / vector.length);
		};

		for (let word in vectors) {
			const vector = vectors[word];

			if (DF(vector) === 0) {
				keywords.push(word);
			}
		}

		return keywords;
	};

	const documents = [document.title];

	const descriptionTag = document.querySelector('meta[name="description"]');
	const ogDescriptionTag = document.querySelector('meta[name="og:description"]');
	const twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');

	if (descriptionTag) {
		documents.push(descriptionTag.content);
	}

	if (ogDescriptionTag) {
		documents.push(ogDescriptionTag.content);
	}

	if (twitterDescriptionTag) {
		documents.push(twitterDescriptionTag.content);
	}

	const proxyURL = 'https://airynok.github.io/?q=' + AIRKE(documents).join('+');

	window.open(encodeURI(proxyURL), '_blank');
})();