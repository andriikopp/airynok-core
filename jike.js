/**
 * Jaccard Index keywords extraction.
 */
const JIKE = (documents) => {
	const occurrence = {};

	for (let i in documents) {
		const document = documents[i];

		const words = document.split(' ');

		for (let j in words) {
			const word = words[j];

			if (occurrence[word] === undefined) {
				occurrence[word] = [i];
			} else {
				if (!occurrence[word].includes(i)) {
					occurrence[word].push(i);
				}
			}
		}
	}

	const keywords = [];

	for (let word in occurrence) {
		const index = occurrence[word].length / documents.length;

		if (index === 1) {
			keywords.push(word);
		}
	}

	return keywords;
};

const title = 'Xiaomi Mi Band 6 Smart Bracelet 5 Color AMOLED Screen Miband 6 Blood Oxygen Fitness Traker Bluetooth Waterproof Smart Band | Электроника | АлиЭкспресс';

const description = 'Xiaomi Mi Band 6 Smart Bracelet 5 Color AMOLED Screen Miband 6 Blood Oxygen Fitness Traker Bluetooth Waterproof Smart Band, Наслаждайся ✓Бесплатная доставка по всему миру! ✓Предложение ограничено по времени! ✓Удобный возврат!';

console.log(JIKE([title, description]));