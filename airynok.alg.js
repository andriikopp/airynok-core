/**
 * Custom AIrynok algorithm for keywords extraction 
 * from HTML title and description of a product web page.
 */
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

	const weights = [];

	for (let word in vectors) {
		const vector = vectors[word];

		weights.push(DF(vector));
	}

	const opt = Math.max(...weights);

	for (let word in vectors) {
		const vector = vectors[word];

		if (DF(vector) === opt) {
			keywords.push(word);
		}
	}

	return keywords;
};

const title = 'Фитнес браслет Xiaomi Mi Smart Band 6 Black EU купить | ELMIR - цена, отзывы, характеристики';

const description = 'Купить Фитнес браслет Xiaomi Mi Smart Band 6 Black EU ☑ Цена 1069 грн. ☑ ELMIR.UA ☑ Доставка 1-2 дня. ⏩ Рассрочка 0%*. ⏩ Описание, характеристики, отзывы и фото.';

console.log(AIRKE([title, description, '']));