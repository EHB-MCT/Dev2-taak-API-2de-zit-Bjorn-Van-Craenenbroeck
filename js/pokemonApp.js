// Bjorn Van Craenenbroeck
class PokemonApp {
	constructor() {
		this.pokemonList = []; // Array om de lijst van pokemon op te slaan
		this.filteredPokemonList = []; // Array om de gefilterde lijst van pokemon op te slaan
		this.chart = null; // Variabele voor de Chart.js grafiek
	}

	// Methode om pokemon data op te halen van de API
	async fetchPokemon() {
		try {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=50"
			);
			const data = await response.json();
			const pokemonPromises = data.results.map((pokemon) =>
				fetch(pokemon.url).then((res) => res.json())
			);
			this.pokemonList = await Promise.all(pokemonPromises);
			this.filteredPokemonList = this.pokemonList;
		} catch (error) {
			console.error("Error fetching Pokemon data:", error);
		}
	}

	// Methode om verschilldnde types van pokemon te verkrijgen
	getTypes() {
		return [
			...new Set(
				this.pokemonList.flatMap((pokemon) =>
					pokemon.types.map((typeInfo) => typeInfo.type.name)
				)
			),
		];
	}

	// Methode om Pokemon te filteren op type
	filterPokemon(type) {
		if (type) {
			this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
				pokemon.types.some((typeInfo) => typeInfo.type.name === type)
			);
		} else {
			this.filteredPokemonList = this.pokemonList;
		}
	}

	// Methode om Pokemon te sorteren op naam
	// Gebruik gemaakt van de hulp van Chatgpt
	sortPokemon(order) {
		this.filteredPokemonList.sort((a, b) => {
			if (order === "asc") {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
	}

	// Methode om de grafiek te initialiseren
	initChart() {
		const ctx = document.getElementById("pokemonChart").getContext("2d");
		this.chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: [],
				datasets: [
					{
						label: "Basis Statistieken",
						data: [],
						backgroundColor: "rgba(255, 0, 0, 0.5)",
						borderColor: "rgba(255, 0, 0, 1)",
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	}

	// Methode om de grafiek bij te werken met Pokemon data
	// Gebruik gemaakt van de hulp van Chatgpt
	updateChart(pokemon) {
		if (pokemon) {
			this.chart.data.labels = pokemon.stats.map((stat) => stat.stat.name);
			this.chart.data.datasets[0].data = pokemon.stats.map(
				(stat) => stat.base_stat
			);
		} else {
			this.chart.data.labels = this.filteredPokemonList.map(
				(pokemon) => pokemon.name
			);
			this.chart.data.datasets[0].data = this.filteredPokemonList.map(
				(pokemon) => pokemon.stats[0].base_stat
			);
		}
		this.chart.update();
	}
}
