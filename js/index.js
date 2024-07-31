// Bjorn Van Craenenbroeck
document.addEventListener("DOMContentLoaded", async () => {
	const app = new PokemonApp(); // Maak een nieuw PokemonApp object

	await app.fetchPokemon(); // Haal de pokemon data op
	app.initChart(); // Initialiseer de grafiek
	renderPokemonList(app.filteredPokemonList); // Render de lijst van Pokemon

	const typeFilter = document.getElementById("typeFilter");
	const types = app.getTypes(); // Verkrijg de unieke types
	types.forEach((type) => {
		const option = document.createElement("option");
		option.value = type;
		option.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Hulp van chatgpt voor deze regel
		typeFilter.appendChild(option); // Voeg type opties toe aan de dropdown
	});

	// Event listener voor de type filter dropdown
	document.getElementById("typeFilter").addEventListener("change", (e) => {
		app.filterPokemon(e.target.value); // Filter pokemon op type
		renderPokemonList(app.filteredPokemonList); // Render de gefilterde lijst
		app.updateChart(); // Update de grafiek
	});

	// Event listener voor de sorteervolgorde dropdown
	document.getElementById("sortOptions").addEventListener("change", (e) => {
		app.sortPokemon(e.target.value); // Sorteer de pokemon lijst
		renderPokemonList(app.filteredPokemonList); // Render de gesorteerde lijst
		app.updateChart(); // Update de grafiek
	});

	// Functie om de lijst van Pokemon te renderen
	function renderPokemonList(pokemonList) {
		const pokemonListElement = document.getElementById("pokemonList");
		pokemonListElement.innerHTML = ""; // Maak de huidige lijst leeg
		pokemonList.forEach((pokemon) => {
			const pokemonCard = document.createElement("div"); // Hulp van chatgpt voor deze regel

			pokemonCard.className = "pokemonCard";
			pokemonCard.textContent =
				pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Hulp van chatgpt voor deze regel

			// Event listener voor het klikken op een pokemon kaart
			pokemonCard.addEventListener("click", () => app.updateChart(pokemon));
			pokemonListElement.appendChild(pokemonCard); // Voeg de pokemon kaart toe aan de lijst
		});
	}
});
