/**
 * Reversed TF-IDF keywords extraction.
 */
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

const title = 'Xiaomi Mi Band 6 Smart Bracelet 5 Color AMOLED Screen Miband 6 Blood Oxygen Fitness Traker Bluetooth Waterproof Smart Band | Электроника | АлиЭкспресс';

const description = 'Xiaomi Mi Band 6 Smart Bracelet 5 Color AMOLED Screen Miband 6 Blood Oxygen Fitness Traker Bluetooth Waterproof Smart Band, Наслаждайся ✓Бесплатная доставка по всему миру! ✓Предложение ограничено по времени! ✓Удобный возврат!';

console.log(RTFIDFKE([title, description]));