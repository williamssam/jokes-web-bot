const btn = document.getElementById('btn')
const body = document.body
const joke = document.getElementById('joke')
const form = document.getElementById('form')
const selectVoices = document.getElementById('select-voices')

// speech synthesis api
let speech = new SpeechSynthesisUtterance()

const fetchJokes = () => {
	speechSynthesis.cancel()

	btn.innerText = 'Coming.. got something for you 🤭'
	fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
		.then((response) => response.json())
		.then((data) => {
			btn.innerText = 'Tell me a joke'
			joke.innerText = data.joke

			speakText()
		})
		.catch((err) => {
			console.log(err)
		})
}

const speakText = () => {
	// the text to be said by the speech api
	speech.text = joke.innerText

	// say the joke
	window.speechSynthesis.speak(speech)
}

// update the voices
const updateVoices = () => {
	const voices = speechSynthesis.getVoices()
	voices.map((voice, i) => {
		const option = document.createElement('option')
		option.value = i
		option.textContent = voice.name

		selectVoices.appendChild(option)
	})

	selectVoices.addEventListener('change', (e) => {
		speechSynthesis.cancel()
		const chosenVoice = e.target.value
		speech.voice = voices[chosenVoice]
		// speech.lang = voices[voice.lang]

		speakText()
	})
}

// Event Listeners
btn.addEventListener('click', fetchJokes)
speechSynthesis.addEventListener('voiceschanged', updateVoices)

// run when key 'j' is pressed
window.addEventListener('keydown', (e) => {
	if (e.key === 'j') {
		fetchJokes()
	}
})
